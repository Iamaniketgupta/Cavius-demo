
import { motion } from 'framer-motion';
import { FaPlay } from 'react-icons/fa';
import { IoMdAdd } from "react-icons/io";
import { AiOutlineLike } from "react-icons/ai";
import { HiOutlineSpeakerWave } from "react-icons/hi2";

const IMG_BASE_URL = "https://image.tmdb.org/t/p/w500";
export default function Hero({ movieData }) {
    return (
        <div className='relative h-screen py-20'>
            {/* Background Image */}
            <div className="absolute inset-0">
                <img
                    alt="Hero Background"
                    className="absolute inset-0 w-full h-full object-cover"
                    loading="lazy"
                    src={`${IMG_BASE_URL}${movieData?.poster_path}`}

                />
            </div>

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10"></div>
            <div className="absolute inset-0 bg-opacity-30 bg-black z-20"></div>

            {/* Title and Description */}
            <div className='absolute bottom-0 py-10 bg-gradient-to-t from-black06 inset-x-0 z-30 text-center'>
                <div className='flex flex-col gap-3 text-white items-center justify-center w-full px-6'>

                    {/* Animated Title */}
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className='text-4xl font-bold'
                    >
                        {movieData?.title}
                    </motion.h1>

                    {/* Animated Description */}
                    <motion.p
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.9, ease: "easeOut", delay: 0.2 }}
                        className='text-sm text-gray60 max-w-4xl text-center'
                    >
                        {
                            movieData?.overview
                        }                    </motion.p>

                    {/* Buttons */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
                        className='flex items-center gap-3 text-white'
                    >
                        <button className="flex rounded-md px-5 py-2 text-sm bg-red45 h-10 
                        items-center gap-3 hover:bg-red-600">
                            <FaPlay /> <p>Play Now</p>
                        </button>
                        <button className="rounded-md text-xl bg-black03 h-10 w-10  
                        flex items-center justify-center hover:bg-black10 border-[1px] border-gray-500">
                            <IoMdAdd />
                        </button>
                        <button className="rounded-md text-xl bg-black03 h-10 w-10
                        flex items-center justify-center hover:bg-black10 border-[1px] border-gray-500">
                            <AiOutlineLike />
                        </button>
                        <button className="rounded-md text-xl bg-black03 h-10 w-10
                        flex items-center justify-center hover:bg-black10 border-[1px] border-gray-500">
                            <HiOutlineSpeakerWave />
                        </button>
                    </motion.div>

                </div>
            </div>
        </div>
    );
}
