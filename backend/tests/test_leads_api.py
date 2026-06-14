"""Backend API tests for the Readiness Plan / Leads endpoints."""
import os
import pytest
import requests

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "https://portfolio-showcase-1710.preview.emergentagent.com").rstrip("/")
ADMIN_TOKEN = "change-me-to-a-random-string"


@pytest.fixture
def api():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


@pytest.fixture
def valid_payload():
    return {
        "business_name": "TEST_Sunday Brunch Co.",
        "industry": "hospitality",
        "business_size": "2–5 people",
        "biggest_time_drain": "Drowning in emails / inbound",
        "current_tools": ["Squarespace / Wix", "Stripe / PayPal"],
        "interested_in": ["A modern website that converts", "AI that actually saves us time"],
        "monthly_software_spend": "£100–£300/mo",
        "name": "TEST_Test User",
        "email": "TEST_lead@example.com",
        "phone": "+447777000000",
        "extra_notes": "Pytest run — please ignore.",
    }


# --- Root / sanity check ---
class TestRoot:
    def test_root_alive(self, api):
        r = api.get(f"{BASE_URL}/api/")
        assert r.status_code == 200
        assert r.json().get("message") == "Hello World"


# --- POST /api/leads ---
class TestCreateLead:
    def test_create_lead_returns_full_lead(self, api, valid_payload):
        r = api.post(f"{BASE_URL}/api/leads", json=valid_payload)
        assert r.status_code == 200, r.text
        body = r.json()
        # Returned fields
        assert "id" in body and isinstance(body["id"], str) and len(body["id"]) > 0
        assert "created_at" in body
        assert body.get("status") == "new"
        # Echo'd fields
        for k in [
            "business_name", "industry", "business_size", "biggest_time_drain",
            "monthly_software_spend", "name", "email", "phone", "extra_notes",
        ]:
            assert body[k] == valid_payload[k], f"Mismatch on {k}"
        assert body["current_tools"] == valid_payload["current_tools"]
        assert body["interested_in"] == valid_payload["interested_in"]

    def test_create_lead_with_only_required(self, api):
        payload = {
            "business_name": "TEST_Minimal LLC",
            "industry": "other",
            "business_size": "Just me",
            "biggest_time_drain": "Too much manual admin",
            "name": "TEST_Min",
            "email": "TEST_min@example.com",
        }
        r = api.post(f"{BASE_URL}/api/leads", json=payload)
        assert r.status_code == 200, r.text
        body = r.json()
        assert body["current_tools"] == []
        assert body["interested_in"] == []
        assert body["monthly_software_spend"] == ""
        assert body["phone"] == ""
        assert body["extra_notes"] == ""

    def test_create_lead_missing_required_returns_422(self, api):
        r = api.post(f"{BASE_URL}/api/leads", json={"business_name": "TEST_NoEmail"})
        assert r.status_code == 422


# --- GET /api/leads ---
class TestListLeads:
    def test_list_without_token_returns_empty(self, api):
        r = api.get(f"{BASE_URL}/api/leads")
        assert r.status_code == 200
        assert r.json() == []

    def test_list_with_wrong_token_returns_empty(self, api):
        r = api.get(f"{BASE_URL}/api/leads", params={"admin_token": "nope"})
        assert r.status_code == 200
        assert r.json() == []

    def test_list_with_correct_token_returns_list(self, api, valid_payload):
        # Create a lead first so the list is non-empty
        created = api.post(f"{BASE_URL}/api/leads", json=valid_payload)
        assert created.status_code == 200
        created_id = created.json()["id"]

        r = api.get(f"{BASE_URL}/api/leads", params={"admin_token": ADMIN_TOKEN})
        assert r.status_code == 200
        data = r.json()
        assert isinstance(data, list)
        assert len(data) >= 1
        # Verify our just-created lead is present
        ids = [d["id"] for d in data]
        assert created_id in ids
        # Verify _id (Mongo) is not leaked
        for d in data:
            assert "_id" not in d
