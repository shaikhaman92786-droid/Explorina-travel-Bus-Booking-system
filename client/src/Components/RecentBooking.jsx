import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance"; 
import jsPDF from "jspdf";
import { toast, ToastContainer } from "react-toastify";
import { Trash2 } from "lucide-react";

const RecentBooking = () => {

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const isAdmin = role === "admin";

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bookingIdToDelete, setBookingIdToDelete] = useState(null);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);

      const url = isAdmin
        ? "/order/admin/order-items"
        : "/order/order-items";

      const { data } = await axiosInstance.get(url);

      setBookings(data.orders || []);
    } catch (err) {
      console.log(err);
      toast.error("Something is wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleCancelBooking = async () => {
    try {
      await axiosInstance.post(
        "/order/cancel-booking",
        { bookingId: bookingIdToDelete }
      );

      fetchBookings();
    } catch (err) {
      console.log(err);
      toast.error("Something is wrong");
    } finally {
      setBookingIdToDelete(null);
    }
  };

  const handleDeleteBooking = async (id) => {
    try {
      await axiosInstance.delete(
        `/order/delete-cancel-booking/${id}`);

      toast.success("Booking deleted");
      fetchBookings();

    } catch (err) {
      console.log(err);
      toast.error("Delete failed");
    }
  };

  const handleGenerateTicket = (booking) => {
    if (booking.bookingStatus !== "confirmed") {
      alert("Ticket not available for cancelled booking");
      return;
    }

    const doc = new jsPDF();

    doc.setFillColor(33, 150, 243);
    doc.rect(0, 0, 210, 35, "F");

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(22);
    doc.setFont(undefined, "bold");
    doc.text("Bus Ticket", 75, 15);

    doc.setFontSize(14);
    doc.setFont(undefined, "normal");
    doc.text(booking.busDetails.BusType || "Bus Name", 80, 28);

    doc.setTextColor(0, 0, 0);

    doc.rect(10, 45, 190, 120);

    const img = new Image();
    img.src = "/bookbus.png";

    img.onload = () => {
      doc.addImage(img, "PNG", 12, 50, 55, 60);

      let startX = 75;

      doc.setFontSize(14);
      doc.setFont(undefined, "bold");
      doc.text(booking.busDetails.BusName, startX, 60);

      doc.setFontSize(11);
      doc.setFont(undefined, "normal");

      doc.text(
        `${booking.busDetails.DepartureCity} to ${booking.busDetails.ArrivalCity}`,
        startX,
        70
      );

      doc.text("Date:", startX, 85);
      doc.text(
        new Date(booking.busDetails.DateOfTravel).toLocaleDateString("en-IN"),
        startX + 30,
        85
      );

      doc.text("Time:", startX, 95);
      doc.text(booking.busDetails.DepartureTime, startX + 30, 95);

      doc.text("Seats:", startX, 105);
      doc.text(booking.selectedSeats.join(", "), startX + 30, 105);

      doc.text("Amount:", startX, 120);
      doc.text(`Rs. ${booking.totalFare}`, startX + 40, 120);

      doc.text("Status:", startX, 130);
      doc.setTextColor(0, 150, 0);
      doc.text(booking.bookingStatus.toUpperCase(), startX + 40, 130);

      doc.setTextColor(0, 0, 0);

      doc.setFontSize(10);
      doc.text(`Booking ID: ${booking._id}`, 15, 150);

      doc.line(10, 160, 200, 160);

      doc.setFontSize(11);
      doc.text("Thank you for booking with us!", 105, 170, {
        align: "center",
      });

      doc.save("Bus Ticket.pdf");
    };
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="min-h-screen bg-slate-50 p-4 md:p-8">
        <div className="container mx-auto max-w-7xl">

          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800">
              Recent Bookings
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              {isAdmin
                ? "Manage all user bookings."
                : "Review your recent travel history."}
            </p>
          </div>

          {loading ? (
            <div className="text-center py-16 bg-white rounded-2xl shadow-md">
              <div className="animate-spin mx-auto mb-4 w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full"></div>
              <h2 className="text-2xl font-semibold text-gray-700">
                Loading Bookings...
              </h2>
            </div>
          ) : bookings.length > 0 ? (

            <div className="space-y-6">
              {bookings.map((b) => (
                <div
                  key={b._id}
                  className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
                >

                  {/* Header */}
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-bold text-xl text-gray-800">
                          {b.busDetails?.BusName}
                        </h3>
                        <p className="text-gray-600">
                          {b.busDetails?.DepartureCity} →{" "}
                          {b.busDetails?.ArrivalCity}
                        </p>

                        {/* ✅ NEW: Show user name ONLY for admin */}
                        {isAdmin && (
                          <p className="text-sm text-gray-500 mt-1">
                            User: {b.userId ? `${b.userId.firstName} ${b.userId.lastName}` : "N/A"}
                          </p>
                        )}
                      </div>

                      {/* ✅ KEEP OLD UI EXACT */}
                      <div className="bg-white px-3 py-2 rounded-lg shadow-sm">
                        <p className="text-xs text-gray-500">Booking ID</p>
                        <p className="font-bold text-blue-600">
                          #{b._id.slice(-6)}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Rest SAME — no changes */}
                  <div className="p-6 grid md:grid-cols-3 gap-6">

                    <div>
                      <h4 className="font-semibold mb-2 border-b pb-2">
                        Travel Details
                      </h4>
                      <p>Date: {formatDate(b.busDetails?.DateOfTravel)}</p>
                      <p>
                        {b.busDetails?.DepartureTime} -{" "}
                        {b.busDetails?.ArrivalTime}
                      </p>
                      <p>Seats: {b.selectedSeats.join(", ")}</p>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2 border-b pb-2">
                        Payment Details
                      </h4>
                      <p className="text-2xl font-bold text-green-600">
                        ₹{b.totalFare}
                      </p>
                      <p className="text-sm">
                        Payment: {b.paymentStatus}
                      </p>
                      <p className="text-xs text-gray-500">
                        Paid on: {formatDate(b.createdAt)}
                      </p>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2 border-b pb-2">
                        Status
                      </h4>

                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${b.bookingStatus === "confirmed"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                          }`}
                      >
                        {b.bookingStatus}
                      </span>

                      {
                        // !isAdmin && 
                        (
                          <>
                            {b.bookingStatus === "confirmed" && (
                              <>
                                <button
                                  onClick={() => setBookingIdToDelete(b._id)}
                                  className="mt-4 w-full bg-red-50 text-red-700 py-2 rounded-lg border hover:bg-red-100"
                                >
                                  Cancel Booking
                                </button>

                                <button
                                  onClick={() => handleGenerateTicket(b)}
                                  className="mt-2 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                                >
                                  Generate Ticket
                                </button>
                              </>
                            )}

                            {b.bookingStatus === "cancelled" && (
                              <>
                                <p className="mt-4 text-red-500 font-semibold">
                                  Ticket not available (Cancelled)
                                </p>
                                <button
                                  onClick={() => handleDeleteBooking(b._id)}
                                  className="mt-4 w-full flex items-center justify-center gap-2 bg-gray-100 text-gray-700 py-2 rounded-lg border hover:bg-gray-200"
                                >
                                  <Trash2 size={16} />
                                  Delete Booking
                                </button>
                              </>
                            )}
                          </>
                        )}
                    </div>

                  </div>
                </div>
              ))}
            </div>

          ) : (
            <div className="text-center py-16 bg-white rounded-2xl shadow-md">
              <h2 className="text-2xl font-semibold text-gray-700">
                No Bookings Found
              </h2>
            </div>
          )}
        </div>
      </div>

      {/* Modal SAME */}
      {bookingIdToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl w-96 text-center">
            <h2 className="text-xl font-bold mb-4">
              Confirm Cancellation
            </h2>
            <p className="mb-4">
              Are you sure you want to cancel?
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => setBookingIdToDelete(null)}
                className="flex-1 bg-gray-200 py-2 rounded"
              >
                No
              </button>

              <button
                onClick={handleCancelBooking}
                className="flex-1 bg-red-600 text-white py-2 rounded"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RecentBooking;