import axiosInstance from "../utils/axiosInstance"; 
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { Calendar, Clock, IndianRupee, MoveRight } from 'lucide-react'
import { toast, ToastContainer } from 'react-toastify';

const BusPage = () => {

  const { id } = useParams();
  const token = localStorage.getItem("token");

  const [busData, setBusData] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchBus = async () => {
      try {
        const res = await axiosInstance.get(`/bus/${id}`);
        setBusData(res.data);
      } catch (error) {
        console.error(error);
        toast.error("Something is wrong");
      }
    };
    fetchBus();
  }, [id]);

  if (!busData) return <div className="text-center mt-10">Loading...</div>;

  // ✅ FIX: correct field
  const numRows = busData.NumRows || 10;
  const numCols = busData.NumColumns || 4;
  const occupiedSeats = busData.BookedSeats || [];

  const handleSeatSelection = (seat) => {
    if (selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter(s => s !== seat));
    } else {
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  // Generate seats
  const seats = [];

  for (let row = 1; row <= numRows; row++) {
    const currentRowSeats = [];

    for (let col = 1; col <= numCols; col++) {
      const seatId = `${row}${String.fromCharCode(64 + col)}`;
      const isOccupied = occupiedSeats.includes(seatId);

      currentRowSeats.push(
        <label
          key={seatId}
          className={`w-12 h-10 flex items-center justify-center rounded cursor-pointer
          ${isOccupied ? "bg-gray-300 cursor-not-allowed" : ""}
          ${selectedSeats.includes(seatId) ? "bg-blue-600 text-white" : "bg-blue-100"}
        `}
        >
          <input
            type="checkbox"
            className="hidden"
            disabled={isOccupied}
            onChange={() => handleSeatSelection(seatId)}
          />
          {seatId}
        </label>
      );
    }

    seats.push(
      <div key={row} className="flex items-center justify-center gap-4 mb-3">
        <span className="w-2 h-2 bg-black rounded-full"></span>

        <div className="flex gap-2">
          {currentRowSeats.slice(0, 2)}
        </div>

        <div className="w-6"></div>

        <div className="flex gap-2">
          {currentRowSeats.slice(2, 4)}
        </div>
      </div>
    );
  }

  // 🔥 PAYMENT FUNCTION
  const handlePayment = async () => {
    const totalAmount = selectedSeats.length * busData.Fare;
    try {
      const response = await axiosInstance.post(
        '/order/create-order',
        {
          amount: totalAmount,
          currency: 'INR',
        }
      );

      const { id: order_id, amount, currency } = response.data;

      const options = {
        key: "rzp_test_SUIwVxeb8O9Wzg",
        amount,
        currency,
        order_id,
        name: "Explorina Travel",

        handler: async (response) => {
          try {
            const { data } = await axiosInstance.post(
              "/order/verify-payment",
              {
                ...response,
                busId: busData._id,
                selectedSeats,
                totalFare: totalAmount
              }
            );

            toast(data.message);

            // reset UI
            setSelectedSeats([]);
            setIsModalOpen(false);

          } catch (err) {
            toast.error("Payment verification failed");
          }
        },

        prefill: {
          name: "User",
          email: "user@gmail.com",
          contact: "9999999999",
        },

        theme: {
          color: "#3399cc",
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();

    } catch (error) {
      console.error('Payment failed:', error);
    }
  };

  return (
    <>
    <ToastContainer position="top-right" autoClose={3000} />
    <div className="min-h-screen bg-slate-50 p-4 mt-24 md:p-8">

      <div className="container mx-auto max-w-6xl">

        {/* Bus Info */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-5">

            <div className="md:col-span-3">
              <img
                src={busData.BusImage}
                className="w-full h-full object-cover min-h-[300px]"
                alt={busData.BusName}
              />
            </div>

            <div className="md:col-span-2 p-8 flex flex-col">
              <h1 className="text-3xl font-bold">{busData.BusName}</h1>

              <div className="flex justify-between text-xl my-4">
                <span>{busData.DepartureCity}</span>
                <MoveRight />
                <span>{busData.ArrivalCity}</span>
              </div>

              <div className="space-y-3 text-gray-600">
                <div className="flex items-center">
                  <Calendar />
                  <span className="ml-2">
                    {new Date(busData.DateOfTravel).toDateString()}
                  </span>
                </div>

                <div className="flex items-center">
                  <Clock />
                  <span className="ml-2">
                    {busData.DepartureTime} - {busData.ArrivalTime}
                  </span>
                </div>

                <div className="flex items-center">
                  <IndianRupee />
                  <span className="ml-2">
                    ₹{busData.Fare} per seat
                  </span>
                </div>
              </div>

              <button
                onClick={() => setIsModalOpen(true)}
                className="mt-6 bg-blue-600 text-white py-3 rounded-lg"
              >
                Select Your Seat
              </button>
            </div>

          </div>
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center p-4 z-50"
            onClick={() => setIsModalOpen(false)}
          >
            <div
              className="bg-white rounded-xl w-full max-w-md flex flex-col max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >

              {/* Header */}
              <div className="p-5 border-b">
                <h2 className="text-xl font-bold">Select Seats</h2>
              </div>

              {/* Body */}
              <div className="p-5 overflow-y-auto flex-1">
                {seats}
              </div>

              {/* Footer */}
              <div className="p-5 border-t bg-white sticky bottom-0">
                <div className="flex justify-between mb-4">
                  <span>
                    Seats: {selectedSeats.length > 0 ? selectedSeats.join(", ") : "None"}
                  </span>
                  <span className="font-bold">
                    ₹{selectedSeats.length * busData.Fare}
                  </span>
                </div>

                {/* ✅ BOTH BUTTONS */}
                <div className="flex gap-3">
                  <button
                    className="w-1/2 bg-gray-400 text-white py-2 rounded"
                    onClick={() => {
                      setSelectedSeats([]);
                      setIsModalOpen(false);
                    }}
                  >
                    Cancel
                  </button>

                  <button
                    disabled={selectedSeats.length === 0}
                    className="w-1/2 bg-blue-600 text-white py-2 rounded disabled:bg-gray-400"
                    onClick={handlePayment}
                  >
                    Book Now
                  </button>
                </div>

              </div>

            </div>
          </div>
        )}

      </div>
    </div>
    </>
  )
}

export default BusPage;