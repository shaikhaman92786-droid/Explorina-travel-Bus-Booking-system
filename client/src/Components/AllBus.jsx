import axiosInstance from "../utils/axiosInstance"; 
import { Bus, Calendar, Clock, IndianRupee, MoveRight } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';


const AllBuses = () => {

  const token = localStorage.getItem("token");

  const [buses, setBuses] = useState([])

  useEffect(() => {
    fetchAllBuses()
  }, [])

  const fetchAllBuses = async () => {
    try {
      const response = await axiosInstance.get('/bus/allbus')
      setBuses(response.data)
    } catch (error) {
      console.error('Error fetching all buses:', error);
      toast.error("Something is wrong");
    }
  }
  const formatDate = (dateString) => new Date(dateString).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });

  return (
    <>
    <ToastContainer position="top-right" autoClose={3000} />
    <div className='bg-slate-50 min-h-screen p-4 md:p-8'>
      <div className='container mx-auto'>
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800">All Available Buses</h1>
          <p className="mt-4 text-lg text-gray-600">Browse and manage all buses in the system.</p>
        </div>

        {buses.length > 0 ? (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8'>
            {buses.map(bus => (
              <Link to={`/updatebus/${bus._id}`} key={bus._id} className="block group">


                <div className="bg-white rounded-2xl shadow-xl overflow-hidden transform group-hover:scale-105 transition-all duration-300 flex flex-col">

                  {/* Image */}
                  <div className="relative">
                    <img
                      src={bus.BusImage || null}
                      className="w-full h-56 object-cover"
                      alt={bus.BusName}
                    />
                    <div className="absolute top-0 right-0 bg-blue-600 text-white text-sm font-bold px-3 py-1 m-4 rounded-full flex items-center">
                      <IndianRupee className="w-4 h-4" />
                      <span>{bus.Fare}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex-1">
                    <h5 className="text-xl font-bold text-gray-800 mb-3 truncate flex items-center">
                      <Bus className="w-5 h-5" />
                      <span className="ml-3">{bus.BusName}</span>
                    </h5>

                    <div className="flex items-center justify-between text-gray-700 font-semibold mb-4">
                      <span className="truncate">{bus.DepartureCity}</span>
                      <MoveRight className="mx-2" />
                      <span className="truncate">{bus.ArrivalCity}</span>
                    </div>

                    <div className="space-y-2 text-gray-600 text-sm">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4" />
                        <span className="ml-3">
                          {formatDate(bus.DateOfTravel)} to {formatDate(bus.DateOfArrival)}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4" />
                        <span className="ml-3">
                          {bus.DepartureTime} - {bus.ArrivalTime}
                        </span>
                      </div>
                    </div>
                  </div>


                  <div className="p-4 bg-slate-50 text-center text-blue-600 font-semibold group-hover:bg-blue-100 transition-colors duration-300">
                    Click to Edit
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <h2 className="text-2xl font-semibold text-gray-700">No Buses Found</h2>
            <p className="text-gray-500 mt-2">There are currently no buses available. Please check back later.</p>
          </div>
        )}
      </div>
    </div>
    </>
  );
}

export default AllBuses;