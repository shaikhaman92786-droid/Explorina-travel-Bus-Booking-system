const User = require('../model/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// REGISTER
exports.register = async (req, res) => {
  try {
    const { firstName, lastName, phone, gender, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User is already register"
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    await User.create({
      firstName,
      lastName,
      phone,
      gender,
      email,
      password: hashPassword,
      role: "user"
    });

    res.status(200).json({
      message: "User is registered"
    });

  } catch (err) {
    res.status(500).json({
      message: "Server Error"
    });
  }
};

// LOGIN (USER)
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(400).json({
        message: "Email is invalid"
      });
    }

    const matchPassword = await bcrypt.compare(password, existingUser.password);

    if (!matchPassword) {
      return res.status(400).json({
        message: "Password is invalid"
      });
    }

    const token = jwt.sign(
      { id: existingUser._id },
      process.env.JWT_SECRET_KEY,
      { expiresIn: '7D' }
    );

    res.status(200).json({
      token,
      user: existingUser,
      message: "User is Login"
    });

  } catch (err) {
    res.status(500).json({
      message: "Server Error"
    });
  }
};

// LOGIN (ADMIN / TRAVELS)
exports.travelsLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(400).json({
        message: "Email is invalid"
      });
    }

    const matchPassword = await bcrypt.compare(password, existingUser.password);

    if (!matchPassword) {
      return res.status(400).json({
        message: "Password is invalid"
      });
    }

    const token = jwt.sign(
      { id: existingUser._id },
      process.env.JWT_SECRET_KEY,
      { expiresIn: '1D' }
    );

    res.status(200).json({
      token,
      user: existingUser,
      message: "Welcome admin"
    });

  } catch (err) {
    res.status(500).json({
      message: "Server Error"
    });
  }
};

// GET PROFILE
exports.getProfile = async (req, res) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    res.status(200).json({ user });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server error"
    });
  }
};

// EDIT PROFILE
exports.editProfile = async (req, res) => {
  try {
    const { firstName, lastName, phone, email } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { firstName, lastName, phone, email },
      { new: true }
    );

    res.status(200).json({
      message: "Profile updated successfully",
      user: updatedUser
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server error"
    });
  }
};

// CHECK USER
exports.checkUser = async (req, res) => {
  try {
    const { email, phone } = req.body;

    const user = await User.findOne({ email, phone });

    if (!user) {
      return res.status(404).json({
        message: "Invalid email or phone"
      });
    }

    res.status(200).json({
      message: "User verified"
    });

  } catch (error) {
    res.status(500).json({
      message: "Server error"
    });
  }
};

// RESET PASSWORD
exports.resetPassword = async (req, res) => {
  try {
    const { email, phone, password } = req.body;

    const user = await User.findOne({ email, phone });

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user.password = hashedPassword;
    await user.save();

    res.status(200).json({
      message: "Password updated successfully"
    });

  } catch (error) {
    res.status(500).json({
      message: "Server error"
    });
  }
};