import { useNavigate } from "react-router-dom";
import Document from "./Document";
import { BadgePercent, Ticket, User, Users, Wallet } from "lucide-react";


// Offer Card Component
const OfferCard = ({ offer }) => {
  const { title, description, icon } = offer;
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-1 transform h-full flex flex-col">
      <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 text-blue-600 mb-4">
        {icon}
      </div>
      <h5 className="text-xl font-bold text-gray-800 mb-2">{title}</h5>
      <p className="text-gray-600 text-sm flex-grow mb-4">{description}</p>
      <a href="#" className="mt-auto inline-block bg-blue-50 text-blue-600 font-semibold py-2 px-4 rounded-lg hover:bg-blue-100 transition-colors duration-300">
        View Deal
      </a>
    </div>
  );
};


const Home = () => {
  const navigate = useNavigate(); // In a real app

  const role = localStorage.getItem("role");

  // Data for the offer cards
  const offers = [
    {
      title: "Upto ₹500 Off",
      description: "Get a flat discount of up to ₹500 on your next bus ticket booking with us.",
      icon: <Ticket />
    },
    {
      title: "Buy 1 Get 1 Free",
      description: "An exclusive offer for our loyal customers. Buy one ticket and get the second one absolutely free.",
      icon: <Users />
    },
    {
      title: "Save Flat ₹300",
      description: "Planning a trip? Save a flat ₹300 on all bus bookings above ₹1500.",
      icon: <Wallet />
    },
    {
      title: "15% Cashback",
      description: "Pay with our partner wallets and get an assured 15% cashback up to ₹200.",
      icon: <BadgePercent />
    },
  ];

  return (
    <>

      <div className="bg-slate-200">
        <Document />

        {/* Offers Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Exclusive Offers & Deals</h2>
              <p className="mt-4 text-lg text-gray-600">Grab these amazing deals before they are gone!</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {offers.map((offer, index) => (
                <OfferCard key={index} offer={offer} />
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="bg-blue-600 text-white p-12 rounded-2xl shadow-lg text-center">
              <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Ready to Book Your Next Trip?</h2>
              <p className="text-lg text-blue-100 max-w-2xl mx-auto mb-8">
                Get started now and explore your favorite destinations with ease and comfort. The best prices are just a click away.
              </p>
              {role == "user" ? 
              <button
                className="btn-lg bg-white text-blue-600 font-bold py-3 px-8 rounded-full text-lg hover:bg-blue-50 transition-transform duration-300 transform hover:scale-105"
                onClick={() => navigate("/searchbus")}
              >
                Book Now
              </button> 
              : <button
                className="btn-lg bg-white text-blue-600 font-bold py-3 px-8 rounded-full text-lg hover:bg-blue-50 transition-transform duration-300 transform hover:scale-105"
                onClick={() => navigate("/allbus")}
              >
                All Buses
              </button>
              }

            </div>
          </div>
        </section>

      </div>
    </>
  );
};

export default Home;
