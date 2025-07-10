// require('dotenv').config();
// const express = require("express");
// const cors = require("cors");
// const path = require("path");

// const itemRoutes = require('./routes/itemRoutes');
// const authRoutes = require('./routes/authRoutes');
// const gymsRoutes = require('./routes/gymsRoutes');

// const usersRoutes = require('./routes/usersRoutes');
// const productsRoutes = require('./routes/productsRoutes');
// const rolesRoutes = require('./routes/rolesRoutes');
// const userRolesMappingRoutes = require('./routes/userRolesMappingRoutes');

// const gymsRoutes = require('./routes/gymsRoutes');
// const gymUsersMappingRoutes = require('./routes/gymUsersMappingRoutes');
// const productItemsMappingRoutes = require('./routes/productItemsMappingRoutes');
// const masterTableRoutes = require('./routes/masterTableRoutes');
// const app = express();
// app.use(cors());

// // 💥 Increase JSON and urlencoded size limit
// app.use(express.json({ limit: '10mb' }));
// app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// // items Routes
// app.get('/', (req, res) => res.send('API Running 🚀'));
// app.use("/api/products", itemRoutes);

// // NEW auth routes
// app.use('/api/auth', authRoutes);

// //Gym routes
// app.use('/api/gyms', gymsRoutes);


// app.use('/api/users', usersRoutes);
// app.use('/api/products', productsRoutes);
// app.use('/api/roles', rolesRoutes);
// app.use('/api/userroles', userRolesMappingRoutes);

// app.use('/api/gyms', gymsRoutes);
// app.use('/api/gymusers', gymUsersMappingRoutes);
// app.use('/api/productitems', productItemsMappingRoutes);
// app.use('/api/master', masterTableRoutes);

// // Serve uploaded images
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


require('dotenv').config();
const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

// --------------------------------------------------------
// ✅ Middleware setup
// --------------------------------------------------------
app.use(cors());

// Increase JSON and urlencoded size limits
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// --------------------------------------------------------
// ✅ Health check
// --------------------------------------------------------
app.get('/', (req, res) => res.send('API Running 🚀'));

// --------------------------------------------------------
// ✅ Static files (for uploaded images)
// --------------------------------------------------------
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// --------------------------------------------------------
// ✅ Route imports
// --------------------------------------------------------
const itemRoutes = require('./routes/itemRoutes');                     // Food items
const authRoutes = require('./routes/authRoutes');                     // Login/register
const usersRoutes = require('./routes/users1Routes');                   // Users
const productsRoutes = require('./routes/productsRoutes');             // Products
const rolesRoutes = require('./routes/rolesRoutes');                   // Roles
const userRolesMappingRoutes = require('./routes/userRolesMappingRoutes'); // User-Role Mapping
const gymsRoutes = require('./routes/gymsRoutes');                     // Gyms
const gymUsersMappingRoutes = require('./routes/gymUsersMappingRoutes'); // Gym-User Mapping
const productItemsMappingRoutes = require('./routes/productItemsMappingRoutes'); // Product-Item Mapping
const masterTableRoutes = require('./routes/masterTableRoutes');       // Master table
const nutrientsRoutes = require("./routes/nutrientsRoutes");
// Import your routes
const productItemsRoutes = require('./routes/productItemsRoutes');


// --------------------------------------------------------
// ✅ API Routes
// --------------------------------------------------------

// 🥗 Items
app.use('/api/items', itemRoutes);

// 🔐 Auth
app.use('/api/auth', authRoutes);

// 🏋️ Gyms
app.use('/api/gyms', gymsRoutes);

// 👥 Users
app.use('/api/users', usersRoutes);

// 🛒 Products
app.use('/api/products', productsRoutes);

// 📜 Roles
app.use('/api/roles', rolesRoutes);

//nutrients 
app.use("/api/nutrients", nutrientsRoutes);

// 🔗 User-Role Mapping
app.use('/api/userroles', userRolesMappingRoutes);

// 🔗 Gym-User Mapping
app.use('/api/gym-user-mapping', gymUsersMappingRoutes);

// 🔗 Product-Item Mapping
app.use('/api/productitems', productItemsMappingRoutes);

// ⚙️ Master Table (App Config / Flags)
app.use('/api/master', masterTableRoutes);

// Mount routes
app.use('/api/product-items', productItemsRoutes);


// --------------------------------------------------------
// ✅ Start Server
// --------------------------------------------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
 