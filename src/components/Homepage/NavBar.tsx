import React, { useState, useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import { GoBell } from "react-icons/go";
import { HiBars3BottomRight } from "react-icons/hi2";
import { IoMdClose } from "react-icons/io";
import { motion } from "framer-motion";
import SearchModal from "./SearchModal";
// import logo from "../../assets/logo.png"; 

const sections = ["home", "upcoming", "latest", "popular", "toprated"];

const NavBar: React.FC = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
    const [activeSection, setActiveSection] = useState<string>("home");
    const [modalOpen, setModalOpen] = useState<boolean>(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            let newActiveSection = "home";

            sections.forEach((section) => {
                const element = document.getElementById(section);
                if (element) {
                    const { offsetTop, offsetHeight } = element;
                    if (scrollPosition >= offsetTop - offsetHeight / 2) {
                        newActiveSection = section;
                    }
                }
            });

            setActiveSection(newActiveSection);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header className="flex fixed top-0 w-full h-20 bg-gradient-to-b from-black  bg-opacity-80 z-50 items-center justify-between px-6 py-4">
            {modalOpen && <SearchModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />}

            {/* Logo */}
            <a href="/">
                <img src={'https://caviustechnologies.com/wp-content/uploads/2024/07/Cavius-favicon-removebg-preview.png'} alt="Logo" className="w-[150px] h-auto" />
            </a>

            {/* Desktop Navigation */}
            <nav className="bg-black06 text-gray75 font-[400] md:text-sm h-18 border-4 py-2 px-8 flex items-center gap-4 border-black12 rounded-xl hidden lg:flex">
                {sections.map((section) => (
                    <a
                        key={section}
                        href={`#${section}`}
                        className={`  ${activeSection === "#" ? "text-white bg-black12" : ""} cursor-pointer hover:bg-black10 py-2 px-4 rounded-lg `}

                    >
                        {section.charAt(0).toUpperCase() + section.slice(1)}
                    </a>
                ))}
            </nav>

            {/* Icons (Desktop) */}
            <div className="hidden lg:flex items-center space-x-4 text-xl text-white">
                <CiSearch className="cursor-pointer hover:text-gray-400" onClick={() => setModalOpen(true)} />
                <GoBell className="cursor-pointer hover:text-gray-400" />
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden">
                <HiBars3BottomRight
                    className="text-3xl text-white cursor-pointer"
                    onClick={() => setIsMobileMenuOpen(true)}
                />
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <motion.div
                    initial={{ opacity: 0, x: "100%" }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: "100%" }}
                    transition={{ duration: 0.3 }}
                    className="fixed inset-0 bg-black bg-opacity-90 p-6 z-50 flex flex-col"
                >
                    {/* Close Button */}
                    <div className="flex justify-between items-center">
                        <img src={"https://caviustechnologies.com/wp-content/uploads/2024/07/Cavius-favicon-removebg-preview.png"} alt="logo" className="w-[120px] h-auto" />
                        <IoMdClose
                            className="text-3xl text-white cursor-pointer"
                            onClick={() => setIsMobileMenuOpen(false)}
                        />
                    </div>
                    
                    <div className="my-5  flex items-center justify-end text-xl  text-white gap-4">
                        <div className="cursor-pointer hover:text-gray75">
                            <CiSearch onClick={(e) => {
                                e.stopPropagation();
                                setModalOpen(true)
                                setIsMobileMenuOpen(false)
                            }} />
                        </div>
                        <div className="cursor-pointer hover:text-gray75">
                            <GoBell />
                        </div>
                    </div>
                    {/* Mobile Menu Links */}
                    <nav className="flex flex-col mt-6 space-y-4">
                        {sections.map((section) => (
                            <a
                                key={section}
                                href={`#${section}`}
                                className="text-white text-lg"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                {section.charAt(0).toUpperCase() + section.slice(1)}
                            </a>
                        ))}
                    </nav>
                </motion.div>
            )}
        </header>
    );
};

export default NavBar;
