// db/connect.js
const { MongoClient } = require("mongodb");

const uri = "mongodb://127.0.0.1:27017";
const client = new MongoClient(uri);

let db;

async function connectDB() {
  try {
    await client.connect();
    db = client.db("testDB");
    console.log("✅ MongoDB Connected");
  } catch (err) {
    console.error("❌ MongoDB connection failed", err);
  }
}

function getDB() {
  if (!db) throw new Error("DB not connected yet");
  return db;
}

module.exports = { connectDB, getDB };
