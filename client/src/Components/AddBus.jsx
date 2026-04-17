import React, { useState } from "react";
import axiosInstance from "../utils/axiosInstance"; 
import Bus from '../Assets/Images/bus1.png'
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Addbus = () => {

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const [files, setFiles] = useState([]);

  const [formData, setFormData] = useState({
    BusName: "",
    DepartureCity: "",
    ArrivalCity: "",
    DateOfTravel: "",
    DepartureTime: "",
    ArrivalTime: "",
    Fare: "",
    DateOfArrival: "",
    NumRows: "",
    NumColumns: "",
  });

  const topCitiesIndia = [
    "Mumbai","Delhi","Bangalore","Hyderabad","Ahmedabad",
    "Chennai","Kolkata","Surat","Pune","Jaipur","Lucknow",
    "Kanpur","Nagpur","Visakhapatnam","Indore","Thane",
    "Bhopal","Patna","Vadodara","Ghaziabad", "Vijayawada",
    "Kochi","Trivandrum", "Hubli", "Mangalore", "Mysore", "Coorg"
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleimginput = (e) => {
    setFiles(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ FULL VALIDATION
    if (!formData.BusName.trim()) return toast.error("Bus Name is required");
    if (!formData.DepartureCity) return toast.error("Select Departure City");
    if (!formData.ArrivalCity) return toast.error("Select Arrival City");
    if (!formData.DateOfTravel) return toast.error("Select Departure Date");
    if (!formData.DateOfArrival) return toast.error("Select Arrival Date");
    if (!formData.DepartureTime) return toast.error("Select Departure Time");
    if (!formData.ArrivalTime) return toast.error("Select Arrival Time");

    if (!formData.Fare || formData.Fare <= 0)
      return toast.error("Enter valid Fare");

    if (!formData.NumRows || formData.NumRows <= 0)
      return toast.error("Enter valid number of rows");

    if (!formData.NumColumns || formData.NumColumns <= 0)
      return toast.error("Enter valid number of columns");

    if (!files[0])
      return toast.error("Bus Image is required");

    const data = new FormData();

    data.append("BusName", formData.BusName);
    data.append("BusImage", files[0]);
    data.append("DepartureCity", formData.DepartureCity);
    data.append("ArrivalCity", formData.ArrivalCity);
    data.append("DateOfTravel", formData.DateOfTravel);
    data.append("DateOfArrival", formData.DateOfArrival);
    data.append("DepartureTime", formData.DepartureTime);
    data.append("ArrivalTime", formData.ArrivalTime);
    data.append("Fare", formData.Fare);
    data.append("NumRows", formData.NumRows);
    data.append("NumColumns", formData.NumColumns);

    try {
      const res = await axiosInstance.post("/bus/addbus",data,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );

      toast.success(res.data.message);
      setTimeout(() => navigate("/allbus"), 2000);

    } catch (err) {
      toast.error(err.response?.data?.message || "Server error");
    }
  };


  return (
  <>
    <ToastContainer position="top-right" autoClose={3000} />

    <div className="min-h-screen bg-slate-200 flex items-center justify-center p-2 sm:p-4">
      <div className="w-full max-w-5xl mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl flex flex-col md:flex-row">

          {/* Left side: Illustration */}
          <div className="md:w-1/3 w-full p-5 md:p-8 flex flex-col justify-center items-center bg-blue-600 rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none">
            <img
              src={Bus}
              alt="Add Bus Illustration"
              className="w-28 h-28 md:w-48 md:h-48 object-cover rounded-full shadow-lg mb-4 md:mb-6"
            />
            <h2 className="text-white text-xl md:text-3xl font-bold text-center">
              Add New Bus
            </h2>
            <p className="text-blue-200 mt-1 md:mt-2 text-center text-sm md:text-base">
              Fill in the details to add a new bus to the fleet.
            </p>
          </div>

          {/* Right side: Form */}
          <div className="md:w-2/3 w-full p-4 sm:p-6 md:p-12">
            <h1 className="text-xl md:text-3xl font-bold text-gray-800 mb-4 md:mb-6">
              Bus Details
            </h1>

            <form onSubmit={handleSubmit} encType="multipart/form-data" noValidate>

              {/* 👇 FIXED GRID */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-x-6">

                {/* Bus Name */}
                <div className="col-span-1 sm:col-span-2">
                  <label className="block text-gray-700 text-sm font-bold mb-1 md:mb-2">
                    Bus Name / Operator
                  </label>
                  <input
                    type="text"
                    id="BusName"
                    value={formData.BusName}
                    onChange={handleChange}
                    className="shadow-md border rounded-lg w-full py-2 md:py-3 px-3 md:px-4 text-sm md:text-base text-gray-700 focus:outline-blue-600"
                    placeholder="e.g., Volvo Sleeper"
                    required
                  />
                </div>

                {/* Cities */}
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-1 md:mb-2">From</label>
                  <select
                    id="DepartureCity"
                    value={formData.DepartureCity}
                    onChange={handleChange}
                    className="shadow-md border rounded-lg w-full py-2 md:py-3 px-3 md:px-4 text-sm md:text-base text-gray-700 focus:outline-blue-600"
                    required
                  >
                    <option value="">Select Departure City</option>
                    {topCitiesIndia.map(city => <option key={city}>{city}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-1 md:mb-2">To</label>
                  <select
                    id="ArrivalCity"
                    value={formData.ArrivalCity}
                    onChange={handleChange}
                    className="shadow-md border rounded-lg w-full py-2 md:py-3 px-3 md:px-4 text-sm md:text-base text-gray-700 focus:outline-blue-600"
                    required
                  >
                    <option value="">Select Arrival City</option>
                    {topCitiesIndia.map(city => <option key={city}>{city}</option>)}
                  </select>
                </div>

                {/* Dates */}
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-1 md:mb-2">Departure Date</label>
                  <input
                    type="date"
                    id="DateOfTravel"
                    value={formData.DateOfTravel}
                    onChange={handleChange}
                    className="shadow-md border rounded-lg w-full py-2 md:py-3 px-3 md:px-4 text-sm md:text-base text-gray-700 focus:outline-blue-600"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-1 md:mb-2">Arrival Date</label>
                  <input
                    type="date"
                    id="DateOfArrival"
                    value={formData.DateOfArrival}
                    onChange={handleChange}
                    className="shadow-md border rounded-lg w-full py-2 md:py-3 px-3 md:px-4 text-sm md:text-base text-gray-700 focus:outline-blue-600"
                    required
                  />
                </div>

                {/* Times */}
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-1 md:mb-2">Departure Time</label>
                  <input
                    type="time"
                    id="DepartureTime"
                    value={formData.DepartureTime}
                    onChange={handleChange}
                    className="shadow-md border rounded-lg w-full py-2 md:py-3 px-3 md:px-4 text-sm md:text-base text-gray-700 focus:outline-blue-600"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-1 md:mb-2">Arrival Time</label>
                  <input
                    type="time"
                    id="ArrivalTime"
                    value={formData.ArrivalTime}
                    onChange={handleChange}
                    className="shadow-md border rounded-lg w-full py-2 md:py-3 px-3 md:px-4 text-sm md:text-base text-gray-700 focus:outline-blue-600"
                    required
                  />
                </div>

                {/* Fare & Image */}
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-1 md:mb-2">Fare (₹)</label>
                  <input
                    type="number"
                    id="Fare"
                    value={formData.Fare}
                    onChange={handleChange}
                    placeholder="e.g.,800"
                    className="shadow-md border rounded-lg w-full py-2 md:py-3 px-3 md:px-4 text-sm md:text-base text-gray-700 focus:outline-blue-600"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-1 md:mb-2">Bus Image</label>
                  <input
                    type="file"
                    id="BusImage"
                    onChange={handleimginput}
                    className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    required
                  />
                </div>

                {/* Rows & Columns */}
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-1 md:mb-2">Number of Rows</label>
                  <input
                    type="number"
                    id="NumRows"
                    value={formData.NumRows}
                    onChange={handleChange}
                    placeholder="e.g.,10"
                    className="shadow-md border rounded-lg w-full py-2 md:py-3 px-3 md:px-4 text-sm md:text-base text-gray-700 focus:outline-blue-600"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-1 md:mb-2">Number of Columns</label>
                  <input
                    type="number"
                    id="NumColumns"
                    value={formData.NumColumns}
                    onChange={handleChange}
                    placeholder="e.g.,4"
                    className="shadow-md border rounded-lg w-full py-2 md:py-3 px-3 md:px-4 text-sm md:text-base text-gray-700 focus:outline-blue-600"
                    required
                  />
                </div>

              </div>

              {/* Button */}
              <button
                type="submit"
                className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 md:py-3 px-4 rounded-lg transition-all duration-300"
              >
                Add Bus
              </button>

            </form>
          </div>
        </div>
      </div>
    </div>
  </>
);
};

export default Addbus;