const Bus = require('../model/Bus');

// GET all buses
exports.getAllBuses = async (req, res) => {
  try {
    const buses = await Bus.find();
    res.status(200).json(buses);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// SEARCH bus
exports.searchBus = async (req, res) => {
  try {
    const { departureCity, arrivalCity } = req.body;

    const buses = await Bus.find({
      DepartureCity: departureCity,
      ArrivalCity: arrivalCity
    });

    res.status(200).json(buses);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// GET single bus by ID
exports.getBusById = async (req, res) => {
  try {
    const bus = await Bus.findById(req.params.id);

    if (!bus) {
      return res.status(404).json({
        message: "Bus not found"
      });
    }

    res.status(200).json(bus);

  } catch (err) {
    res.status(500).json({
      message: "Server error"
    });
  }
};

// ADD bus (Admin)
exports.addBus = async (req, res) => {
  try {
    const newBus = new Bus({
      BusName: req.body.BusName,
      BusImage: req.file
        ? `http://localhost:5000/uploads/${req.file.filename}`
        : "",
      DepartureCity: req.body.DepartureCity,
      ArrivalCity: req.body.ArrivalCity,
      DateOfTravel: new Date(req.body.DateOfTravel),
      DateOfArrival: new Date(req.body.DateOfArrival),
      DepartureTime: req.body.DepartureTime,
      ArrivalTime: req.body.ArrivalTime,
      Fare: Number(req.body.Fare),
      NumRows: Number(req.body.NumRows),
      NumColumns: Number(req.body.NumColumns),
    });

    await newBus.save();

    res.status(201).json({ message: "Bus added successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error adding bus" });
  }
};

// UPDATE BUS
exports.updateBus = async (req, res) => {
  try {

    const updatedData = {
      BusName: req.body.BusName,
      DepartureCity: req.body.DepartureCity,
      ArrivalCity: req.body.ArrivalCity,
      DateOfTravel: req.body.DateOfTravel,
      DateOfArrival: req.body.DateOfArrival,
      DepartureTime: req.body.DepartureTime,
      ArrivalTime: req.body.ArrivalTime,
      Fare: req.body.Fare,
      NumRows: req.body.NumRows,
      NumColumns: req.body.NumColumns,
      Category: req.body.Category,
      Rating: req.body.Rating,
      SelectedSeats: req.body.SelectedSeats,
    };

    // ✅ If new image uploaded
    if (req.file) {
      updatedData.BusImage = `http://localhost:5000/uploads/${req.file.filename}`;
    }

    const updatedBus = await Bus.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true }
    );

    if (!updatedBus) {
      return res.status(404).json({
        message: "Bus not found"
      });
    }

    res.status(200).json({
      message: "Bus updated successfully",
      data: updatedBus
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error updating bus"
    });
  }
};