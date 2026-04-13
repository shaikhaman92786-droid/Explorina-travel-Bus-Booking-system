import React, { useState } from "react";
import axiosInstance from "../utils/axiosInstance"; 
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Registration = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    gender: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {

    if (e.target.type === 'radio') {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    } else {
      setFormData({ ...formData, [e.target.id]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
   
    try {
      const response = await axiosInstance.post("/identity/registration", formData);

      toast.success(response.data.message);
        setTimeout(() => {
          navigate('/login');
        }, 2000);
    } catch (error) {
        console.log(error);
        toast.error("Something is wrong");
    }
  };

  return (
    <>
    <ToastContainer position="top-right" autoClose={3000} />
    <div className="min-h-screen bg-slate-200 flex items-center justify-center p-4">
      <div className="w-full max-w-5xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl flex flex-col md:flex-row">

          {/* Left side: Illustration */}
          <div className="md:w-1/3 w-full p-8 flex flex-col justify-center items-center bg-blue-600 rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none">
            <img
              src="https://3.imimg.com/data3/BE/DV/MY-13222257/tours-and-travels-services-500x500.jpg"
              alt="Travel Illustration"
              className="w-48 h-48 object-cover rounded-full shadow-lg mb-6"
            />
            <h2 className="text-white text-3xl font-bold text-center">Start Your Journey</h2>
            <p className="text-blue-200 mt-2 text-center">Create an account to book your next adventure.</p>
          </div>

          {/* Right side: Registration Form */}
          <div className="md:w-2/3 w-full p-8 md:p-12">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">CREATE AN ACCOUNT</h1>
            <p className="text-gray-500 text-center mb-8">It's quick and easy.</p>

            <form onSubmit={handleSubmit} noValidate>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                {/* First Name */}
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstName">First Name</label>
                  <input
                    type="text"
                    id="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="shadow-md border rounded-lg w-full py-3 px-4 pl-10 text-gray-700 focus:outline-blue-600"
                    placeholder="Enter First Name"
                    required />
                </div>
                {/* Last Name */}
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastName">Last Name</label>
                  <input
                    type="text"
                    id="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="shadow-md border rounded-lg w-full py-3 px-4 pl-10 text-gray-700 focus:outline-blue-600"
                    placeholder="Enter Last Name"
                    required />
                </div>
                {/* Phone Number */}
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="shadow-md border rounded-lg w-full py-3 px-4 pl-10 text-gray-700 focus:outline-blue-600"
                    placeholder="Enter Phone Number"
                    required />
                </div>
                {/* Gender */}
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">Gender</label>
                  <div className="flex items-center space-x-4 mt-3">
                    <label htmlFor="genderMale" className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        id="genderMale"
                        name="gender"
                        value="male"
                        checked={formData.gender === 'male'}
                        onChange={handleChange}
                        className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-gray-700">Male</span>
                    </label>
                    <label htmlFor="genderFemale" className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        id="genderFemale"
                        name="gender"
                        value="female"
                        checked={formData.gender === 'female'}
                        onChange={handleChange}
                        className="h-4 w-4 text-pink-600 border-gray-300 focus:ring-pink-500"
                      />
                      <span className="ml-2 text-gray-700">Female</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="shadow-md border rounded-lg w-full py-3 px-4 pl-10 text-gray-700 focus:outline-blue-600"
                  placeholder="you@example.com"
                  required
                />
              </div>
              {/* Password */}
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="shadow-md border rounded-lg w-full py-3 px-4 pl-10 text-gray-700 focus:outline-blue-600"
                  placeholder="••••••••••••"
                  required
                />
              </div>

              {/* Submit Button */}
              <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline transition-all duration-300 transform hover:scale-105">
                Create Account
              </button>
            </form>

            {/* Login Link */}
            <div className="text-center mt-6">
              <p className="text-gray-600">
                Already have an account?
                <Link to="/login" className="font-semibold text-blue-600 hover:text-blue-700 hover:underline">
                  Login Here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Registration;
