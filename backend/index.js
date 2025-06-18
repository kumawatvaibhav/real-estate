const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const authRoutes = require('./routes/auth');
const propertyRoutes = require("./routes/properties");

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON bodies

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((err) => console.error('❌ MongoDB connection failed:', err));

app.use('/api/auth', authRoutes);

app.use("/api/properties", propertyRoutes);

// Sample route
app.get('/', (req, res) => {
  res.send('API is running...');
});


// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(` Server started on port ${PORT}`);
});
