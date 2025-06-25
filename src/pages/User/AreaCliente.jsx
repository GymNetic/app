import React, { useState, useEffect, useCallback } from "react";
import { User, Heart, Calendar, Settings, BarChart3, BookOpen, CreditCard, Bell } from "lucide-react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import "./AreaCliente.css";
import NotificacoesPage from "../NotificacoesPage.jsx";
import PlanoTreinoPage from "../PlanoTreinoPage.jsx";
import Mensalidades from "../../components/Mensalidades.jsx";
import PlanosData from "../../data/PlanosData.js";
import { isAuthenticated, getUserData, logout, getToken } from "../../services/authService";
import apiService from "../../services/apiService";

function AreaCliente() {
    const [client, setClient] = useState(null);
    const [editing, setEditing] = useState(false);
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [activeSection, setActiveSection] = useState("conta");
    const [favoriteExercises, setFavoriteExercises] = useState([]);
    const [showPassword, setShowPassword] = useState(false);
    const [currentPlan, setCurrentPlan] = useState(null);
    const [showPlanChanged, setShowPlanChanged] = useState(false);
    const [dashboardData, setDashboardData] = useState(null);
    const location = useLocation();
    // REMOVIDO: refreshKey que estava causando re-renders desnecessários

    const navigate = useNavigate();

    const menuItems = [
        { id: "conta", label: "Minha Conta", icon: User },
        { id: "dashboard", label: "Dashboard", icon: BarChart3 },
        { id: "favoritos", label: "Exercícios Favoritos", icon: Heart },
        { id: "planos", label: "Planos de Treino", icon: BookOpen },
        { id: "pagamento", label: "Pagamentos", icon: CreditCard },
        { id: "notificacoes", label: "Notificações", icon: Bell },
        { id: "AvaliacaoFisica", label: "Avaliação Física", icon: Settings }
    ];

    // Memoizar a função para evitar re-renders desnecessários
    const fetchUserData = useCallback(async (skipDashboard = false) => {
        try {
            setLoading(true);

            const userProfile = await apiService.user.getProfile();

            const userData = {
                nome: userProfile.nome && userProfile.nome.trim() ? userProfile.nome : "Nome não disponível",
                email: userProfile.email,
                phone: userProfile.telefone || "",
                photoUrl: userProfile.fotoUrl || "",
                password: "••••••••",
                currentPlan: userProfile.planoAtual || "Plano 1"
            };

            localStorage.setItem("userData", JSON.stringify(userData));

            setClient(userData);
            setNome(userData.nome);
            setEmail(userData.email);
            setCurrentPlan(userData.currentPlan);

            // Apenas tenta carregar dashboard se não for para pular e se for a seção ativa
            if (!skipDashboard && activeSection === "dashboard") {
                try {
                    const dashboard = await apiService.dashboard.getSummary();
                    setDashboardData(dashboard);
                } catch (dashboardError) {
                    console.error("Erro ao carregar dados do dashboard:", dashboardError);
                    // Não propaga o erro para evitar loops
                    setDashboardData(null);
                }
            }

            setLoading(false);
        } catch (error) {
            console.error("Erro ao carregar dados:", error);

            const storedUserData = getUserData();
            if (storedUserData) {
                setClient(storedUserData);
                setNome(storedUserData.nome || "");
                setEmail(storedUserData.email || "");
                setCurrentPlan(storedUserData.currentPlan || "Plano 1");
                setLoading(false);
            } else {
                setError("Falha ao carregar dados do usuário. Por favor, faça login novamente.");
                setTimeout(() => {
                    logout();
                    navigate('/login');
                }, 2000);
            }
        }
    }, [activeSection]); // Incluir activeSection como dependência

    // useEffect para seção ativa baseada na URL
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const section = params.get('section');
        if (section && menuItems.some(item => item.id === section)) {
            setActiveSection(section);
        }
    }, [location.search]); // Apenas location.search como dependência

    // useEffect principal - executado apenas uma vez no mount
    useEffect(() => {
        if (!isAuthenticated()) {
            navigate('/login');
            return;
        }

        // Carregar dados iniciais sem dashboard para evitar loop
        fetchUserData(true);

        // Handler memoizado que previne loops
        const handleAuthChanged = (event) => {
            console.log('Auth changed event received');

            // Verificar se o evento não foi disparado por esta mesma instância
            if (event?.detail?.source !== 'area-cliente' && isAuthenticated()) {
                fetchUserData(true); // Pular dashboard para evitar loops
            }
        };

        // Event listeners para atualizações externas
        window.addEventListener('auth-changed', handleAuthChanged);
        window.addEventListener('profile-updated', handleAuthChanged);

        return () => {
            window.removeEventListener('auth-changed', handleAuthChanged);
            window.removeEventListener('profile-updated', handleAuthChanged);
        };
    }, [navigate, fetchUserData]); // Dependências mínimas necessárias

    // useEffect separado para carregar dashboard quando necessário
    useEffect(() => {
        if (activeSection === "dashboard" && client && !dashboardData) {
            const loadDashboard = async () => {
                try {
                    const dashboard = await apiService.dashboard.getSummary();
                    setDashboardData(dashboard);
                } catch (dashboardError) {
                    console.error("Erro ao carregar dados do dashboard:", dashboardError);
                    setDashboardData(null);
                }
            };
            loadDashboard();
        }
    }, [activeSection, client, dashboardData]);

    // useEffect para favoritos
    useEffect(() => {
        const loadFavorites = () => {
            const favorites = JSON.parse(localStorage.getItem('favoriteExercises') || '[]');
            setFavoriteExercises(favorites);
        };

        loadFavorites();
        window.addEventListener('storage', loadFavorites);
        return () => window.removeEventListener('storage', loadFavorites);
    }, []);

    const handleEdit = async (e) => {
        if (e) e.preventDefault();
        try {
            const updateData = { nome, email };
            await apiService.user.updateProfile(updateData);
            setEditing(false);
            setError("");
            // REMOVIDO: setRefreshKey que causava re-render
            alert("Dados atualizados com sucesso!");

            // Atualizar dados localmente sem forçar re-render
            setClient(prevClient => ({
                ...prevClient,
                nome,
                email
            }));
        } catch (error) {
            setError(error.message || "Falha ao atualizar os dados. Tente novamente.");
        }
    };

    const handleUnfavorite = (exerciseId, exerciseName) => {
        if (window.confirm(`Tem certeza que deseja remover "${exerciseName}" dos seus favoritos?`)) {
            const favorites = JSON.parse(localStorage.getItem('favoriteExercises') || '[]');
            const updatedFavorites = favorites.filter(ex => ex.id !== exerciseId);
            localStorage.setItem('favoriteExercises', JSON.stringify(updatedFavorites));
            setFavoriteExercises(updatedFavorites);
        }
    };

    const handlePlanChange = async (newPlan) => {
        try {
            const token = getToken();

            const response = await fetch("http://localhost:5005/api/user/update-plan", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    planId: newPlan
                })
            });

            if (response.ok) {
                setCurrentPlan(newPlan);

                const userData = JSON.parse(localStorage.getItem("userData") || "{}");
                userData.currentPlan = newPlan;
                localStorage.setItem("userData", JSON.stringify(userData));

                setClient(prevClient => ({
                    ...prevClient,
                    currentPlan: newPlan
                }));


                setShowPlanChanged(true);
                setTimeout(() => {
                    setShowPlanChanged(false);
                }, 3000);
            } else {
                const errorData = await response.json();
                throw new Error(errorData.message || "Erro ao atualizar plano");
            }
        } catch (error) {
            console.error("Erro ao atualizar plano:", error);
            setError("Falha ao atualizar o plano. Tente novamente.");
        }
    };

    const handleLogout = () => {
        if (window.confirm("Tem certeza que deseja desconectar sua conta?")) {
            logout();
            navigate("/");
            alert("Desconectado com sucesso!");
        }
    };

    const renderContent = () => {
        switch (activeSection) {
            case "conta":
                return (
                    <div className="content-section">
                        <h2 className="section-title">Minha Conta</h2>
                        {!editing ? (
                            <div className="account-info">
                                {client?.photoUrl && (
                                    <div className="profile-photo">
                                        <img src={client.photoUrl} alt="Foto de perfil" />
                                    </div>
                                )}
                                <div className="info-card">
                                    <div className="info-row">
                                        <span className="info-label">Nome:</span>
                                        <span className="info-value">{client?.nome}</span>
                                    </div>
                                    <div className="info-row">
                                        <span className="info-label">Email:</span>
                                        <span className="info-value">{client?.email}</span>
                                    </div>
                                    <div className="info-row">
                                        <span className="info-label">Código de Acesso:</span>
                                        <div className="password-display">
                                            <span className="info-value">
                                                {showPassword ? client?.password : "••••••••••"}
                                            </span>
                                            <button
                                                type="button"
                                                className="password-toggle-btn"
                                            >
                                            </button>
                                        </div>
                                    </div>
                                    <div className="info-row">
                                        <span className="info-label">Telefone:</span>
                                        <span className="info-value">{client?.phone}</span>
                                    </div>
                                </div>
                                <div className="info-actions">
                                    <button className="btn-primary" onClick={() => setEditing(true)}>
                                        Editar Dados
                                    </button>
                                    <button className="btn-outline" onClick={handleLogout}>
                                        Desconectar Conta
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="edit-form">
                                <div className="form-group">
                                    <label>Nome:</label>
                                    <input
                                        type="text"
                                        value={nome}
                                        onChange={e => setNome(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Email:</label>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Código de acesso:</label>
                                    <div className="password-edit-container">
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            value={password}
                                            onChange={e => setPassword(e.target.value)}
                                            placeholder="Deixe em branco para manter o mesmo"
                                        />
                                        <button
                                            type="button"
                                            className="password-toggle-btn"
                                            onClick={() => setShowPassword(!showPassword)}
                                        >
                                            {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                                        </button>
                                    </div>
                                    <small className="form-help-text">
                                        Deixe em branco para manter o código atual ou digite um novo código com pelo menos 6 caracteres.
                                    </small>
                                </div>
                                <div className="form-actions">
                                    <button onClick={handleEdit} className="btn-primary">Salvar</button>
                                    <button
                                        onClick={() => {
                                            setEditing(false);
                                            setPassword("••••••••");
                                            setShowPassword(false);
                                        }}
                                        className="btn-secondary"
                                    >
                                        Cancelar
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                );
            // Adicione os outros cases conforme necessário
            default:
                return <div>Selecione uma opção no menu.</div>;
        }
    };

    if (loading) return <div className="loading">Carregando...</div>;
    if (error) return <div className="error">Erro: {error}</div>;

    return (
        // REMOVIDO: key que forçava re-render do componente inteiro
        <div className="area-cliente">
            <div className="sidebar">
                <div className="sidebar-header">
                    <h2>Área do Cliente</h2>
                </div>
                <nav className="sidebar-nav">
                    {menuItems.map(item => {
                        const Icon = item.icon;
                        return (
                            <button
                                key={item.id}
                                className={`nav-item ${activeSection === item.id ? 'active' : ''}`}
                                onClick={() => setActiveSection(item.id)}
                            >
                                <Icon size={20} />
                                <span>{item.label}</span>
                            </button>
                        );
                    })}
                </nav>
            </div>
            <div className="main-content">
                {renderContent()}
            </div>
        </div>
    );
}

export default AreaCliente;