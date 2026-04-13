import React, { useState } from "react";
import axiosInstance from "../utils/axiosInstance"; 
import { Mail, Phone } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";

const Contact = () => {

  const token = localStorage.getItem("token");

  const [formData, setFormData] = useState({
    Name: "",
    Email: "",
    Message: ""
  });

  const [submitting, setSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Manual Validation
    if (!formData.Name.trim()) {
      return toast.error("Name is required");
    }

    if (!formData.Email.trim()) {
      return toast.error("Email is required");
    }

    if (!/\S+@\S+\.\S+/.test(formData.Email)) {
      return toast.error("Enter valid email");
    }

    if (!formData.Message.trim()) {
      return toast.error("Message is required");
    }

    setSubmitting(true);

    try {
      const { data } = await axiosInstance.post(
        "/contact/contact",
        {
          Name: formData.Name,
          Email: formData.Email,
          Message: formData.Message
        }
      );

      toast.success(data.message);

      // ✅ reset only after success
      setFormData({
        Name: "",
        Email: "",
        Message: ""
      });

    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    }

    setSubmitting(false);
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="min-h-screen bg-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">

          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800">GET IN TOUCH</h1>
            <p className="mt-4 text-lg text-gray-600">We'd love to hear from you. Please fill out the form below.</p>
          </div>

          <div className="bg-white rounded-2xl shadow-2xl flex flex-col md:flex-row overflow-hidden">

            {/* Left side: Contact Info & Map */}
            <div className="md:w-2/5 w-full p-8 bg-blue-600 text-white">
              <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
              <p className="mb-8 text-blue-100">
                Have any questions? Reach out to us directly or find us at our location.
              </p>
              <div className="space-y-6 mt-8">
                <div className="flex items-start">
                  <Phone className="w-6 h-6 mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold">Phone</h3>
                    <p className="text-blue-200">+91 98745 63210</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Mail className="w-6 h-6 mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold">Email</h3>
                    <p className="text-blue-200">explorianatravel@gmail.com</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side: Contact Form */}
            <div className="md:w-3/5 w-full p-8 md:p-12">
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Name">Full Name :</label>
                    <input
                      type="text"
                      id="Name"
                      value={formData.Name}
                      onChange={handleInputChange}
                      className="shadow-md border rounded-lg w-full py-3 px-4 pl-10 text-gray-700 focus:outline-blue-600"
                      placeholder="Enter your name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Email">Email Address :</label>
                    <input
                      type="email"
                      id="Email"
                      value={formData.Email}
                      onChange={handleInputChange}
                      className="shadow-md border rounded-lg w-full py-3 px-4 pl-10 text-gray-700 focus:outline-blue-600"
                      placeholder="you@example.com"
                      required
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Message">Message</label>
                  <textarea
                    id="Message"
                    value={formData.Message}
                    onChange={handleInputChange}
                    rows="6"
                    className="shadow-md border rounded-lg w-full py-3 px-4 pl-10 text-gray-700 focus:outline-blue-600"
                    placeholder="Write your message here..."
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline transition-all duration-300 transform hover:scale-105 disabled:hover:scale-100"
                >
                  {submitting ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin -ml-1 mr-3 h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                      Sending...
                    </div>
                  ) : (
                    'Send Message'
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;