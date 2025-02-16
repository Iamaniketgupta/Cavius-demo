import { useState, useEffect, useRef } from 'react';
import { IoAdd } from 'react-icons/io5';
import ReviewCard from './ReviewCard';
import { IoIosArrowRoundBack, IoIosArrowRoundForward } from 'react-icons/io';

export default function ReviewCrousal() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const scrollRef = useRef(null);
    
    const reviews = [31, 3, 5, 7]; // Demo 
    
    const getItemsPerView = () => (windowWidth < 1024 ? 1 : 2);
    const itemsPerView = getItemsPerView();
    const totalSlides = reviews.length - itemsPerView + 1;

    useEffect(() => {
         const handleResize = () => {
            setWindowWidth(window.innerWidth);
            setCurrentIndex(0);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const goToPrevious = () => {
        setCurrentIndex((prev) => Math.max(0, prev - 1));
    };

    const goToNext = () => {
        setCurrentIndex((prev) => Math.min(totalSlides - 1, prev + 1));
    };

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollLeft = currentIndex * scrollRef.current.clientWidth / itemsPerView;
        }
    }, [currentIndex, itemsPerView]);

    return (
        <div>
            <div className='flex items-center justify-between'>
                <h3 className='text-gray60'>Reviews</h3>
                <button className='text-md px-4 py-3 hover:bg-black15 rounded-md bg-black03 border-[1px] border-black15 flex gap-2 items-center justify-center'>
                    <IoAdd /> <p>Add Your Review</p>
                </button>
            </div>

            <div className='flex items-center gap-4 my-6 flex-col'>
                <div ref={scrollRef} className='flex items-center gap-4 overflow-x-auto scroll-smooth no-scrollbar w-full' style={{scrollbarWidth:'none'}}>
                    {reviews.map((item) => (
                        <div key={item} className='flex-none w-full md:w-1/2'>
                            <ReviewCard />
                        </div>
                    ))}
                </div>

                <div className='flex items-center gap-2'>
                    <button onClick={goToPrevious} disabled={currentIndex === 0} className='p-1.5 text-2xl hover:bg-black15 rounded-full bg-black06 border-[1px] border-black15 flex items-center justify-center disabled:opacity-50'>
                        <IoIosArrowRoundBack />
                    </button>
                    <div className='flex items-center gap-2'>
                        {Array.from({ length: Math.ceil(reviews?.length / itemsPerView) }).map((_, index) => (
                            <div key={index} className={`w-3 h-1 rounded-full ${currentIndex === index ? 'w-4 bg-red45' : 'bg-black15'}`}></div>
                        ))}
                    </div>
                    <button onClick={goToNext} disabled={currentIndex >= totalSlides - 1} className='p-1.5 text-2xl rounded-full hover:bg-black15 bg-black03 border-[1px] border-black15 flex items-center justify-center disabled:opacity-50'>
                        <IoIosArrowRoundForward />
                    </button>
                </div>
            </div>
        </div>
    );
}