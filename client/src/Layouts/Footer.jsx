import { Facebook, Instagram, Mail, Phone, Twitter } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';


// const admin = localStorage.getItem("admin");

const Footer = () => {
  return (
    <footer className="bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* About Section */}
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            <span className="text-slate-800 text-lg font-bold">Exploriana Travel</span>
            <p className="text-gray-600 text-sm pt-4">
              Exploriana Travel is your one-stop solution for all your travel needs. Explore the world hassle-free with us!
            </p>
          </div>

          {/* Quick Links Section */}
          {/* {admin == "false" ?  */}
          <div>
            <h5 className="text-sm font-semibold text-gray-800 tracking-wider uppercase mb-4">Quick Links</h5>
            <ul className="space-y-3">
              <li><Link to="/" className="text-gray-600 hover:text-blue-600 transition-colors duration-300 text-sm">Home</Link></li>
              <li><Link to="/about" className="text-gray-600 hover:text-blue-600 transition-colors duration-300 text-sm">About Us</Link></li>
              <li><Link to="/contact" className="text-gray-600 hover:text-blue-600 transition-colors duration-300 text-sm">Contact</Link></li>
              <li><Link to="/searchbus" className="text-gray-600 hover:text-blue-600 transition-colors duration-300 text-sm">Search Bus</Link></li>
            </ul>
          </div> 
          {/* : <div></div>} */}


          {/* Contact Us Section */}
          <div>
            <h5 className="text-sm font-semibold text-gray-800 tracking-wider uppercase mb-4">Contact Us</h5>
            <ul className="space-y-3">
              <li className="flex items-center">
                <Mail className='w-5 h-5 mr-3 text-gray-500' />
                <span className="text-gray-600 text-sm">explorianatravel@gmail.com</span>
              </li>
              <li className="flex items-center">
                <Phone className='w-5 h-5 mr-3 text-gray-500' />
                <span className="text-gray-600 text-sm">+91 9874563210</span>
              </li>
            </ul>
          </div>

          {/* Follow Us Section */}
          <div>
            <h5 className="text-sm font-semibold text-gray-800 tracking-wider uppercase mb-4">Follow Us</h5>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-blue-800 transition-colors duration-300">
                <Facebook className='w-6 h-6' />
              </a>
              <a href="#" className="text-gray-500 hover:text-sky-500 transition-colors duration-300">
                <Twitter className='w-6 h-6' />
              </a>
              <a href="#" className="text-gray-500 hover:text-pink-600 transition-colors duration-300">
                <Instagram className='w-6 h-6' />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-200 text-center text-sm text-gray-500">
          <p className='pt-4'>&copy; {new Date().getFullYear()} Exploriana Travel. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;