import React, { useState, useEffect, useCallback } from "react";
import { IoIosArrowRoundBack, IoIosArrowRoundForward } from "react-icons/io";
import SliderCard from "./SliderCard";

function ListSlider({ title, data }: { title?: string, data?: object[] }) {

    const [currentIndex, setCurrentIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    // Responsive items per view
    const getItemsPerView = () => {
        if (windowWidth < 640) return 1;
        if (windowWidth < 1024) return 2;
        if (windowWidth < 1280) return 3;
        return 5;
    };

    const itemsPerView = getItemsPerView();
    const totalSlides = data && data?.length - itemsPerView + 1 || 0;

    useEffect(() => {

        const handleResize = () => {
            setWindowWidth(window.innerWidth);
            setCurrentIndex(0);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        if (isTransitioning) {
            const timer = setTimeout(() => setIsTransitioning(false), 500);
            return () => clearTimeout(timer);
        }
    }, [isTransitioning]);

    const goToPrevious = () => {
        if (isTransitioning) return;
        setIsTransitioning(true);
        setCurrentIndex((prevIndex) => Math.max(0, prevIndex - itemsPerView));
    };

    const goToNext = () => {
        if (isTransitioning) return;
        setIsTransitioning(true);
        setCurrentIndex((prevIndex) =>
            Math.min(totalSlides - 1, prevIndex + itemsPerView)
        );
    };

    // Scroll Indicator  
    const indicatorPosition = totalSlides > 1
        ? (currentIndex / (totalSlides - 1)) * 100
        : 0;

    const scrollRef = React.useRef(null);

    const handleScroll = useCallback(() => {
        if (scrollRef.current) {
            const scrollLeft = scrollRef.current?.scrollLeft;
            //   console.log(scrollRef.current.clientWidth)
            const maxScrollLeft = scrollRef.current?.scrollWidth - scrollRef.current?.clientWidth;

            //   console.log(maxScrollLeft)

            const newIndex = Math.round((scrollLeft / maxScrollLeft) * totalSlides);
            setCurrentIndex(Math.min(newIndex, totalSlides - 1));
        }
    }, [totalSlides]);

    return (
        <div className="md:p-4">
            <div className="max-w-[1920px] mx-auto">
                <div className="mb-6">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <h2 className="text-white text-xl font-bold">{title}</h2>

                        {/* Slider Controls */}
                        {data && data?.length > itemsPerView && <div className="max-sm:hidden flex items-center gap-4 p-2 rounded-md bg-black06">
                            <button
                                onClick={goToPrevious}
                                disabled={isTransitioning || currentIndex === 0}
                                className="p-2 bg-black15 hover:bg-black10 rounded-md transition-colors disabled:opacity-50 cursor-pointer"
                            >
                                <IoIosArrowRoundBack className="text-white text-2xl" />
                            </button>

                            {/* Indicators */}
                            <div
                                className="flex items-center max-w-[200px] overflow-x-hidden justify-center gap-2"
                                style={{ scrollbarWidth: "none" }}
                            >
                                {Array.from({ length: Math.ceil(data?.length / itemsPerView) }).map((_, index) => (
                                    <div
                                        key={index}
                                        onClick={() => setCurrentIndex(index * itemsPerView)}
                                        className={`h-1 rounded-full transition-all duration-300 ${Math.floor(currentIndex / itemsPerView) === index
                                            ? "w-6 bg-red45"
                                            : "w-3 min-w-3 bg-black15"
                                            }`}
                                    />
                                ))}
                            </div>

                            <button
                                onClick={goToNext}
                                disabled={isTransitioning || currentIndex >= totalSlides - 1}
                                className="p-2 bg-black15 hover:bg-black10 rounded-md transition-colors disabled:opacity-50 cursor-pointer"
                            >
                                <IoIosArrowRoundForward className="text-white text-2xl" />
                            </button>
                        </div>}
                    </div>
                </div>
                {data && data?.length > itemsPerView ? <>

                    {/* Carousel Container */}
                    <div className="relative md:overflow-hidden max-sm:overflow-x-auto"
                        onScroll={handleScroll}
                        ref={scrollRef}
                        style={{ scrollbarWidth: "none" }
                        }>
                        <div
                            className="flex items-center max-sm:gap-3 transition-transform duration-500 ease-in-out"

                            style={{
                                transform: `translateX(-${(currentIndex * (100 / itemsPerView))}%)`,

                            }}
                        >
                            {data?.map((slide:{
                                id: number,
                                title: string,
                                poster_path: string
                            }) => (
                                <div
                                    key={slide.id}
                                    className="flex-none"
                                    style={{ width: `${100 / itemsPerView}%`, padding: "0 0.75rem" }}
                                >
                                    <SliderCard data={slide}  />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Scroll Indicator Mover */}
                    <div className="md:hidden w-36 flex items-center mx-auto my-4">
                        <div className="relative w-full h-2 bg-black10 rounded-md">
                            <div
                                className="absolute top-0 left-0 h-2 w-6 bg-red45 rounded-md transition-all duration-500"
                                style={{ left: `${indicatorPosition}%` }}
                            ></div>
                        </div>
                    </div>
                </>
                    :
                    <p className="text-white text-center flex items-center justify-center w-full text-sm">No data Found</p>
                }

            </div>
        </div>
    );
}

export default ListSlider;
