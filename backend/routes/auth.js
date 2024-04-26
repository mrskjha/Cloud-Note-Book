const route = require("express").Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
var fetchuser = require("../middlerware/fetchuser");

const JWT_SECRET = "sunnyisagood$boy"; // Consider using a stronger secret

// Route 1: Creating a user using: POST "/api/auth/createuser". Doesn't require Auth
route.post(
  "/createuser",
  [
    body("name", "Enter a valid name with at least 3 characters").isLength({
      min: 3,
    }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password must be at least 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // Check for existing user with unique email in a more concise way
      const existingUser = await User.findOne({ email: req.body.email });
      if (existingUser) {
        return res
          .status(400)
          .json({ error: "User with this email already exists" });
      }

      // Create a new user with secure password hashing
      const salt = await bcrypt.genSalt(10);
      const secpass = await bcrypt.hash(req.body.password, salt);

      const user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secpass,
      });

      // Create a JWT token with appropriate payload (avoid exposing sensitive data)
      const payload = { user: { id: user.id } }; // Consider excluding unnecessary information
      const authtoken = jwt.sign(payload, JWT_SECRET);

      res.json({ authtoken });
    } catch (err) {
      console.error(err.message);
      // Handle specific errors more gracefully (e.g., validation errors, database errors)
      res.status(500).json({ error: "Internal Server Error" }); // Consider more informative errors
    }
  }
);

//Route 2: Authentication a user using: POST "/api/auth/login". Doesn't require Auth
route.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ error: "Invalid credentials" }); // Use 401 for unauthorized
      }

      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      // Create a JWT token with appropriate payload
      const payload = { user: { id: user.id } }; // Consider excluding unnecessary information
      const authtoken = jwt.sign(payload, JWT_SECRET);

      res.json({ authtoken });
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ error: "Internal Server Error" }); // Consider more informative errors
    }
  }
);

//Route 3: Get loggedin a user details using using: POST "/api/auth/getuser". login require
route.post("/getuser", fetchuser, async (req, res) => {
  try {
    userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = route;
