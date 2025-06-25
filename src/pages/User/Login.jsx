import React, { useState, useContext } from "react";
import SimplePopUp from "../../components/simplePopUp.jsx";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

function Login() {
    const [showPopUp, setShowPopUp] = useState(false);
    const [mail, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [redirectMessage, setRedirectMessage] = useState("");
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            // Validação local dos dados
            if (mail === "cliente@gym.com" && password === "Cliente123!") {
                // Verificar se auth e setIsLoggedIn existem
                if (auth && typeof auth.setIsLoggedIn === "function") {
                    auth.setIsLoggedIn(true);
                    
                    // Guarda dados do utilizador no localStorage
                    localStorage.setItem("userData", JSON.stringify({
                        email: mail,
                        name: "Cliente Gym",
                        phone: "912345678",
                        birthDate: "1990-01-01",
                        memberSince: "2022-01-01",
                        currentPlan: "Plano 2" // Definir plano padrão
                    }));
                    
                    setRedirectMessage("Login bem-sucedido! A redirecionar...");
                    
                    // Pequeno atraso para mostrar a mensagem antes do redirecionamento
                    setTimeout(() => {
                        navigate("/area-cliente");
                    }, 800);
                } else {
                    setError("Erro de sistema: Contexto de autenticação não disponível.");
                    console.error("AuthContext não está disponível ou setIsLoggedIn não é uma função", auth);
                }
            } else {
                setError("Email ou código de acesso inválido.");
            }
        } catch (err) {
            console.error("Erro no login:", err);
            setError("Ocorreu um erro ao fazer login. Tente novamente.");
        }
    };

    return (
        <div className="user-area">
            {/* Animated background elements */}
            <div className="background-elements">
                <div className="floating-element element-1"></div>
                <div className="floating-element element-2"></div>
                <div className="floating-element element-3"></div>
            </div>

            <h1 className="main-title">ÁREA DE UTILIZADOR</h1>

            <div className="user-area-image">
                <div className="login-forms">
                    <div className="login-header">
                        <div className="user-icon">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </div>
                        <h1>Acede a tua Conta</h1>
                        <p className="login-subtitle">Bem-vindo de volta</p>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="login-forms-container">
                            {/* Email field */}
                            <div className="input-group">
                                <label htmlFor="email" className="input-label">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="m4 4 16 0 0 16-16 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="m22 6-10 7L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                    Email
                                </label>
                                <div className="input-wrapper">
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={mail}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="modern-input"
                                        placeholder="exemplo@email.com"
                                        required
                                    />
                                    <div className="input-glow"></div>
                                </div>
                            </div>

                            {/* Password field */}
                            <div className="input-group">
                                <label htmlFor="password" className="input-label">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" stroke="currentColor" strokeWidth="2"/>
                                        <circle cx="12" cy="16" r="1" fill="currentColor"/>
                                        <path d="M7 11V7a5 5 0 0 1 10 0v4" stroke="currentColor" strokeWidth="2"/>
                                    </svg>
                                    Código de Acesso
                                </label>
                                <div className="input-wrapper password-wrapper">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        id="password"
                                        name="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="modern-input"
                                        placeholder="Digite o seu código"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="password-toggle-btn"
                                        aria-label={showPassword ? "Esconder password" : "Mostrar password"}
                                    >
                                        {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                                    </button>
                                    <div className="input-glow"></div>
                                </div>
                            </div>
                        </div>

                        <div className="login-forms-div">
                            <button
                                className="login-forms-button"
                                type="submit"
                            >
                                ENTRAR
                            </button>

                            <button
                                type="button"
                                className="login-link"
                                onClick={() => setShowPopUp(true)}
                            >
                                O que é um Código de Acesso?
                            </button>
                        </div>

                        {error && (
                            <div className="login-error">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                                    <line x1="15" y1="9" x2="9" y2="15" stroke="currentColor" strokeWidth="2"/>
                                    <line x1="9" y1="9" x2="15" y2="15" stroke="currentColor" strokeWidth="2"/>
                                </svg>
                                {error}
                            </div>
                        )}
                        
                        {redirectMessage && (
                            <div className="login-success">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                                    <path d="M8 12l3 3 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                                {redirectMessage}
                            </div>
                        )}
                    </form>

                    <div className="security-footer">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" stroke="currentColor" strokeWidth="2"/>
                            <circle cx="12" cy="16" r="1" fill="currentColor"/>
                            <path d="M7 11V7a5 5 0 0 1 10 0v4" stroke="currentColor" strokeWidth="2"/>
                        </svg>
                        <span>Protegido por encriptação de ponta a ponta</span>
                    </div>
                </div>
            </div>

            {showPopUp && (
                <div className="fullscreen-popup">
                    <SimplePopUp onClose={() => setShowPopUp(false)} />
                </div>
            )}
        </div>
    );
}

export default Login;