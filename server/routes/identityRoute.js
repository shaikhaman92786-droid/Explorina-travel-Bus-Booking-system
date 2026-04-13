const express = require('express');
const router = express.Router();

const { verifyToken } = require("../middleware/authMiddleware");

const {
  register,
  login,
  travelsLogin,
  getProfile,
  editProfile,
  checkUser,
  resetPassword
} = require('../controllers/authController');

// Auth Routes
router.post('/registration', register);
router.post('/login', login);
router.post('/travelslogin', travelsLogin);

// Profile
router.get('/profile', verifyToken, getProfile);
router.post('/edit-profile', verifyToken, editProfile);

// Password / Verification
router.post('/check-user', checkUser);
router.post('/reset-password', resetPassword);

module.exports = router;