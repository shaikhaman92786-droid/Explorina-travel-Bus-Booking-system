const express = require('express');
const router = express.Router();

const { verifyToken } = require("../middleware/authMiddleware");
const { isAdmin } = require("../middleware/roleMiddleware");

const {
  getAllBuses,
  searchBus,
  addBus,
  getBusById,
  updateBus 
} = require('../controllers/busController');

const multer = require("multer");

// multer config (same as before)
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + "-" + file.originalname)
});

const upload = multer({ storage });

// Routes
router.get("/allbus", verifyToken, getAllBuses);
router.post("/searchbus", verifyToken, searchBus);
router.get("/:id", verifyToken, getBusById);
router.post("/addbus", verifyToken, isAdmin, upload.single("BusImage"), addBus);
router.put("/updatebus/:id", verifyToken, isAdmin, upload.single("BusImage"), updateBus);


module.exports = router;