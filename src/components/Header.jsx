import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import DropDownMenu from "./DropDownMenu";
import logo2 from "../logo/logo2.svg";
import logowhite from "../logo/logowhite.svg";
import "./Header.css";
import { SlSettings } from "react-icons/sl";
import { SlBell } from "react-icons/sl";
import { GiHamburgerMenu } from "react-icons/gi";
import { SlUser } from "react-icons/sl";
import { IconContext } from "react-icons";
import { IoClose } from "react-icons/io5";
import SideBar from "./SideBar";

function Header() {
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const dropdownRef = useRef(null);
    const headerRef = useRef(null);
   
    const handleMouseEnter = (menuType) => {
        setActiveDropdown(menuType);
    };
   
    const handleMouseLeave = () => {
        setActiveDropdown(null);
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    useEffect(() => {
        const handleScroll = () => {
            const scrolled = window.scrollY > 30;
            if (scrolled !== isScrolled) {
                setIsScrolled(scrolled);
                if (scrolled) {
                    document.body.classList.add('scrolled');
                } else {
                    document.body.classList.remove('scrolled');
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();
        
        return () => {
            window.removeEventListener('scroll', handleScroll);
            document.body.classList.remove('scrolled');
        };
    }, [isScrolled]);

    useEffect(() => {
        const handleMouseOutside = (e) => {
            if (
                headerRef.current &&
                dropdownRef.current &&
                !headerRef.current.contains(e.target) &&
                !dropdownRef.current.contains(e.target)
            ) {
                setActiveDropdown(null);
            }
        };
        document.addEventListener('mouseover', handleMouseOutside);
       
        return () => {
            document.removeEventListener('mouseover', handleMouseOutside);
        };
    }, []);

    return (
        <div className="header-container">
            <header 
                ref={headerRef} 
                className={isScrolled ? "header-scrolled" : ""}
            >
                <Link to="/">
                    <img 
                        src={isScrolled ? logowhite : logo2} 
                        alt="Logo" 
                        height={60}
                    />
                </Link>
                <nav>
                    <ul>
                        <li
                            className="dropdown-item"
                            onMouseEnter={() => handleMouseEnter('treino')}
                        >
                            <Link to="/ExerciciosPage">TREINO</Link>
                        </li>
                        <li
                            className="dropdown-item"
                            onMouseEnter={() => handleMouseEnter('alimentacao')}
                        >
                            <Link to="/NutriAgendaPage">ALIMENTAÇÃO</Link>
                        </li>
                        <li>
                            <Link to="/mensalidade-forms">ADESÃO</Link>
                        </li>
                    </ul>
                </nav>
                <nav>
                    <IconContext.Provider value={{ size: '1.5em', className: isScrolled ? 'icon icon-scrolled' : 'icon' }}>
                        <ul>
                            <li><Link to="/notifications"><SlBell /></Link></li>
                            <li><Link to="/login"><SlUser /></Link></li>
                            <li 
                                className="hamburger-menu"
                                onClick={toggleSidebar}
                            >
                                <GiHamburgerMenu color="#ff2783"/>
                            </li>
                        </ul>
                    </IconContext.Provider>
                </nav>
            </header>
           
            {activeDropdown && (
                <div
                    ref={dropdownRef}
                    className="full-width-dropdown"
                    onMouseEnter={() => setActiveDropdown(activeDropdown)}
                    onMouseLeave={handleMouseLeave}
                >
                    <DropDownMenu type={activeDropdown} />
                </div>
            )}

            <SideBar show={isSidebarOpen} />
            
            {isSidebarOpen && (
                <button 
                    className="close-sidebar-button"
                    onClick={toggleSidebar}
                >
                    <IoClose size="1.5em" />
                </button>
            )}
        </div>
    );
}

export default Header;