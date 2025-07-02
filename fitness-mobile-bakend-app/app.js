// require('dotenv').config();
// const express = require("express");
// const cors = require("cors");
// const productRoutes = require("./routes/productRoutes");

// const app = express();
// app.use(cors());
// app.use(express.json());

// app.use("/api/products", productRoutes);

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// app.js
require('dotenv').config();
const express = require("express");
const cors = require("cors");
const path = require("path");

const productRoutes = require("./routes/productRoutes");

const app = express();
app.use(cors());

// 💥 Increase JSON and urlencoded size limit
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Routes
app.use("/api/products", productRoutes);
app.get('/', (req, res) => res.send('API Running 🚀'));

// Serve uploaded images
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
