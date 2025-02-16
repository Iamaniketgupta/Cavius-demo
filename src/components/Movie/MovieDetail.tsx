import { HiOutlineCalendarDateRange } from "react-icons/hi2";
import { HiMiniLanguage } from "react-icons/hi2";
import { CiStar } from "react-icons/ci";
import { CiGrid41 } from "react-icons/ci";
import { IoIosStar } from "react-icons/io";
import { IoStarHalfOutline } from "react-icons/io5";


const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    const stars = [];

    for (let i = 0; i < fullStars; i++) {
        stars.push(<IoIosStar key={`filled-${i}`} className="text-red45" />);
    }

    if (halfStar) {
        stars.push(<IoStarHalfOutline key="half" className="text-red45" />);
    }

    for (let i = 0; i < emptyStars; i++) {
        stars.push(<CiStar key={`empty-${i}`} className="text-gray-400" />);
    }

    return stars;
};

export default function MovieDetail({ movieData }) {
    return (
        <>
            <div className="rounded-lg text-gray60 border-[1px] text-sm border-black15 p-8">
                <div className=' my-3'>

                    <h3 className='flex items-center gap-2 mb-2' >
                        <HiOutlineCalendarDateRange />   Releaseed Year
                    </h3>

                    <p className='text-white'>{movieData?.release_date?.split("-")[0]}</p>
                </div>

                <div className=' my-3'>
                    <h3 className='flex items-center gap-2 mb-2' >
                        <HiMiniLanguage />   Available Languages
                    </h3>

                    <div className='flex items-center gap-2 flex-wrap text-white'>

                        {
                            movieData?.spoken_languages?.map((item) => {
                                return <div key={item.name} className='py-1 px-3 bg-black06 w-fit h-fit rounded-lg border-[1px] border-black15'>
                                    {item.name}
                                </div>
                            })
                        }
                    </div>

                </div>

                <div className='mt-3'>
                    <h3 className='flex items-center gap-2 mb-2' >
                        <CiStar /> Ratings
                    </h3>
                    <div className='px-3 flex-1 py-3 h-20 min-w-24 max-w-40  bg-black06 rounded-lg border-[1px] border-black15'>
                        <p className='text-white'>IMBD</p>

                        {/* stars */}
                        <div className="flex items-center gap-1 text-xl">
                            {renderStars(movieData?.vote_average)}
                        </div>

                        {movieData?.vote_average || 0}
                    </div>

                </div>


                <div className='mt-3'>
                    <h3 className='flex items-center gap-2 mb-2' >
                        <CiGrid41 /> Geners
                    </h3>

                    <div className='flex items-center gap-2 flex-wrap text-white'>

                        {
                            movieData?.genres?.map((item) => {
                                return <div key={item.id} className='py-1 px-3 bg-black06  rounded-lg border-[1px] border-black15'>
                                    {item.name}
                                </div>
                            })
                        }

                    </div>
                </div>



            </div>

           
           

 
        </>

    )
}
