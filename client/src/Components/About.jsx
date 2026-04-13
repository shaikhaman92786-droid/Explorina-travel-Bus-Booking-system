import React from "react";
import AboutBox from "../Containers/AboutBox";

import Bus from "../Assets/Images/bus1.png";
import benefits from "../Assets/Images/benefits.png";
import customer from "../Assets/Images/customer_care.png";
import lowest from "../Assets/Images/lowest_Fare.png";

const About = () => {

  const data = [
    {
      img: benefits,
      title: "UNMATCHED BENEFITS",
      description:
        "We take care of your travel beyond ticketing by providing you with innovative and unique benefits.",
    },
    {
      img: customer,
      title: "SUPERIOR CUSTOMER SERVICE",
      description:
        "We put our experience and relationships to good use and are available to solve your travel issues.",
    },
    {
      img: lowest,
      title: "LOWEST PRICES",
      description:
        "We always give you the lowest price with the best partner offers.",
    },
  ];

  return (
    <div className="bg-slate-200">

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">

          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800">
              Crafting Unforgettable Journeys, Just for You.
            </h1>

            <p className="text-lg text-gray-500 leading-relaxed">
              Exploriana Travel is your one-stop platform for all your travel needs.
              Whether you're looking for unbeatable benefits, superior customer
              service, or the lowest prices, we've got you covered.
            </p>
          </div>

          <div className="order-first md:order-last">
            <img
              src={Bus}
              className="w-full h-auto"
              alt="Happy travelers"
            />
          </div>

        </div>
      </section>


      {/* Features Section */}
      <section className="bg-white py-16 md:py-24">
        <div className="container mx-auto px-4">

          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
              Why Travel With Us?
            </h2>

            <p className="mt-4 text-lg text-gray-600">
              The core values that make our service stand out.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

            {data.map((item, index) => (
              <AboutBox key={index} item={item} />
            ))}

          </div>

        </div>
      </section>


      {/* Detailed Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">

        <div className="grid md:grid-cols-2 gap-12 items-center">

          <div>
            <img
              src="https://3.imimg.com/data3/LI/JI/MY-9531879/luxury-bus-1000x1000.png"
              className="w-full h-auto"
              alt="Bus"
            />
          </div>

          <div className="text-center md:text-left">

            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
              Our Mission & Vision
            </h2>

            <p className="mt-6 text-lg text-gray-600 leading-relaxed">
              We are a bus booking platform dedicated to providing a seamless
              and convenient booking experience.
            </p>

            <p className="mt-4 text-lg text-gray-600 leading-relaxed">
              Our team is passionate about making bus travel accessible and
              enjoyable for everyone.
            </p>

          </div>

        </div>

      </section>

    </div>
  );
};

export default About;