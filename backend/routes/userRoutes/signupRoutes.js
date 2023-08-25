const express = require('express');
const router = express.Router();
const User = require('../../models/UserModel');
const jwt = require('jsonwebtoken');

router.post('/signup', async (req, res) => {
  try {
    // Extract user data from the request body
    const { name, email, password } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: 'User already exists' });
    }

    // Create a new user instance
    const newUser = new User({ name, email, password });

    // Save the new user to the database
    await newUser.save();

    // Generate a JSON Web Token (JWT) for authentication
    const token = jwt.sign({ email }, process.env.JWT_SECRET);

    // Return the token as the response
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Export the router
module.exports = router;
