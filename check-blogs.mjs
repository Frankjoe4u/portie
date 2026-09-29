// check-blogs.mjs
// Run this from your project root (C:\Users\HP\Desktop\fjoe\my-app) in PowerShell:
//   node check-blogs.mjs
//
// Uses your existing MONGODB_URI from .env.local. Requires mongoose + dotenv,
// which are already in your package.json.

import dotenv from "dotenv"; dotenv.config({ path: ".env.local" });
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("MONGODB_URI not found. Make sure .env.local exists and has it set.");
  process.exit(1);
}

async function main() {
  console.log("Connecting to MongoDB...");
  await mongoose.connect(MONGODB_URI);

  const db = mongoose.connection.db;
  console.log(`Connected. Database name: ${db.databaseName}\n`);

  const collections = await db.listCollections().toArray();
  console.log("Collections found in this database:");
  if (collections.length === 0) {
    console.log("  (none — the database appears completely empty)");
  } else {
    for (const c of collections) {
      console.log(`  - ${c.name}`);
    }
  }

  console.log("");

  const collectionNames = collections.map((c) => c.name);
  const blogCollectionCandidates = collectionNames.filter((name) =>
    name.toLowerCase().includes("blog")
  );

  if (blogCollectionCandidates.length === 0) {
    console.log("No collection with 'blog' in its name exists at all.");
    console.log("This means the collection itself was dropped, not just emptied.");
  } else {
    for (const name of blogCollectionCandidates) {
      const count = await db.collection(name).countDocuments({});
      console.log(`Collection "${name}": ${count} document(s)`);
      if (count > 0) {
        const sample = await db.collection(name).find({}).limit(3).toArray();
        console.log("Sample titles:");
        sample.forEach((doc) => console.log(`  - ${doc.title ?? "(no title field)"}`));
      }
    }
  }

  await mongoose.disconnect();
  console.log("\nDone.");
}

main().catch((err) => {
  console.error("Error:", err.message);
  process.exit(1);
});
