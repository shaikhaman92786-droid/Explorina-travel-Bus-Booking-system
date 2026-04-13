import { MoveLeft, MoveRight } from "lucide-react";
import React, { useState, useEffect, useCallback } from "react";

const descData = [
  {
    img: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2070&auto=format&fit=crop",
    subHeading: "Discover Stunning Destinations",
    description: "Explore breathtaking landscapes and create unforgettable memories.",
  },
  {
    img: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=2070&auto=format&fit=crop",
    subHeading: "Your Adventure Awaits",
    description: "Book your next journey with us and experience seamless travel.",
  },
  {
    img: "https://images.unsplash.com/photo-1433838552652-f9a46b332c40?q=80&w=2070&auto=format&fit=crop",
    subHeading: "Lowest Prices Guaranteed",
    description: "We offer the best deals and unmatched benefits for all our customers.",
  },
];

const HeroCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Function to go to the next slide
  const goToNext = useCallback(() => {
    const isLastSlide = currentIndex === descData.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  }, [currentIndex]);

  // Function to go to the previous slide
  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? descData.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  // Function to go to a specific slide by its index
  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  // Auto-play functionality using useEffect
  useEffect(() => {
    const autoPlayTimer = setTimeout(goToNext, 5000); // Change slide every 5 seconds
    return () => clearTimeout(autoPlayTimer);
  }, [currentIndex, goToNext]);

  const currentSlide = descData[currentIndex];

  return (
    <div className="relative w-full h-[90vh] md:h-screen overflow-hidden">
      {/* Background Image with Overlay and Animation */}
      <div
        key={currentIndex} // Key change triggers re-render and animation
        className="absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-1000 ease-in-out animate-fade-in"
        style={{ backgroundImage: `url(${currentSlide.img})` }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      {/* Content */}
      <div className="relative h-full flex flex-col justify-center items-center text-white text-center p-4">
        <div
          key={`${currentIndex}-content`} // Also animate content
          className="animate-fade-in-up"
        >
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight mb-4">
            Welcome to Tours & Travels
          </h1>
          <h2 className="text-2xl md:text-4xl font-light mb-6">
            {currentSlide.subHeading}
          </h2>
          <p className="text-lg md:text-xl max-w-3xl mx-auto font-light">
            {currentSlide.description}
          </p>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={goToPrevious}
        className="absolute top-1/2 left-4 md:left-8 transform -translate-y-1/2 hover:bg-white/40 text-white p-3 rounded-full transition-colors duration-300 z-10"
      >
        <MoveLeft />
      </button>
      <button
        onClick={goToNext}
        className="absolute top-1/2 right-4 md:right-8 transform -translate-y-1/2 hover:bg-white/40 text-white p-3 rounded-full transition-colors duration-300 z-10"
      >
        <MoveRight />
      </button>

      {/* Dot Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-3 z-10">
        {descData.map((_, slideIndex) => (
          <button
            key={slideIndex}
            onClick={() => goToSlide(slideIndex)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${currentIndex === slideIndex ? "bg-white scale-125" : "bg-white/40"
              }`}
          ></button>
        ))}
      </div>
    </div>
  );
};

// Add keyframes for animations in a style tag or your global CSS file
// This is a common practice when using Tailwind for custom animations.
const StyleInjector = () => (
  <style>{`
    @keyframes fade-in {
      from { opacity: 0.8; }
      to { opacity: 1; }
    }
    @keyframes fade-in-up {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .animate-fade-in {
      animation: fade-in 1s ease-in-out;
    }
    .animate-fade-in-up {
      animation: fade-in-up 1s ease-in-out;
    }
  `}</style>
);

// The final component to be exported
const App = () => {
  return (
    <>
      <StyleInjector />
      <HeroCarousel />
    </>
  )
}


export default App;