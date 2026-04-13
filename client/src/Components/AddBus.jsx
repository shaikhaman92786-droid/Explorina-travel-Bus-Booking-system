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
    <div className="min-h-screen bg-slate-200 flex items-center justify-center p-4">
      <div className="w-full max-w-5xl mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl flex flex-col md:flex-row">

          {/* Left side: Illustration */}
          <div className="md:w-1/3 w-full p-8 flex flex-col justify-center items-center bg-blue-600 rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none">
            <img
              src={Bus}
              alt="Add Bus Illustration"
              className="w-48 h-48 object-cover rounded-full shadow-lg mb-6"
            />
            <h2 className="text-white text-3xl font-bold text-center">Add New Bus</h2>
            <p className="text-blue-200 mt-2 text-center">Fill in the details to add a new bus to the fleet.</p>
          </div>

          {/* Right side: Form */}
          <div className="md:w-2/3 w-full p-8 md:p-12">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Bus Details</h1>
            <form onSubmit={handleSubmit} encType="multipart/form-data" noValidate>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">

                {/* Bus Name */}
                <div className="mb-4 col-span-2">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="BusName">Bus Name / Operator</label>
                  <input
                    type="text"
                    id="BusName"
                    value={formData.BusName}
                    onChange={handleChange}
                    className="shadow-md border rounded-lg w-full py-3 px-4 pl-10 text-gray-700 focus:outline-blue-600"
                    placeholder="e.g., Volvo Sleeper"
                    required
                  />
                </div>

                {/* Departure & Arrival City */}
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="DepartureCity">From</label>
                  <select
                    id="DepartureCity"
                    value={formData.DepartureCity}
                    onChange={handleChange}
                    className="shadow-md border rounded-lg w-full py-3 px-4 pl-10 text-gray-700 focus:outline-blue-600"
                    required>
                    <option value="">Select Departure City</option>
                    {topCitiesIndia.map(city => <option key={city} value={city}>{city}</option>)}
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="ArrivalCity">To</label>
                  <select
                    id="ArrivalCity"
                    value={formData.ArrivalCity}
                    onChange={handleChange}
                    className="shadow-md border rounded-lg w-full py-3 px-4 pl-10 text-gray-700 focus:outline-blue-600"
                    required>
                    <option value="">Select Arrival City</option>
                    {topCitiesIndia.map(city => <option key={city} value={city}>{city}</option>)}
                  </select>
                </div>

                {/* Dates */}
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="DateOfTravel">Departure Date</label>
                  <input
                    type="date"
                    id="DateOfTravel"
                    value={formData.DateOfTravel}
                    onChange={handleChange}
                    className="shadow-md border rounded-lg w-full py-3 px-4 pl-10 text-gray-700 focus:outline-blue-600"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="DateOfArrival">Arrival Date</label>
                  <input
                    type="date"
                    id="DateOfArrival"
                    value={formData.DateOfArrival}
                    onChange={handleChange}
                    className="shadow-md border  rounded-lg w-full py-3 px-4 pl-10 text-gray-700 focus:outline-blue-600"
                    required
                  />
                </div>

                {/* Times */}
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="DepartureTime">Departure Time</label>
                  <input
                    type="time"
                    id="DepartureTime"
                    value={formData.DepartureTime}
                    onChange={handleChange} className="shadow-md border rounded-lg w-full py-3 px-4 pl-10 text-gray-700 focus:outline-blue-600"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="ArrivalTime">Arrival Time</label>
                  <input
                    type="time"
                    id="ArrivalTime"
                    value={formData.ArrivalTime}
                    onChange={handleChange}
                    className="shadow-md border rounded-lg w-full py-3 px-4 pl-10 text-gray-700 focus:outline-blue-600"
                    required
                  />
                </div>

                {/* Fare & Bus Image */}
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Fare">Fare (₹)</label>
                  <input
                    type="number"
                    id="Fare"
                    value={formData.Fare}
                    onChange={handleChange}
                    className="shadow-md border rounded-lg w-full py-3 px-4 pl-10 text-gray-700 focus:outline-blue-600"
                    placeholder="e.g., 800"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="BusImage">Bus Image</label>
                  <input
                    type="file"
                    id="BusImage"
                    onChange={handleimginput}
                    className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    required
                  />
                </div>

                {/* Rows & Columns */}
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="NumRows">Number of Rows</label>
                  <input
                    type="number"
                    id="NumRows" value={formData.NumRows}
                    onChange={handleChange}
                    className="shadow-md border rounded-lg w-full py-3 px-4 pl-10 text-gray-700 focus:outline-blue-600"
                    placeholder="e.g., 10"
                    required
                  />
                </div>
                <div className="mb-6">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="NumColumns">Number of Columns</label>
                  <input
                    type="number"
                    id="NumColumns"
                    value={formData.NumColumns}
                    onChange={handleChange}
                    className="shadow-md border rounded-lg w-full py-3 px-4 pl-10 text-gray-700 focus:outline-blue-600"
                    placeholder="e.g., 4"
                    required
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline transition-all duration-300 transform hover:scale-105">
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