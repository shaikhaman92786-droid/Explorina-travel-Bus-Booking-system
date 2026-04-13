import React, { useState } from "react";
import axiosInstance from "../utils/axiosInstance"; 
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {

  const navigate = useNavigate();


  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [loading, setLoading] = useState(false);

  // 🔹 Step 1: Verify Email + Phone
  const handleVerify = async (e) => {
    e.preventDefault();

    if (!email || !phone) {
      return toast.error("All fields are required");
    }

    try {
      setLoading(true);

      const res = await axiosInstance.post(
        "/identity/check-user",
        { email, phone }
      );

      toast.success(res.data.message);
      setIsVerified(true);

    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid details");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Step 2: Reset Password
  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (!password) {
      return toast.error("Enter new password");
    }

    try {
      setLoading(true);

      const res = await axiosInstance.post(
        "/identity/reset-password",
        { email, phone, password }
      );

      toast.success(res.data.message);

      setTimeout(() => {
        navigate("/login");
      }, 2000);

    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="min-h-screen flex items-center justify-center bg-gray-200">
        <div className="bg-white p-8 rounded-xl shadow-lg w-96">

          <h2 className="text-2xl font-bold text-center mb-6">
            Forgot Password
          </h2>

          {/* 🔹 Step 1: Email + Phone */}
          {!isVerified ? (
            <form onSubmit={handleVerify}>

              <input
                type="email"
                placeholder="Enter your email"
                className="w-full p-3 border rounded mb-4"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <input
                type="text"
                placeholder="Enter your phone number"
                className="w-full p-3 border rounded mb-4"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />

              <button
                type="submit"
                className="w-full bg-blue-600 text-white p-3 rounded"
                disabled={loading}
              >
                {loading ? "Verifying..." : "Verify Details"}
              </button>

            </form>
          ) : (

            /* 🔹 Step 2: New Password */
            <form onSubmit={handleResetPassword}>

              <input
                type="password"
                placeholder="Enter new password"
                className="w-full p-3 border rounded mb-4"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <button
                type="submit"
                className="w-full bg-green-600 text-white p-3 rounded"
                disabled={loading}
              >
                {loading ? "Updating..." : "Reset Password"}
              </button>

            </form>
          )}

        </div>
      </div>
    </>
  );
};

export default ForgotPassword;