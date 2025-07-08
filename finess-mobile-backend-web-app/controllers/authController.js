require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

const JWT_SECRET = process.env.JWT_SECRET || "yoursecretkey";

async function register(req, res) {
  const { email, password, userType } = req.body;
  if (!email || !password || !userType) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const existing = await userModel.findUserByEmail(email);
    if (existing) return res.status(400).json({ error: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    await userModel.createUser({ email, password: hashedPassword, userType });

    res.json({ message: "User registered successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
}

async function login(req, res) {
  const { email, password, userType } = req.body;
  if (!email || !password || !userType) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const user = await userModel.findUserByEmail(email);
    if (!user) return res.status(401).json({ error: "Invalid credentials" });

    if (user.userType !== userType) {
      return res.status(403).json({ error: "User type mismatch" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign(
      { id: user.id, email: user.email, userType: user.userType },
      JWT_SECRET,
      { expiresIn: '2h' }
    );

    res.json({ message: "Login successful", token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
}

module.exports = {
  register,
  login,
};
