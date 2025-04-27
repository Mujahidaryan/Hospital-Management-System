// app.js
const { MongoClient } = require('mongodb');

async function run() {
  const uri = "mongodb://127.0.0.1:27017";
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log("✅ Connected to MongoDB");

    const db = client.db("testDB");
    const collection = db.collection("users");

    // Optional: insert one doc to test
    const result = await collection.insertOne({ name: "Aryan", age: 25 });
    console.log("Inserted ID:", result.insertedId);
    
    // Optional: read it back
    const users = await collection.find().toArray();
    console.log("Users:", users);

  } catch (err) {
    console.error("❌ Connection failed:", err);
  } finally {
    await client.close();
  }
}

run();
