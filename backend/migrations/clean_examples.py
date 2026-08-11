"""
Cleanup: remove fabricated testimonials + invented stats from all examples.

Run once:  python3 /app/migrations/clean_examples.py
Idempotent.

For every example in the DB it:
  - blanks `quote` and `quoteBy` (no fake customer voice, names or locations)
  - replaces `results` values with mechanisms (no invented percentages/figures)
The examples page shows an "illustrative example" label instead of a quote
once the frontend is deployed.
"""
import asyncio, os
from pathlib import Path
from dotenv import load_dotenv
from motor.motor_asyncio import AsyncIOMotorClient

ROOT = Path(__file__).resolve().parents[1]
load_dotenv(ROOT / ".env")
client = AsyncIOMotorClient(os.environ["MONGO_URL"])
db = client[os.environ["DB_NAME"]]

# slug -> cleaned results
CLEAN = {'cafe': {'results': [{'k': 'Owner time saved', 'v': "Off the owner's plate"}, {'k': 'Bookings handled by AI', 'v': 'Handled automatically'}, {'k': 'Review reply time', 'v': 'Drafted, ready to send'}]}, 'dental': {'results': [{'k': 'No-show rate', 'v': 'Smart reminders + deposits'}, {'k': 'Admin hours saved', 'v': 'Front desk freed up'}, {'k': 'Recall conversions', 'v': 'Recalls chased on their own'}]}, 'trades': {'results': [{'k': 'Quotes out same-day', 'v': 'Sent from the van'}, {'k': 'Avg jobs/engineer', 'v': 'Less admin per job'}, {'k': '5★ reviews', 'v': 'Requested after every job'}]}, 'coach': {'results': [{'k': 'SaaS cost saved', 'v': 'Subscriptions replaced'}, {'k': 'Course completion', 'v': 'Progress tracked + nudged'}, {'k': 'Coach hours saved', 'v': 'Admin automated'}]}, 'ecom': {'results': [{'k': 'Support cost', 'v': 'AI handles routine queries'}, {'k': 'CVR', 'v': 'Faster, clearer checkout'}, {'k': 'Email revenue', 'v': 'Automated, owned flows'}]}, 'fitness': {'results': [{'k': 'Member retention', 'v': 'Progress they can see'}, {'k': 'Trainer admin', 'v': 'Plans write themselves'}, {'k': 'Referrals', 'v': 'Shareable results'}]}, 'football': {'results': [{'k': 'Admin hours', 'v': 'Reports from a voice note'}, {'k': 'Payment chasing', 'v': 'Automated away'}, {'k': 'Players (capacity)', 'v': 'Limited by time, not admin'}]}, 'etsy': {'results': [{'k': 'Listings / day', 'v': 'Bulk-listed, not one-by-one'}, {'k': 'Midjourney spend', 'v': 'Owned prompt tools'}, {'k': 'Etsy CTR', 'v': 'Sharper listing copy'}]}, 'accountant': {'results': [{'k': 'Late filings', 'v': 'The chase runs itself'}, {'k': 'Avg client onboarding', 'v': 'One link, no email chain'}, {'k': 'Capacity per accountant', 'v': 'No per-seat ceiling'}]}, 'estate-agent': {'results': [{'k': 'Time on market', 'v': 'Priced on evidence'}, {'k': 'Listings won', 'v': 'Won on honesty'}, {'k': 'Negotiator capacity', 'v': 'Enquiries auto-qualified'}]}, 'restaurant-chain': {'results': [{'k': 'Food waste', 'v': 'Forecast from covers'}, {'k': 'Repeat covers', 'v': 'Own loyalty, own list'}, {'k': 'Manager admin', 'v': 'One screen, not six'}]}, 'agency': {'results': [{'k': 'Billable hours', 'v': 'Less time on admin'}, {'k': 'Proposal turnaround', 'v': 'Drafted in minutes'}, {'k': 'Client NPS', 'v': 'Always-visible progress'}]}, 'gp-clinic': {'results': [{'k': 'Hold times', 'v': 'AI handles the phones'}, {'k': 'No-shows', 'v': 'Smart reminders'}, {'k': 'Recall conversion', 'v': 'Recalls run on their own'}]}, 'boutique-hotel': {'results': [{'k': 'Direct bookings', 'v': 'Off the OTAs'}, {'k': 'OTA fees saved', 'v': 'Commission-free direct'}, {'k': 'Avg upsell', 'v': 'Upsells at booking'}]}, 'driving-school': {'results': [{'k': 'Pass rate (first try)', 'v': 'Readiness, evidenced'}, {'k': 'Lessons booked online', 'v': 'Booked without a call'}, {'k': 'Admin hours', 'v': 'Recaps from a voice note'}]}, 'tutor': {'results': [{'k': 'Tutor capacity', 'v': 'Admin automated'}, {'k': 'Parent retention', 'v': 'Progress parents can see'}, {'k': 'Avg report time', 'v': 'Reports in minutes'}]}, 'law-firm': {'results': [{'k': 'Drafting time', 'v': 'Drafted from templates'}, {'k': 'Matters per fee-earner', 'v': 'Less time on admin'}, {'k': 'Client satisfaction', 'v': 'Always-visible progress'}]}, 'vet': {'results': [{'k': 'Phone volume', 'v': 'AI handles routine calls'}, {'k': 'Recall uptake', 'v': 'Recalls chased automatically'}, {'k': 'Owner NPS', 'v': 'Clear, timely comms'}]}, 'landscaping': {'results': [{'k': 'Quote → win rate', 'v': 'Visual quotes'}, {'k': 'Weather wasted days', 'v': 'Weather-aware scheduling'}, {'k': 'Recurring revenue', 'v': 'Maintenance plans built in'}]}, 'podcaster': {'results': [{'k': 'Audience growth', 'v': 'Owned audience + site'}, {'k': 'Sponsorship rev', 'v': 'Own the sponsor relationship'}, {'k': 'Post-prod time', 'v': 'Clips generated automatically'}]}, 'removals': {'results': [{'k': 'Quotes / day', 'v': 'Guided self-quote'}, {'k': 'Conversion', 'v': 'Answered before rivals'}, {'k': '5★ reviews', 'v': 'Requested after every job'}]}, 'wedding-planner': {'results': [{'k': 'Weddings / yr', 'v': 'Less coordination overhead'}, {'k': 'Vendor coord time', 'v': 'One shared timeline'}, {'k': 'Couple NPS', 'v': 'Everything in one place'}]}, 'salon': {'results': [{'k': 'Rebooking rate', 'v': 'Rebooking at the chair'}, {'k': 'Retail revenue', 'v': 'Aftercare sells itself'}, {'k': 'Stylist retention', 'v': 'Records stay with the salon'}]}, 'cycling-club': {'results': [{'k': 'New members', 'v': 'Easy join + pay'}, {'k': 'Ride participation', 'v': 'One place for everything'}, {'k': 'Volunteer admin', 'v': 'Automated away'}]}}


async def main():
    total = await db.examples.count_documents({})
    print(f"Examples in DB: {total}")
    updated = 0
    async for ex in db.examples.find({}, {"_id": 0, "slug": 1}):
        slug = ex.get("slug")
        patch = {"quote": "", "quoteBy": ""}
        if slug in CLEAN:
            patch["results"] = CLEAN[slug]["results"]
        res = await db.examples.update_one({"slug": slug}, {"$set": patch})
        if res.modified_count:
            updated += 1
            print(f"  cleaned {slug}")
    # also catch any without slug match — still blank their quotes
    await db.examples.update_many(
        {"$or": [{"quote": {"$ne": ""}}, {"quoteBy": {"$ne": ""}}]},
        {"$set": {"quote": "", "quoteBy": ""}},
    )
    print(f"Updated {updated} examples. Quotes blanked, results de-numbered.")


if __name__ == "__main__":
    asyncio.run(main())
