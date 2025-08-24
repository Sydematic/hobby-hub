// travelDB.js
import express from "express";

const router = express.Router();

// Example travel routes

// GET all travel items
router.get("/", async (req, res) => {
  try {
    // Replace this with actual DB logic
    const travelItems = [
      { id: 1, destination: "Paris", description: "City of Light" },
      { id: 2, destination: "Tokyo", description: "Land of the Rising Sun" },
    ];
    res.json({ travelItems });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch travel items" });
  }
});

// GET a single travel item by ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    // Replace with DB fetch
    const travelItem = { id, destination: "Example", description: "Sample travel item" };
    res.json(travelItem);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch travel item" });
  }
});

// POST a new travel item
router.post("/", async (req, res) => {
  try {
    const { destination, description } = req.body;
    // Replace with DB create logic
    const newItem = { id: Date.now(), destination, description };
    res.status(201).json(newItem);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create travel item" });
  }
});

// DELETE a travel item
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    // Replace with DB delete logic
    res.json({ message: `Travel item ${id} deleted` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete travel item" });
  }
});

export default router;
