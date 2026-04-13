import { Bus, User2 } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, LogOut } from "lucide-react";

const Navbar = () => {

  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
    window.location.reload();
  };

  const handleEditProfile = ()=>{
    navigate("/edit-profile");
  }

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>

      <nav className="bg-white shadow-md sticky top-0 z-50">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="flex items-center justify-between h-20">

            {/* LOGO */}
            <div className="flex-shrink-0">
              <Link to="/" className="flex items-center space-x-3">
                <img
                  className="h-12 w-auto"
                  src="https://www.clipartmax.com/png/full/196-1963073_resort-clipart-car-travels-logo-tours-and-travels-logo-png.png"
                  alt="logo"
                />
                <span className="text-slate-800 text-xl font-bold">
                  Tours & Travels
                </span>
              </Link>
            </div>

            {/* DESKTOP NAV LINKS */}
            <div className="hidden md:flex items-center space-x-2">

              <Link to="/" className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium">
                Home
              </Link>

              {/* ADMIN NAVBAR */}
              {role === "admin" ? (
                <>
                  <Link to="/addbus" className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium">
                    Add bus
                  </Link>
                  
                  <Link to="/recentbooking" className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium">
                    Recent Booking
                  </Link>

                  <Link to="/allbus" className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium">
                    All Bus
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/searchbus" className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium">
                    Search Bus
                  </Link>

                  <Link to="/recentbooking" className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium">
                    Recent Booking
                  </Link>

                  <Link to="/contact" className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium">
                    Contact Us
                  </Link>

                  <Link to="/about" className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium">
                    About us
                  </Link>
                </>
              )}

            </div>

            {/* DROPDOWN */}
            <div className="relative hidden md:block" ref={dropdownRef}>

              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700"
              >
                {token ? "My Profile" : "Login"}
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border">

                  {token ? (
                    <>
                      {/* USER EDIT PROFILE */}
                      {role !== "admin" && (
                        <button
                          onClick={handleEditProfile}
                          className="flex w-full items-center gap-3 px-4 py-3 text-green-600 hover:bg-green-50"
                        >
                          <User size={18} />
                          <span>Edit Profile</span>
                        </button>
                      )}

                      {/* LOGOUT */}
                      <button
                        onClick={handleLogout}
                        className="flex w-full items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50"
                      >
                         <LogOut size={18} />
                         <span>Logout</span>
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/login"
                        className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100"
                      >
                        <User2 className="w-5 h-5" />
                        Customer Login
                      </Link>

                      <Link
                        to="/travelslogin"
                        className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100"
                      >
                        <Bus className="w-5 h-5" />
                        Travels Login
                      </Link>
                    </>
                  )}

                </div>
              )}

            </div>

            {/* MOBILE MENU BUTTON */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-md text-gray-600"
              >
                ☰
              </button>
            </div>

          </div>
        </div>

        {/* MOBILE MENU */}
        {isMenuOpen && (

          <div className="md:hidden bg-white border-t">

            <Link to="/" onClick={() => setIsMenuOpen(false)} className="block px-4 py-3 hover:bg-gray-100">
              Home
            </Link>

            {role === "admin" ? (
              <>
                <Link to="/recentbooking" onClick={() => setIsMenuOpen(false)} className="block px-4 py-3 hover:bg-gray-100">
                  Recent Booking
                </Link>

                <Link to="/allbus" onClick={() => setIsMenuOpen(false)} className="block px-4 py-3 hover:bg-gray-100">
                  All Bus
                </Link>
              </>
            ) : (
              <>
                <Link to="/searchbus" onClick={() => setIsMenuOpen(false)} className="block px-4 py-3 hover:bg-gray-100">
                  Search Bus
                </Link>

                <Link to="/recentbooking" onClick={() => setIsMenuOpen(false)} className="block px-4 py-3 hover:bg-gray-100">
                  Recent Booking
                </Link>

                <Link to="/about" onClick={() => setIsMenuOpen(false)} className="block px-4 py-3 hover:bg-gray-100">
                  About Us
                </Link>

                <Link to="/contact" onClick={() => setIsMenuOpen(false)} className="block px-4 py-3 hover:bg-gray-100">
                  Contact Us
                </Link>
              </>
            )}

            <div className="border-t mt-2">

              {token ? (
                <>
          {/* Condition added: Only show Edit Profile if user is NOT admin */}
          {role !== "admin" && (
            <button
              onClick={() => {
                handleEditProfile();
                setIsMenuOpen(false);
              }}
              className="flex w-full items-center gap-3 px-4 py-3 text-green-600 hover:bg-green-50"
            >
              <User size={18} />
              <span>Edit Profile</span>
            </button>
          )}

          <button
            onClick={() => {
              handleLogout();
              setIsMenuOpen(false);
            }}
            className="flex w-full items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50"
          >
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </>
              ) : (
                <>
                  <Link to="/login" onClick={() => setIsMenuOpen(false)} className="block px-4 py-3 hover:bg-gray-100">
                    <User2 size={18} />
                    Customer Login
                  </Link>

                  <Link to="/travelslogin" onClick={() => setIsMenuOpen(false)} className="block px-4 py-3 hover:bg-gray-100">
                    <Bus size={18} />
                    Travels Login
                  </Link>
                </>
              )}

            </div>

          </div>

        )}

      </nav>

    </>
  );
};

export default Navbar;