import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      
      {/* Title */}
      <h1 className="text-5xl font-bold text-gray-800 mb-12">
        SchedULinux
      </h1>

      {/* Buttons */}
      <div className="flex flex-col gap-5 w-full max-w-sm">
        
        <Link
          to="/scheduler"
          className="w-full text-center py-3 rounded-lg bg-blue-600 text-white font-semibold text-xl hover:bg-blue-700 transition"
        >
          Start Simulation
        </Link>

        <Link
          to="/about"
          className="w-full text-center py-3 rounded-lg bg-gray-800 text-white font-semibold text-xl hover:bg-gray-900 transition"
        >
          About Project
        </Link>

      </div>

      {/* Footer text */}
      <p className="text-gray-600 text-sm mt-20">
        Created with ❤️ for Operating System Learners
      </p>
    </div>
  );
};

export default Home;

