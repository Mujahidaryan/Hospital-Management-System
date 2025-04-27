// models/userModel.js
const { getDB } = require("../db/connect");

function getUserCollection() {
  const db = getDB();
  return db.collection("users");
}

module.exports = getUserCollection;
