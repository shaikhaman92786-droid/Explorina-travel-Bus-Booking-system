const express = require('express');
const router = express.Router();
const upload = require("../middleware/upload");

const { verifyToken } = require("../middleware/authMiddleware");
const { isAdmin } = require("../middleware/roleMiddleware");

const {
  getAllBuses,
  searchBus,
  addBus,
  getBusById,
  updateBus 
} = require('../controllers/busController');

// Routes
router.get("/allbus", verifyToken, getAllBuses);
router.post("/searchbus", verifyToken, searchBus);
router.get("/:id", verifyToken, getBusById);
router.post("/addbus", verifyToken, isAdmin, upload.single("BusImage"), addBus);
router.put("/updatebus/:id", verifyToken, isAdmin, upload.single("BusImage"), updateBus);


module.exports = router;