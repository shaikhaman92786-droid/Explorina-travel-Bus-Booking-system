import React from "react";

const AboutBox = (props) => {

  const { img, title, description } = props.item || {};

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden p-8 text-center transition-all duration-300 ease-in-out hover:shadow-2xl hover:-translate-y-2 transform h-full flex flex-col">

      {/* Icon/Image container */}
      <div className="mx-auto flex items-center justify-center h-28 w-28 rounded-full bg-blue-100 mb-6">
        <img
          src={img}   // <-- your working logic
          alt={title}
          className="w-16 h-16 object-cover"
        />
      </div>

      {/* Card Body */}
      <div className="flex-grow flex flex-col">
        <h5 className="text-2xl font-bold text-gray-800 mb-3">
          {title || "Default Title"}
        </h5>

        <p className="text-gray-600 leading-relaxed flex-grow">
          {description || "Default description for the about box."}
        </p>
      </div>

    </div>
  );
};

export default AboutBox;