import axiosInstance from "../utils/axiosInstance"; 
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

const UpdateBus = () => {

  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [image, setImage] = useState(null);

  const [formData, setFormData] = useState({
    BusName: '',
    BusImage: '',
    DepartureCity: '',
    ArrivalCity: '',
    DateOfTravel: '',
    DateOfArrival: '',
    DepartureTime: '',
    ArrivalTime: '',
    Fare: '',
    NumRows: '',
    NumColumns: ''
  });

  // ✅ Same city list as AddBus
  const topCitiesIndia = [
    "Mumbai","Delhi","Bangalore","Hyderabad","Ahmedabad",
    "Chennai","Kolkata","Surat","Pune","Jaipur","Lucknow",
    "Kanpur","Nagpur","Visakhapatnam","Indore","Thane",
    "Bhopal","Patna","Vadodara","Ghaziabad",
    "Vijayawada","Kochi","Trivandrum","Hubli",
    "Mangalore","Mysore","Coorg"
  ];

  // ✅ Fetch old data (auto fill)
  useEffect(() => {
    const fetchBusDetails = async () => {
      try {
        const response = await axiosInstance.get(`/bus/${id}`);

        const busData = response.data;

        setFormData({
          ...busData,
          DepartureCity: busData.DepartureCity?.trim(),
          ArrivalCity: busData.ArrivalCity?.trim(),
          DateOfTravel: busData.DateOfTravel?.split('T')[0],
          DateOfArrival: busData.DateOfArrival?.split('T')[0],
        });

      } catch (error) {
        console.error('Error fetching bus details:', error);
        toast.error("Failed to load bus data");
      }
    };

    fetchBusDetails();
  }, [id]);

  // ✅ Handle input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // ✅ Handle image
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  // ✅ Submit updated data
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 🔥 FULL VALIDATION (ALL FIELDS REQUIRED)

if (!formData.BusName.trim())
  return toast.error("Bus Name is required");

if (!formData.DepartureCity)
  return toast.error("Select Departure City");

if (!formData.ArrivalCity)
  return toast.error("Select Arrival City");

if (formData.DepartureCity === formData.ArrivalCity)
  return toast.error("From and To cannot be same");

if (!formData.DateOfTravel)
  return toast.error("Select Departure Date");

if (!formData.DateOfArrival)
  return toast.error("Select Arrival Date");

if (!formData.DepartureTime)
  return toast.error("Select Departure Time");

if (!formData.ArrivalTime)
  return toast.error("Select Arrival Time");

if (!formData.Fare || formData.Fare <= 0)
  return toast.error("Enter valid Fare");

if (!formData.NumRows || formData.NumRows <= 0)
  return toast.error("Enter valid number of rows");

if (!formData.NumColumns || formData.NumColumns <= 0)
  return toast.error("Enter valid number of columns");

// ✅ Image validation (important)
if (!formData.BusImage && !image)
  return toast.error("Bus Image is required");

    // 🔥 Basic validation
    if (formData.DepartureCity === formData.ArrivalCity) {
      return toast.error("From and To cannot be same");
    }

    const form = new FormData();

    Object.keys(formData).forEach((key) => {
      form.append(key, formData[key]);
    });

    if (image) {
      form.append("BusImage", image);
    }

    try {
      const response = await axiosInstance.put(`/bus/updatebus/${id}`,form);

      toast.success(response.data.message);

      setTimeout(() => {
        navigate("/allbus");
      }, 2000);

    } catch (error) {
      console.error('Error updating bus:', error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="min-h-screen bg-slate-200 flex items-center justify-center p-4">
        <div className="w-full max-w-5xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl flex flex-col md:flex-row overflow-hidden">

            {/* LEFT SIDE */}
            <div className="md:w-1/3 w-full p-8 flex flex-col justify-center items-center bg-gradient-to-b from-blue-500 to-blue-700">
              
              <h2 className="text-white text-2xl font-bold mb-6 text-center">
                Update Bus Image
              </h2>

              <div className="relative group">
                <img
                  src={
                    image
                      ? URL.createObjectURL(image)
                      : formData.BusImage || ""
                  }
                  alt="Bus Preview"
                  className="w-52 h-52 object-cover rounded-full border-4 border-white shadow-lg"
                />

                <label
                  htmlFor="BusImage"
                  className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 rounded-full text-white text-sm font-semibold opacity-0 group-hover:opacity-100 transition cursor-pointer"
                >
                  Change Image
                </label>
              </div>

              <input
                type="file"
                id="BusImage"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />

              <p className="text-blue-100 mt-4 text-sm text-center">
                Click on the image to upload a new one.
              </p>
            </div>

            {/* RIGHT SIDE */}
            <div className="md:w-2/3 w-full p-8 md:p-10">
              <h1 className="text-2xl font-bold text-gray-800 mb-6">
                Edit Bus Details
              </h1>

              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                  {/* Bus Name */}
                  <div className="col-span-2">
                    <label className="block text-sm font-semibold mb-1">
                      Bus Name / Operator
                    </label>
                    <input
                      type="text"
                      id="BusName"
                      value={formData.BusName}
                      onChange={handleChange}
                      className="w-full border rounded-lg px-4 py-2 shadow-sm"
                    />
                  </div>

                  {/* From */}
                  <div>
                    <label className="block text-sm font-semibold mb-1">From</label>
                    <select
                      id="DepartureCity"
                      value={formData.DepartureCity}
                      onChange={handleChange}
                      className="w-full border rounded-lg px-4 py-2"
                    >
                      <option value="">Select Departure City</option>
                      {topCitiesIndia.map((city) => (
                        <option key={city} value={city}>{city}</option>
                      ))}
                    </select>
                  </div>

                  {/* To */}
                  <div>
                    <label className="block text-sm font-semibold mb-1">To</label>
                    <select
                      id="ArrivalCity"
                      value={formData.ArrivalCity}
                      onChange={handleChange}
                      className="w-full border rounded-lg px-4 py-2"
                    >
                      <option value="">Select Arrival City</option>
                      {topCitiesIndia.map((city) => (
                        <option key={city} value={city}>{city}</option>
                      ))}
                    </select>
                  </div>

                  {/* Dates */}
                  <div>
                    <label className="block text-sm font-semibold mb-1">Departure Date</label>
                    <input
                      type="date"
                      id="DateOfTravel"
                      value={formData.DateOfTravel}
                      onChange={handleChange}
                      className="w-full border rounded-lg px-4 py-2"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-1">Arrival Date</label>
                    <input
                      type="date"
                      id="DateOfArrival"
                      value={formData.DateOfArrival}
                      onChange={handleChange}
                      className="w-full border rounded-lg px-4 py-2"
                    />
                  </div>

                  {/* Time */}
                  <div>
                    <label className="block text-sm font-semibold mb-1">Departure Time</label>
                    <input
                      type="time"
                      id="DepartureTime"
                      value={formData.DepartureTime}
                      onChange={handleChange}
                      className="w-full border rounded-lg px-4 py-2"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-1">Arrival Time</label>
                    <input
                      type="time"
                      id="ArrivalTime"
                      value={formData.ArrivalTime}
                      onChange={handleChange}
                      className="w-full border rounded-lg px-4 py-2"
                    />
                  </div>

                  {/* Fare */}
                  <div>
                    <label className="block text-sm font-semibold mb-1">Fare (₹)</label>
                    <input
                      type="number"
                      id="Fare"
                      value={formData.Fare}
                      onChange={handleChange}
                      className="w-full border rounded-lg px-4 py-2"
                    />
                  </div>

                  {/* Rows */}
                  <div>
                    <label className="block text-sm font-semibold mb-1">Number of Rows</label>
                    <input
                      type="number"
                      id="NumRows"
                      value={formData.NumRows}
                      onChange={handleChange}
                      className="w-full border rounded-lg px-4 py-2"
                    />
                  </div>

                  {/* Columns */}
                  <div className="col-span-2">
                    <label className="block text-sm font-semibold mb-1">Number of Columns</label>
                    <input
                      type="number"
                      id="NumColumns"
                      value={formData.NumColumns}
                      onChange={handleChange}
                      className="w-full border rounded-lg px-4 py-2"
                    />
                  </div>

                </div>

                <button
                  type="submit"
                  className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg"
                >
                  Update Bus
                </button>
              </form>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateBus;