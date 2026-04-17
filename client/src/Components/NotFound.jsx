import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-200 flex items-center justify-center px-4">
      <div className="bg-white shadow-2xl rounded-2xl p-8 max-w-md w-full text-center">

        {/* 404 Text */}
        <h1 className="text-6xl font-extrabold text-blue-600 mb-4">
          404
        </h1>

        {/* Message */}
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          Page Not Found
        </h2>
        <p className="text-gray-500 mb-6 text-sm">
          The page you are looking for doesn’t exist or has been moved.
        </p>

        {/* Buttons */}
        <div className="flex gap-3 justify-center">
          <button
            onClick={() => navigate("/")}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition"
          >
            Go Home
          </button>

        </div>

      </div>
    </div>
  );
};

export default NotFound;