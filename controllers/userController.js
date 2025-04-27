// controllers/userController.js
const { ObjectId } = require("mongodb");
const { getUserCollection } = require("../models/userModel");

/** Helper: Validate MongoDB ObjectId */
function isValidObjectId(id) {
  return ObjectId.isValid(id) && String(new ObjectId(id)) === id;
}

/** Get all users */
exports.getUsers = async (req, res) => {
  try {
    const collection = getUserCollection();
    const users = await collection.find().toArray();
    res.status(200).json(users);
  } catch (err) {
    console.error("❌ Error getting users:", err);
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

/** Get a single user by ID */
exports.getUser = async (req, res) => {
  try {
    const id = req.params.id;
    if (!isValidObjectId(id)) {
      return res.status(400).json({ error: "Invalid user ID" });
    }

    const collection = getUserCollection();
    const user = await collection.findOne({ _id: new ObjectId(id) });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (err) {
    console.error("❌ Error getting user:", err);
    res.status(500).json({ error: "Failed to fetch user" });
  }
};

/** Create a new user */
exports.createUser = async (req, res) => {
  try {
    const { name, age } = req.body;
    if (!name || !age) {
      return res.status(400).json({ error: "Name and age are required" });
    }

    const collection = getUserCollection();
    const result = await collection.insertOne({ name, age: parseInt(age) });

    res.status(201).json({ message: "User added", id: result.insertedId });
  } catch (err) {
    console.error("❌ Error creating user:", err);
    res.status(500).json({ error: "Failed to create user" });
  }
};

/** Update existing user */
exports.updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    if (!isValidObjectId(id)) {
      return res.status(400).json({ error: "Invalid user ID" });
    }

    const { name, age } = req.body;
    const collection = getUserCollection();

    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { name, age: parseInt(age) } }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User updated successfully" });
  } catch (err) {
    console.error("❌ Error updating user:", err);
    res.status(500).json({ error: "Failed to update user" });
  }
};

/** Delete a user */
exports.deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    if (!isValidObjectId(id)) {
      return res.status(400).json({ error: "Invalid user ID" });
    }

    const collection = getUserCollection();
    const result = await collection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    console.error("❌ Error deleting user:", err);
    res.status(500).json({ error: "Failed to delete user" });
  }
};
