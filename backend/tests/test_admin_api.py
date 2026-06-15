"""End-to-end backend tests for the Admin dashboard subsystem.

Covers:
- Admin auth (POST /api/admin/login) — success + 401
- Protected endpoints reject unauthenticated requests
- Lead create with the new free-text "_other" fields
- Public vs admin settings split + persistence
- Admin password override via DB
- Lead status update + delete
- Resend test-email error paths (no real key used)
- Lead notification fire-and-forget when Resend is unconfigured / invalid
"""
import os
import time
import uuid
import pytest
import requests

BASE_URL = os.environ["REACT_APP_BACKEND_URL"].rstrip("/")
DEFAULT_PASSWORD = "_tCp6XB8MAspxUOfSrNGuQ"


# ---------- Fixtures ----------
@pytest.fixture(scope="module")
def api():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


@pytest.fixture(scope="module")
def admin_token(api):
    r = api.post(f"{BASE_URL}/api/admin/login", json={"password": DEFAULT_PASSWORD})
    assert r.status_code == 200, f"Login failed: {r.status_code} {r.text}"
    tok = r.json().get("token")
    assert tok and isinstance(tok, str) and len(tok) > 10
    return tok


@pytest.fixture(scope="module")
def admin_headers(admin_token):
    return {"Content-Type": "application/json", "Authorization": f"Bearer {admin_token}"}


def _full_lead(suffix="full"):
    return {
        "business_name": f"TEST_Admin_{suffix}_{uuid.uuid4().hex[:6]}",
        "industry": "other",
        "industry_other": "Underwater basket weaving",
        "business_size": "2–5 people",
        "biggest_time_drain": "Something else",
        "biggest_time_drain_other": "Reconciling spreadsheets",
        "current_tools": ["Notion / Airtable"],
        "current_tools_other": "Custom Python scripts",
        "interested_in": ["Something else"],
        "interested_in_other": "A bespoke internal tool",
        "monthly_software_spend": "£100–£300/mo",
        "name": "TEST_QA Bot",
        "email": "TEST_qa+admin@example.com",
        "phone": "+447000000000",
        "extra_notes": "Created by test_admin_api.py",
    }


# ---------- Admin Auth ----------
class TestAdminAuth:
    def test_login_wrong_password(self, api):
        r = api.post(f"{BASE_URL}/api/admin/login", json={"password": "wrong"})
        assert r.status_code == 401

    def test_login_correct_password(self, api):
        r = api.post(f"{BASE_URL}/api/admin/login", json={"password": DEFAULT_PASSWORD})
        assert r.status_code == 200
        assert "token" in r.json()


# ---------- Protected endpoints require auth ----------
class TestProtectedEndpointsRequireAuth:
    @pytest.mark.parametrize("method,path,body", [
        ("GET", "/api/admin/settings", None),
        ("GET", "/api/admin/leads", None),
        ("PUT", "/api/admin/settings", {}),
        ("PATCH", "/api/admin/leads/fake-id", {"status": "contacted"}),
        ("DELETE", "/api/admin/leads/fake-id", None),
        ("POST", "/api/admin/test-email", None),
    ])
    def test_unauthorized_returns_401(self, api, method, path, body):
        r = api.request(method, f"{BASE_URL}{path}", json=body)
        assert r.status_code == 401, f"{method} {path} expected 401 got {r.status_code}: {r.text}"

    def test_get_admin_settings_with_token(self, api, admin_headers):
        r = api.get(f"{BASE_URL}/api/admin/settings", headers=admin_headers)
        assert r.status_code == 200
        body = r.json()
        # Sensitive keys should be present even if empty
        for k in ["admin_password", "resend_api_key", "resend_from_email", "admin_notify_email"]:
            assert k in body

    def test_get_admin_leads_with_token(self, api, admin_headers):
        r = api.get(f"{BASE_URL}/api/admin/leads", headers=admin_headers)
        assert r.status_code == 200
        assert isinstance(r.json(), list)


# ---------- Lead creation with new "_other" fields ----------
class TestLeadCreation:
    def test_create_lead_minimal(self, api):
        payload = {
            "business_name": f"TEST_min_{uuid.uuid4().hex[:6]}",
            "industry": "hospitality",
            "business_size": "Just me",
            "biggest_time_drain": "Inbound chaos",
            "name": "TEST_Minimal",
            "email": "TEST_min@example.com",
        }
        r = api.post(f"{BASE_URL}/api/leads", json=payload)
        assert r.status_code == 200, r.text
        body = r.json()
        assert body["industry_other"] == ""
        assert body["biggest_time_drain_other"] == ""
        assert body["interested_in_other"] == ""
        assert body["current_tools_other"] == ""

    def test_create_lead_with_other_fields_and_persistence(self, api, admin_headers):
        payload = _full_lead("persist")
        r = api.post(f"{BASE_URL}/api/leads", json=payload)
        assert r.status_code == 200, r.text
        body = r.json()
        assert body["industry_other"] == "Underwater basket weaving"
        assert body["biggest_time_drain_other"] == "Reconciling spreadsheets"
        assert body["interested_in_other"] == "A bespoke internal tool"
        assert body["current_tools_other"] == "Custom Python scripts"
        lead_id = body["id"]

        # Verify via admin list
        r2 = api.get(f"{BASE_URL}/api/admin/leads", headers=admin_headers)
        assert r2.status_code == 200
        ids = {l["id"]: l for l in r2.json()}
        assert lead_id in ids
        persisted = ids[lead_id]
        assert persisted["industry_other"] == "Underwater basket weaving"
        assert persisted["interested_in_other"] == "A bespoke internal tool"
        # No mongo _id leaked
        assert "_id" not in persisted


# ---------- Settings public + admin ----------
class TestSettings:
    def test_public_settings_returns_has_resend_flag(self, api):
        r = api.get(f"{BASE_URL}/api/settings")
        assert r.status_code == 200
        body = r.json()
        assert "_has_resend" in body
        assert isinstance(body["_has_resend"], bool)

    def test_put_admin_settings_then_public_reflects(self, api, admin_headers):
        payload = {
            "studioName": "QA Studio",
            "whatsappNumber": "447900000000",
            "seo_default_description": "desc-qa",
            "seo_home": "Home title QA",
        }
        r = api.put(f"{BASE_URL}/api/admin/settings", headers=admin_headers, json=payload)
        assert r.status_code == 200
        updated = set(r.json().get("updated", []))
        assert {"studioName", "whatsappNumber", "seo_default_description", "seo_home"}.issubset(updated)

        # Public endpoint reflects
        pub = api.get(f"{BASE_URL}/api/settings").json()
        assert pub.get("studioName") == "QA Studio"
        assert pub.get("whatsappNumber") == "447900000000"
        assert pub.get("seo_default_description") == "desc-qa"
        assert pub.get("seo_home") == "Home title QA"

        # Admin endpoint includes sensitive keys
        adm = api.get(f"{BASE_URL}/api/admin/settings", headers=admin_headers).json()
        assert "admin_password" in adm
        assert "resend_api_key" in adm

    def test_put_admin_settings_ignores_unknown_keys(self, api, admin_headers):
        r = api.put(f"{BASE_URL}/api/admin/settings", headers=admin_headers,
                    json={"not_a_real_key": "x", "studioName": "QA Studio"})
        assert r.status_code == 200
        upd = r.json().get("updated", [])
        assert "not_a_real_key" not in upd
        assert "studioName" in upd

    def test_public_settings_excludes_sensitive(self, api):
        r = api.get(f"{BASE_URL}/api/settings").json()
        for k in ["resend_api_key", "admin_password", "admin_notify_email", "resend_from_email"]:
            assert k not in r, f"Sensitive key {k} leaked in public settings"


# ---------- Admin password override (then restore!) ----------
class TestAdminPasswordOverride:
    def test_change_password_login_then_restore(self, api, admin_headers):
        new_pw = "TEST_temppw_" + uuid.uuid4().hex[:8]
        # Set new
        r = api.put(f"{BASE_URL}/api/admin/settings", headers=admin_headers,
                    json={"admin_password": new_pw})
        assert r.status_code == 200

        # Old should fail
        bad = api.post(f"{BASE_URL}/api/admin/login", json={"password": DEFAULT_PASSWORD})
        assert bad.status_code == 401, "Old password should fail after override"

        # New should succeed
        good = api.post(f"{BASE_URL}/api/admin/login", json={"password": new_pw})
        assert good.status_code == 200
        new_token = good.json()["token"]

        # Restore default — IMPORTANT for subsequent agents
        restore = api.put(
            f"{BASE_URL}/api/admin/settings",
            headers={"Content-Type": "application/json", "Authorization": f"Bearer {new_token}"},
            json={"admin_password": DEFAULT_PASSWORD},
        )
        assert restore.status_code == 200

        # Default works again
        final = api.post(f"{BASE_URL}/api/admin/login", json={"password": DEFAULT_PASSWORD})
        assert final.status_code == 200, "Default password not restored — subsequent runs will break!"


# ---------- Lead status patch + delete ----------
class TestLeadAdminOps:
    def test_patch_and_delete_lead(self, api, admin_headers):
        # Create a lead
        r = api.post(f"{BASE_URL}/api/leads", json=_full_lead("ops"))
        assert r.status_code == 200
        lead_id = r.json()["id"]

        # Patch status
        pr = api.patch(f"{BASE_URL}/api/admin/leads/{lead_id}", headers=admin_headers,
                       json={"status": "contacted"})
        assert pr.status_code == 200
        assert pr.json().get("ok") is True

        # Verify via list
        listing = api.get(f"{BASE_URL}/api/admin/leads", headers=admin_headers).json()
        updated = [l for l in listing if l["id"] == lead_id]
        assert updated and updated[0]["status"] == "contacted"

        # Delete
        dr = api.delete(f"{BASE_URL}/api/admin/leads/{lead_id}", headers=admin_headers)
        assert dr.status_code == 200

        # Confirm gone
        listing2 = api.get(f"{BASE_URL}/api/admin/leads", headers=admin_headers).json()
        assert not any(l["id"] == lead_id for l in listing2)

    def test_patch_nonexistent_returns_404(self, api, admin_headers):
        pr = api.patch(f"{BASE_URL}/api/admin/leads/does-not-exist",
                       headers=admin_headers, json={"status": "contacted"})
        assert pr.status_code == 404


# ---------- Resend test-email error paths ----------
class TestTestEmailErrorPaths:
    def _reset_resend(self, api, admin_headers, key="", to=""):
        api.put(f"{BASE_URL}/api/admin/settings", headers=admin_headers,
                json={"resend_api_key": key, "admin_notify_email": to})

    def test_no_resend_api_key(self, api, admin_headers):
        self._reset_resend(api, admin_headers, key="", to="")
        r = api.post(f"{BASE_URL}/api/admin/test-email", headers=admin_headers)
        assert r.status_code == 400
        assert "resend_api_key" in r.text

    def test_no_admin_notify_email(self, api, admin_headers):
        self._reset_resend(api, admin_headers, key="re_test_fake_key", to="")
        r = api.post(f"{BASE_URL}/api/admin/test-email", headers=admin_headers)
        assert r.status_code == 400
        assert "admin_notify_email" in r.text

    def test_invalid_resend_key_returns_500(self, api, admin_headers):
        self._reset_resend(api, admin_headers,
                           key="re_invalid_key_for_test_only",
                           to="qa@example.com")
        r = api.post(f"{BASE_URL}/api/admin/test-email", headers=admin_headers)
        # Should hit Resend, get rejected, and bubble up as 500
        assert r.status_code == 500
        assert "Resend" in r.text or "error" in r.text.lower()

        # Cleanup so subsequent lead creates don't try invalid Resend
        self._reset_resend(api, admin_headers, key="", to="")


# ---------- Lead creation succeeds regardless of Resend ----------
class TestLeadCreationResilientToResend:
    def test_lead_create_no_resend_configured(self, api, admin_headers):
        # Ensure resend is unset
        api.put(f"{BASE_URL}/api/admin/settings", headers=admin_headers,
                json={"resend_api_key": "", "admin_notify_email": ""})
        r = api.post(f"{BASE_URL}/api/leads", json=_full_lead("noresend"))
        assert r.status_code == 200

    def test_lead_create_with_invalid_resend(self, api, admin_headers):
        api.put(f"{BASE_URL}/api/admin/settings", headers=admin_headers,
                json={"resend_api_key": "re_invalid_key_xyz",
                      "admin_notify_email": "qa@example.com"})
        r = api.post(f"{BASE_URL}/api/leads", json=_full_lead("badresend"))
        assert r.status_code == 200, "Lead create must succeed even when Resend fails"
        # Cleanup
        api.put(f"{BASE_URL}/api/admin/settings", headers=admin_headers,
                json={"resend_api_key": "", "admin_notify_email": ""})
        # Give logs a moment
        time.sleep(0.3)


# ---------- Final cleanup of settings (revert QA strings) ----------
class TestZ_Cleanup:
    """Run last (alphabetical) — revert settings touched during tests."""
    def test_revert_qa_settings(self, api, admin_headers):
        api.put(f"{BASE_URL}/api/admin/settings", headers=admin_headers,
                json={
                    "studioName": "",
                    "whatsappNumber": "",
                    "seo_default_description": "",
                    "seo_home": "",
                    "resend_api_key": "",
                    "admin_notify_email": "",
                })

    def test_confirm_default_password_works(self, api):
        r = api.post(f"{BASE_URL}/api/admin/login", json={"password": DEFAULT_PASSWORD})
        assert r.status_code == 200
