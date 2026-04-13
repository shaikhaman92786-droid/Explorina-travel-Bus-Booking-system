const express = require('express');
const app = express();
const PORT = 5000;
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv')
const connectDB = require('./config/db');

dotenv.config()
connectDB();

// Middlewares.
app.use(cors());
app.use(express.json())
app.use("/uploads", express.static("uploads"));

// Routes.
app.use('/bus', require('./routes/busRoute'));
app.use('/order', require('./routes/orderRoute'));
app.use('/contact', require('./routes/contactRoute'));
app.use('/identity', require('./routes/identityRoute'));

app.listen(PORT, (req, res) => {
    console.log("Server is active");
})