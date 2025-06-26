import React, { useState } from "react";
import SimplePopUp from "../../components/simplePopUp.jsx";
import "./Login.css";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import apiService from "../../services/apiService";
import { updateUserData } from "../../services/authService";

function Login() {
    const [showPopUp, setShowPopUp] = useState(false);
    const [mail, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [redirectMessage, setRedirectMessage] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setRedirectMessage("");

        try {
            // Usar o serviço de API para login
            const data = await apiService.auth.login({ 
                Email: mail, 
                Password: password, 
                RememberMe: true 
            });

            console.log("Resposta do backend:", data);

            // Salvar o token JWT no localStorage
            localStorage.setItem("token", data.token);
            
            // Buscar dados do perfil do usuário após login bem-sucedido
            try {
                const userProfile = await apiService.user.getProfile();
                
                // Salvar informações do usuário no localStorage usando o novo método
                updateUserData({
                    name: userProfile.nome || userProfile.name || "Usuário",
                    email: userProfile.email || mail,
                    phone: userProfile.telefone || "",
                    birthDate: userProfile.dataNascimento || "",
                    memberSince: userProfile.dataCriacao || new Date().toISOString().split('T')[0],
                });
            } catch (profileError) {
                console.error("Erro ao buscar perfil do usuário:", profileError);
                
                // Criar dados básicos do usuário se a API de perfil falhar
                updateUserData({
                    name: "Usuário",
                    email: mail,
                });
            }
            
            setRedirectMessage(data.message || "Login efetuado com sucesso!");
            
            // Disparar eventos para atualização dos componentes
            window.dispatchEvent(new Event('auth-changed'));
            window.dispatchEvent(new Event('profile-updated'));
            
            // Redirecionar para área do cliente após um curto delay
            setTimeout(() => {
                navigate("/area-cliente");
            }, 500);
        } catch (err) {
            console.error("Erro ao fazer login:", err);
            setError("Falha na autenticação. Verifique seu email e código de acesso.");
        }
    };

    return (
        <div className="user-area">
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
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="currentColor"
                                      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2"
                                        strokeLinecap="round" strokeLinejoin="round"/>
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
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path d="m4 4 16 0 0 16-16 0z" stroke="currentColor" strokeWidth="2"
                                              strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="m22 6-10 7L2 6" stroke="currentColor" strokeWidth="2"
                                              strokeLinecap="round" strokeLinejoin="round"/>
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
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"
                                              stroke="currentColor" strokeWidth="2"/>
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
                                        {showPassword ? <FaRegEyeSlash/> : <FaRegEye/>}
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
                        </div>

                        {error && (
                            <div className="login-error">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                                    <line x1="15" y1="9" x2="9" y2="15" stroke="currentColor" strokeWidth="2"/>
                                    <line x1="9" y1="9" x2="15" y2="15" stroke="currentColor" strokeWidth="2"/>
                                </svg>
                                {error}
                            </div>
                        )}

                        {redirectMessage && (
                            <div className="login-success">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                                    <path d="M8 12l3 3 6-6" stroke="currentColor" strokeWidth="2"
                                          strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                                {redirectMessage}
                            </div>
                        )}
                    </form>

                    <div className="security-footer">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                             xmlns="http://www.w3.org/2000/svg">
                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" stroke="currentColor"
                                  strokeWidth="2"/>
                            <circle cx="12" cy="16" r="1" fill="currentColor"/>
                            <path d="M7 11V7a5 5 0 0 1 10 0v4" stroke="currentColor" strokeWidth="2"/>
                        </svg>
                        <span>Protegido por encriptação de ponta a ponta</span>
                    </div>
                </div>
            </div>

            {showPopUp && (
                <div className="fullscreen-popup">
                    <SimplePopUp onClose={() => setShowPopUp(false)}/>
                </div>
            )}
        </div>
    );
}

export default Login;