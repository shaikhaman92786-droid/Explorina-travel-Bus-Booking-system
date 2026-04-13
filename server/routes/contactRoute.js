const express = require('express');
const router = express.Router();

const { contact } = require('../controllers/contactController');

// Contact form route
router.post("/contact", contact);

module.exports = router;