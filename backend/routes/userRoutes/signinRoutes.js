const express = require('express');
const router = express.Router();

// Import any necessary dependencies or models
const User = require('../../models/UserModel');

router.post('/signin', async (req, res) => {
  try {
    // Extract user data from the request body
    const { email, password } = req.body;

    // Find the user in the database
    const user = await User.findOne({ email });

    // Check if the user exists
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

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
