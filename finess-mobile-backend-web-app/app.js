require('dotenv').config();
const express = require("express");
const cors = require("cors");
const path = require("path");

const itemRoutes = require('./routes/itemRoutes');
const authRoutes = require('./routes/authRoutes');
const gymsRoutes = require('./routes/gymsRoutes');


const app = express();
app.use(cors());

// 💥 Increase JSON and urlencoded size limit
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// items Routes
app.get('/', (req, res) => res.send('API Running 🚀'));
app.use("/api/products", itemRoutes);

// NEW auth routes
app.use('/api/auth', authRoutes);

//Gym routes
app.use('/api/gyms', gymsRoutes);


// Serve uploaded images
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
