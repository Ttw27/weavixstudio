"""
Cleanup: replace every em dash with a plain hyphen in the examples and
projects content.

Run once:  python3 /app/backend/migrations/replace_em_dashes.py --dry-run
Then:      python3 /app/backend/migrations/replace_em_dashes.py
Idempotent: a second run finds nothing left to change.

House style is no em dashes anywhere. The frontend source was cleaned already,
but the examples and portfolio pages read their copy from Mongo, which was
seeded with em dashes. This walks every string in each document (including
strings inside nested lists and dicts) and swaps U+2014 for "-". Only the
top-level fields that actually changed are written back.

--dry-run prints what would change per collection without writing anything.
"""
import argparse
import asyncio
import os
from pathlib import Path

from dotenv import load_dotenv
from motor.motor_asyncio import AsyncIOMotorClient

ROOT = Path(__file__).resolve().parents[1]
load_dotenv(ROOT / ".env")
client = AsyncIOMotorClient(os.environ["MONGO_URL"])
db = client[os.environ["DB_NAME"]]

EM_DASH = "\u2014"
COLLECTIONS = ["examples", "projects"]


def clean(value):
    """Return (cleaned value, number of em dashes replaced), walking lists and dicts."""
    if isinstance(value, str):
        n = value.count(EM_DASH)
        return (value.replace(EM_DASH, "-") if n else value), n
    if isinstance(value, list):
        out, total = [], 0
        for item in value:
            v, n = clean(item)
            out.append(v)
            total += n
        return out, total
    if isinstance(value, dict):
        out, total = {}, 0
        for k, item in value.items():
            v, n = clean(item)
            out[k] = v
            total += n
        return out, total
    return value, 0


async def clean_collection(name: str, dry_run: bool):
    coll = db[name]
    docs = dashes = 0
    async for doc in coll.find({}):
        patch, doc_dashes = {}, 0
        for field, value in doc.items():
            if field == "_id":
                continue
            v, n = clean(value)
            if n:
                patch[field] = v
                doc_dashes += n
        if not patch:
            continue
        docs += 1
        dashes += doc_dashes
        label = doc.get("slug") or doc.get("id") or str(doc["_id"])
        print(f"  {name}/{label}: {doc_dashes} em dash(es) in {', '.join(sorted(patch))}")
        if not dry_run:
            await coll.update_one({"_id": doc["_id"]}, {"$set": patch})
    return docs, dashes


async def main(dry_run: bool):
    mode = "DRY RUN (nothing written)" if dry_run else "WRITING"
    print(f"Replacing em dashes with hyphens - {mode}")
    for name in COLLECTIONS:
        total = await db[name].count_documents({})
        docs, dashes = await clean_collection(name, dry_run)
        verb = "would update" if dry_run else "updated"
        print(f"{name}: {total} docs, {verb} {docs}, {dashes} em dash(es) replaced")
    client.close()


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__.strip().splitlines()[0])
    parser.add_argument("--dry-run", action="store_true", help="print counts per collection without writing")
    args = parser.parse_args()
    asyncio.run(main(args.dry_run))
