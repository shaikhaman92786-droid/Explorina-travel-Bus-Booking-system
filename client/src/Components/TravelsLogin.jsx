import axiosInstance from "../utils/axiosInstance"; 
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const TravelsLogin = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.post(
        "/identity/travelslogin",
        formData
      );

      // store token
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", response.data.user.role);
      localStorage.setItem("email", response.data.user.email);

      toast.success(response.data.message);

      setTimeout(() => {
        navigate("/");
      }, 2000);

    } catch (error) {

      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Server error");
      }
    }
  };


  return (
    <>
    <ToastContainer position="top-right" autoClose={3000} />
    <div className="min-h-screen bg-slate-200 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl flex flex-col md:flex-row-reverse">

          {/* Right side */}
          <div className="md:w-1/2 w-full p-8 flex flex-col justify-center items-center bg-blue-600 rounded-t-2xl md:rounded-r-2xl md:rounded-tl-none">
            <img
              src="https://3.imimg.com/data3/BE/DV/MY-13222257/tours-and-travels-services-500x500.jpg"
              alt="Travels Partner Illustration"
              className="w-64 h-64 object-cover rounded-full shadow-lg"
            />
            <h2 className="text-white text-3xl font-bold mt-6 text-center">Welcome, Partner!</h2>
            <p className="text-white mt-2 text-center">Access your dashboard to manage your services.</p>
          </div>

          {/* Left side: Login Form */}
          <div className="md:w-1/2 w-full p-8 md:p-12">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">TEAVELS LOGIN</h1>
            <p className="text-gray-500 text-center mb-8">Login to the partner portal.</p>
            <div className="mb-6 p-4 bg-teal-50 border border-teal-200 rounded-lg text-sm text-teal-800">
              <p className="font-bold mb-1">Demo Credentials:</p>
              <p>Email: <span className="font-mono bg-teal-100 px-1 rounded">admin35@gmail.com</span></p>
              <p>Password: **********</p>
            </div>

            <form onSubmit={handleSubmit} noValidate>
              {/* Email Input */}
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                  Agency Email :
                </label>
                <div className="relative">
                  <input
                    type="email"
                    className="shadow-md border rounded-lg w-full py-3 px-4 pl-10 text-gray-700 focus:outline-teal-600"
                    id="email"
                    placeholder="agency@example.com"
                    onChange={handleChange}
                    value={formData.email}
                    required
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                  Password :
                </label>
                <div className="relative">
                  <input
                    type="password"
                    className="shadow-md border rounded-lg w-full py-3 px-4 pl-10 text-gray-700 focus:outline-teal-600"
                    id="password"
                    placeholder="••••••••••••"
                    onChange={handleChange}
                    value={formData.password}
                    required
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline transition-all duration-300 transform hover:scale-105">
                Login to Dashboard
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};
export default TravelsLogin;
