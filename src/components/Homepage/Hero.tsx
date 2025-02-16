import React from "react";
import { motion } from "framer-motion";
import { FaPlay } from "react-icons/fa";
import bgimage from "../../assets/hero.png"; 

const Hero: React.FC = () => {
  return (
    <div className="relative h-screen w-full" >
      {/* Background Image */}
      <img
        src={bgimage}
        alt="Hero Background"
        className="absolute inset-0 w-full h-full object-cover"
        loading="lazy"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>

      {/* Hero Content Container */}
      <div className="absolute z-10 bottom-0 left-0 h-52 px-8 bg-black w-full shadow-[0px_-15px_18px_rgba(0,0,0,0.8)]">
        <div className="text-center flex items-center flex-col justify-center">
          {/* Animated Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-white max-w-2xl relative bottom-5 text-xl md:text-4xl text-center mx-auto font-bold"
          >
            Best viewing experience with Cavius
          </motion.h1>

          {/* Animated Description */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut", delay: 0.2 }}
            className="text-gray-300 max-w-4xl text-center text-sm mb-8"
          >
            Cavius is the best streaming experience for watching your favorite movies and shows on demand, anytime, anywhere. With Cavius, you can enjoy a wide variety of content, including the latest blockbusters, classic movies, popular TV shows, and more.
          </motion.p>

          {/* Button */}
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
            className="flex rounded-md px-5 py-2 text-sm bg-red45 h-12 text-white items-center gap-3 hover:bg-red-600"
          >
            <FaPlay /> <p>Start Watching Now</p>
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
