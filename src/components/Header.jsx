import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import DropDownMenu from "./DropDownMenu";
import logo2 from "../logo/logo2.svg";
import logowhite from "../logo/logowhite.svg";
import "./Header.css";
import { MdNotificationsNone, MdNotificationsActive } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaRegUser, FaUserCircle } from "react-icons/fa";
import { IconContext } from "react-icons";
import { IoClose } from "react-icons/io5";
import SideBar from "./SideBar";
import ThemeToggle from "./ThemeToggle.jsx";
import { isAuthenticated, getUserData } from "../services/authService";

function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isAuthenticated_, setIsAuthenticated] = useState(false);
    const [userName, setUserName] = useState("");
    const dropdownRef = useRef(null);
    const headerRef = useRef(null);
    const [temNotificacoesNaoLidas, setTemNotificacoesNaoLidas] = useState(false);
    const navigate = useNavigate();
    const [forceUpdate, setForceUpdate] = useState(0);

    // Verificar autenticação quando o componente montar e em intervalos regulares
    useEffect(() => {
        const checkAuth = () => {
            const authenticated = isAuthenticated();
            setIsAuthenticated(authenticated);

            if (authenticated) {
                const userData = getUserData();
                setUserName(userData?.nome || "Usuário");
            } else {
                setUserName("");
            }
        };

        checkAuth();

        // Verificar autenticação a cada 5 minutos e quando o localStorage mudar
        const interval = setInterval(checkAuth, 5 * 60 * 1000);

        window.addEventListener('storage', checkAuth);

        // Adicionar evento personalizado para verificar autenticação após login/logout
        window.addEventListener('auth-changed', checkAuth);

        // Adicionar evento para atualização de perfil
        window.addEventListener('profile-updated', () => {
            checkAuth();
            setForceUpdate(prev => prev + 1); // Força a atualização do componente
        });

        return () => {
            clearInterval(interval);
            window.removeEventListener('storage', checkAuth);
            window.removeEventListener('auth-changed', checkAuth);
            window.removeEventListener('profile-updated', checkAuth);
        };
    }, [forceUpdate]); // Adicionar forceUpdate para garantir a execução após as atualizações

    useEffect(() => {
        const verificarNotificacoes = () => {
            const notificacoesSalvas = JSON.parse(localStorage.getItem('notificacoes') || '[]');
            const temNaoLidas = notificacoesSalvas.some(notificacao => !notificacao.lida);
            setTemNotificacoesNaoLidas(temNaoLidas);
        };

        // Verifica inicialmente
        verificarNotificacoes();

        // Adiciona listener para mudanças nas notificações
        window.addEventListener('notificacoesAtualizadas', verificarNotificacoes);

        return () => {
            window.removeEventListener('notificacoesAtualizadas', verificarNotificacoes);
        };
    }, []);

    const [activeDropdown, setActiveDropdown] = useState(null);

    const handleMouseEnter = (menuType) => {
        setActiveDropdown(menuType);
    };

    const handleMouseLeave = () => {
        setActiveDropdown(null);
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    // Handler para navegar para a área do cliente quando o usuário clica no ícone
    const handleUserIconClick = () => {
        if (isAuthenticated_) {
            navigate('/area-cliente');
        } else {
            navigate('/login');
        }
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
        <div className="header-container" key={`header-${forceUpdate}`}>
            <header ref={headerRef} className={isScrolled ? "header-scrolled" : ""}>
                <Link to="/home">
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
                            <li>
                                <ThemeToggle/>
                            </li>
                            <li>
                                <Link to="/notificacoesPage">
                                    {temNotificacoesNaoLidas ? (
                                        <MdNotificationsActive className={`icon notification-icon-active ${isScrolled ? 'icon-scrolled' : ''}`} />
                                    ) : (
                                        <MdNotificationsNone className="icon" size="32px" />
                                    )}
                                </Link>
                            </li>
                            <li className="user-icon-container" onClick={handleUserIconClick}>
                                {isAuthenticated_ ? (
                                    <div className="user-icon-trigger">
                                        <FaUserCircle className="icon" />
                                        <span className="user-name">{userName}</span>
                                    </div>
                                ) : (
                                    <div className="user-icon-trigger">
                                        <FaRegUser className="icon"/>
                                    </div>
                                )}
                            </li>
                            <li className="hamburger-menu" onClick={toggleSidebar}>
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