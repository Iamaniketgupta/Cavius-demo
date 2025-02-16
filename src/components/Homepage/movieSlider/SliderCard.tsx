import React from "react";
import { IoArrowForward } from "react-icons/io5";
import { Link } from "react-router-dom";
 
interface SliderCardProps {
  data: object;
 }

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
const SliderCard: React.FC<SliderCardProps> = ({ data }) => {
  return (
    <div className='p-4 md:p-[30px]  border-[1px] border-black15 rounded-xl backdrop-blur-xl bg-black10'>
      {/* Image container */}
      <div className="relative w-full h-40 md:h-52 rounded-lg overflow-hidden">
        <img
          className="w-full h-full object-cover rounded-md"
          alt={data?.title}
          src={`${IMAGE_BASE_URL}${data.poster_path}`}
        />
      </div>

      {/* Title & Icon */}
      <div className="flex items-center justify-between mt-2 text-white text-sm">
        <h3>
          {data.title.length > 17 ? `${data.title.slice(0, 17)}...` : data.title}
        </h3>
        <Link to={`/movie/${data.id}`}>
          <IoArrowForward size={24} className="text-white hover:text-gray-400 transition" />
        </Link>
      </div>
    </div>
  );
};

export default SliderCard;
