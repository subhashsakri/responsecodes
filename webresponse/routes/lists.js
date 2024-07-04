const express = require('express');
const router = express.Router();
const List = require('../models/list.model');
const authenticate = require('../middleware/authenticate');

// Create a new list
router.post('/', authenticate, async (req, res) => {
  try {
    const { name, responseCodes } = req.body;
    const userId = req.user.userId;
    const list = new List({ name, responseCodes, userId });
    await list.save();
    res.status(201).json(list);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all lists for a user
router.get('/', authenticate, async (req, res) => {
  try {
    const lists = await List.find({ userId: req.user.userId });
    res.json(lists);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
