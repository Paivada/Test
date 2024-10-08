import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Circle, Info } from 'lucide-react';

const slides = [
  {
    title: "Event Planning Process",
    content: "Crafting Unforgettable Experiences",
    icon: "🎉",
    details: "Our comprehensive approach ensures every event is a masterpiece."
  },
  {
    title: "Initial Contact",
    content: "Where Great Events Begin",
    icon: "🤝",
    details: "The first impression sets the tone for a successful partnership."
  },
  {
    title: "Establish Credibility",
    content: "Building Trust, Delivering Excellence",
    icon: "🏆",
    details: "Our track record speaks volumes about our commitment to quality."
  },
  {
    title: "Communication Arsenal",
    content: "Presentations. Proposals. Dialogues.",
    icon: "💼",
    details: "We employ a variety of tools to ensure clear, effective communication."
  },
  {
    title: "Objectives",
    content: "Inform. Persuade. Remind.",
    icon: "🎯",
    details: "Every interaction has a purpose, driving your event towards success."
  },
  {
    title: "The Art of Inquiry",
    content: "Asking the Right Questions",
    icon: "🔍",
    details: "Our expertise lies in uncovering the details that make your event unique."
  },
  {
    title: "Client-Centric Approach",
    content: "Understanding Needs, Exceeding Expectations",
    icon: "🧠",
    details: "Your vision is at the heart of everything we do."
  },
  {
    title: "Event Success",
    content: "Where Vision Meets Reality",
    icon: "🌟",
    details: "The culmination of our process - an event that exceeds all expectations."
  }
];

const Presentation = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const nextSlide = () => {
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setShowDetails(false);
  };

  const prevSlide = () => {
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setShowDetails(false);
  };

  useEffect(() => {
    const timer = setTimeout(() => setIsAnimating(false), 500);
    return () => clearTimeout(timer);
  }, [currentSlide]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-purple-700 to-indigo-800 text-white">
      <div className="relative overflow-hidden rounded-lg shadow-2xl p-12 max-w-4xl w-full h-96 bg-black bg-opacity-30 backdrop-filter backdrop-blur-lg">
        <div className={`transition-opacity duration-500 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
          <div className="text-6xl mb-4 transition-transform duration-300 transform hover:scale-110 cursor-pointer">{slides[currentSlide].icon}</div>
          <h2 className="text-4xl font-bold mb-4 tracking-tight">{slides[currentSlide].title}</h2>
          <p className="text-2xl mb-8 tracking-wide">{slides[currentSlide].content}</p>
          <button 
            onClick={() => setShowDetails(!showDetails)}
            className="absolute bottom-6 right-6 bg-white bg-opacity-20 p-2 rounded-full hover:bg-opacity-30 transition-all duration-300"
          >
            <Info size={24} />
          </button>
          {showDetails && (
            <div className="absolute inset-0 bg-black bg-opacity-80 flex items-center justify-center p-8 transition-opacity duration-300">
              <p className="text-xl">{slides[currentSlide].details}</p>
            </div>
          )}
        </div>
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {slides.map((_, index) => (
            <Circle
              key={index}
              size={12}
              fill={currentSlide === index ? 'white' : 'none'}
              className={`cursor-pointer transition-all duration-300 ${currentSlide === index ? 'text-white scale-125' : 'text-gray-400'}`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </div>
      <div className="flex justify-between items-center w-full max-w-4xl mt-8">
        <button onClick={prevSlide} className="flex items-center text-white hover:text-gray-300 transition-colors duration-300">
          <ChevronLeft size={24} className="mr-2" /> Previous
        </button>
        <div className="w-64 h-2 bg-white bg-opacity-20 rounded-full overflow-hidden">
          <div 
            className="h-full bg-white transition-all duration-300 ease-out"
            style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
          ></div>
        </div>
        <button onClick={nextSlide} className="flex items-center text-white hover:text-gray-300 transition-colors duration-300">
          Next <ChevronRight size={24} className="ml-2" />
        </button>
      </div>
    </div>
  );
};

export default Presentation;
