import React, { useState, useEffect } from "react";
import axiosInstance from "../utils/axiosInstance"; 
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const SearchBus = () => {

  const token = localStorage.getItem("token");

  const topCitiesIndia = [
    "Mumbai","Delhi","Bangalore","Hyderabad","Ahmedabad",
    "Chennai","Kolkata","Surat","Pune","Jaipur","Lucknow",
    "Kanpur","Nagpur","Visakhapatnam","Indore","Thane",
    "Bhopal","Patna","Vadodara","Ghaziabad", "Vijayawada", "Kochi",
    "Trivandrum", "Hubli", "Mangalore", "Mysore", "Coorg"
  ];

  const [formData, setFormData] = useState({
    departureCity: "",
    arrivalCity: "",
    date: ""
  });

  const [busList, setBusList] = useState([]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  // ✅ Validation + Search
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // 🔴 Validation
    if (!formData.departureCity || !formData.arrivalCity || !formData.date) {
      toast.warning("Please fill all fields to search bus");
      return;
    }

    if (formData.departureCity === formData.arrivalCity) {
      toast.error("Departure and Arrival city cannot be same");
      return;
    }

    try {
      const res = await axiosInstance.post(
        "/bus/searchbus",formData);

      if (res.data.length === 0) {
        toast.info("No buses found for selected route");
      }

      setBusList(res.data);

    } catch (error) {
      console.log("Error fetching buses", error);
      toast.error("Something is wrong");
    }
  };

  // Load all buses initially
  useEffect(() => {
    const getBuses = async () => {
      try {
        const res = await axiosInstance.get("/bus/allbus");

        setBusList(res.data);
      } catch (error) {
        console.log("Error loading buses", error);
        toast.error("Something is wrong");
      }
    };
    getBuses();
  }, []);

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="min-h-screen bg-slate-50">

        {/* Search Section */}
        <div className="bg-white shadow-md p-4">
          <div className="container mx-auto">

            <form
              onSubmit={handleFormSubmit}
              className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end"
            >

              {/* From */}
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  From
                </label>

                <select
                  id="departureCity"
                  onChange={handleInputChange}
                  value={formData.departureCity}
                  className="shadow-sm border rounded-lg w-full py-3 px-4 focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Departure City</option>

                  {topCitiesIndia.map(city => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}

                </select>
              </div>

              {/* To */}
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  To
                </label>

                <select
                  id="arrivalCity"
                  onChange={handleInputChange}
                  value={formData.arrivalCity}
                  className="shadow-sm border rounded-lg w-full py-3 px-4 focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Arrival City</option>

                  {topCitiesIndia.map(city => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}

                </select>
              </div>

              {/* Date */}
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Date
                </label>

                <input
                  type="date"
                  id="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className="shadow-sm border rounded-lg w-full py-3 px-4 focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Button */}
              <div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition transform hover:scale-105"
                >
                  Search
                </button>
              </div>

            </form>
          </div>
        </div>

        {/* Bus List */}
        <div className="container mx-auto p-4 md:p-8">

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {busList.length > 0 ? (

              busList.map((bus) => (

                <div
                  key={bus._id}
                  className="bg-white rounded-2xl shadow-md overflow-hidden flex flex-col sm:flex-row hover:shadow-xl transition"
                >

                  {/* Image */}
                  <div className="sm:w-1/3">
                    <img
                      src={bus.BusImage}
                      alt={bus.BusName}
                      className="w-full h-full object-cover min-h-[150px]"
                    />
                  </div>

                  {/* Info */}
                  <div className="p-5 flex flex-col justify-between sm:w-2/3">

                    <div>
                      <h5 className="text-2xl font-bold text-gray-800">
                        {bus.BusName}
                      </h5>

                      <p className="text-gray-600">
                        {bus.DepartureCity} → {bus.ArrivalCity}
                      </p>

                      <p className="text-sm text-gray-500 mt-2">
                        {new Date(bus.DateOfTravel).toLocaleDateString(
                          "en-GB",
                          {
                            weekday: "short",
                            day: "numeric",
                            month: "short"
                          }
                        )}
                        {" | "}
                        {bus.DepartureTime} - {bus.ArrivalTime}
                      </p>
                    </div>

                    <div className="flex justify-between items-center mt-4">

                      <div>
                        <p className="text-xl font-bold text-blue-600">
                          ₹{bus.Fare}
                        </p>

                        <p className="text-sm text-green-600 font-semibold">
                          {bus.seatsLeft} Seats Left
                        </p>
                      </div>

                      <Link
                        to={`/bus/${bus._id}`}
                        className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
                      >
                        Book Bus
                      </Link>

                    </div>

                  </div>

                </div>

              ))

            ) : (

              <div className="lg:col-span-2 text-center py-16 bg-white rounded-2xl shadow-md">
                <h2 className="text-2xl font-semibold text-gray-700">
                  No Buses Found
                </h2>

                <p className="text-gray-500 mt-2">
                  Please try a different search.
                </p>
              </div>

            )}

          </div>

        </div>

      </div>
    </>
  );
};

export default SearchBus;