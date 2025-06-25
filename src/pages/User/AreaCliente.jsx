import React, { useState, useEffect, useContext } from "react";
import { User, Heart, Calendar, Settings, BarChart3, BookOpen, CreditCard, Bell } from "lucide-react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./AreaCliente.css";
import NotificacoesPage from "../NotificacoesPage.jsx";
import PlanoTreinoPage from "../PlanoTreinoPage.jsx";
import Mensalidades from "../../components/Mensalidades.jsx";
import PlanosData from "../../data/PlanosData.js";

function AreaCliente() {
    const [client, setClient] = useState(null);
    const [editing, setEditing] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(true);
    const [error] = useState("");
    const [activeSection, setActiveSection] = useState("conta");
    const [favoriteExercises, setFavoriteExercises] = useState([]);
    const [showPassword, setShowPassword] = useState(false);
    const [currentPlan, setCurrentPlan] = useState(null);
    const [showPlanChanged, setShowPlanChanged] = useState(false);

    const navigate = useNavigate();

    const menuItems = [
        { id: "conta", label: "Minha Conta", icon: User },
        { id: "favoritos", label: "Exercícios Favoritos", icon: Heart },
        { id: "planos", label: "Planos de Treino", icon: BookOpen },
        { id: "pagamento", label: "Pagamentos", icon: CreditCard },
        { id: "notificacoes", label: "Notificações", icon: Bell },
        { id: "configuracoes", label: "Configurações", icon: Settings }
    ];

    useEffect(() => {
        // Busca dados do utilizador do localStorage
        const userData = localStorage.getItem("userData");
        if (userData) {
            const data = JSON.parse(userData);
            setClient({
                name: data.name || "Nome não disponível",
                email: data.email,
                phone: data.phone || "",
                birthDate: data.birthDate || "",
                memberSince: data.memberSince || "",
                password: data.password || "Cliente123!", // Definir senha padrão se não existir
                currentPlan: data.currentPlan || "Plano 1", // Obter plano atual
            });
            setName(data.name || "");
            setEmail(data.email || "");
            setPassword(data.password || "Cliente123!"); // Inicializar estado da senha
            setCurrentPlan(data.currentPlan || "Plano 1"); // Inicializar estado do plano
            setLoading(false);
        } else {
            // Se não houver dados, força logout ou redireciona para login
            setLoading(false);
            setClient(null);
        }
    }, []);

    useEffect(() => {
        const loadFavorites = () => {
            const favorites = JSON.parse(localStorage.getItem('favoriteExercises') || '[]');
            setFavoriteExercises(favorites);
        };

        loadFavorites();
        // Adiciona um event listener para atualizar os favoritos quando mudarem
        window.addEventListener('storage', loadFavorites);
        return () => window.removeEventListener('storage', loadFavorites);
    }, []);

    const handleEdit = (e) => {
        if (e) e.preventDefault();

        // Atualiza os dados do cliente incluindo a senha
        const updatedClient = { ...client, name, email, password };
        setClient(updatedClient);

        // Atualiza os dados no localStorage
        const userData = JSON.parse(localStorage.getItem("userData") || "{}");
        userData.name = name;
        userData.email = email;
        userData.password = password;
        localStorage.setItem("userData", JSON.stringify(userData));

        setEditing(false);
    };

    const handleUnfavorite = (exerciseId, exerciseName) => {
        // Mostrar confirmação antes de desfavoritar
        if (window.confirm(`Tem certeza que deseja remover "${exerciseName}" dos seus favoritos?`)) {
            const favorites = JSON.parse(localStorage.getItem('favoriteExercises') || '[]');
            const updatedFavorites = favorites.filter(ex => ex.id !== exerciseId);
            localStorage.setItem('favoriteExercises', JSON.stringify(updatedFavorites));
            setFavoriteExercises(updatedFavorites);
        }
    };

    const handlePlanChange = (newPlan) => {
        setCurrentPlan(newPlan);
        
        // Atualiza os dados no localStorage
        const userData = JSON.parse(localStorage.getItem("userData") || "{}");
        userData.currentPlan = newPlan;
        localStorage.setItem("userData", JSON.stringify(userData));
        
        // Atualizar dados do cliente no estado
        setClient(prevClient => ({
            ...prevClient,
            currentPlan: newPlan
        }));
        
        // Mostrar mensagem de sucesso
        setShowPlanChanged(true);
        setTimeout(() => {
            setShowPlanChanged(false);
        }, 3000);
    };

    // Função para desconectar conta
    const handleLogout = () => {
        // Mostrar confirmação antes de desconectar
        if (window.confirm("Tem certeza que deseja desconectar sua conta?")) {
            // Chamar função de logout do contexto
            logout();

            // Redirecionar para a página inicial
            navigate("/");

            // Opcional: mostrar mensagem de logout bem-sucedido
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
                                <div className="info-card">
                                    <div className="info-row">
                                        <span className="info-label">Nome:</span>
                                        <span className="info-value">{client?.name}</span>
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
                                                onClick={() => setShowPassword(!showPassword)}
                                                aria-label={showPassword ? "Esconder código de acesso" : "Mostrar código de acesso"}
                                            >
                                                {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                                            </button>
                                        </div>
                                    </div>
                                    <div className="info-row">
                                        <span className="info-label">Telefone:</span>
                                        <span className="info-value">{client?.phone}</span>
                                    </div>
                                    <div className="info-row">
                                        <span className="info-label">Data de Nascimento:</span>
                                        <span className="info-value">{client?.birthDate}</span>
                                    </div>
                                    <div className="info-row">
                                        <span className="info-label">Membro desde:</span>
                                        <span className="info-value">{client?.memberSince}</span>
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
                                            required
                                        />
                                        <button
                                            type="button"
                                            className="password-toggle-btn"
                                            onClick={() => setShowPassword(!showPassword)}
                                        >
                                            {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                                        </button>
                                    </div>
                                </div>
                                <div className="form-actions">
                                    <button onClick={handleEdit} className="btn-primary">Salvar</button>
                                    <button onClick={() => setEditing(false)} className="btn-secondary">
                                        Cancelar
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                );

            case "favoritos":
                return (
                    <div className="content-section">
                        <h2 className="section-title">Exercícios Favoritos</h2>
                        <div className="favorites-grid">
                            {favoriteExercises.map(exercise => (
                                <div key={exercise.id} className="exercise-card">
                                    <div className="exercise-header">
                                        <h3>{exercise.name}</h3>
                                        <button
                                            onClick={() => handleUnfavorite(exercise.id, exercise.name)}
                                            className="unfavorite-button"
                                        >
                                            <Heart className="heart-icon filled" size={20} />
                                        </button>
                                    </div>
                                    <p className="exercise-category">{exercise.category}</p>
                                    {exercise.photo && (
                                        <img
                                            src={exercise.photo}
                                            alt={exercise.name}
                                            className="exercise-photo"
                                        />
                                    )}
                                    <button
                                        onClick={() => handleUnfavorite(exercise.id, exercise.name)}
                                        className="desfavoritar-btn"
                                    >
                                        Desfavoritar
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                );

            case "notificacoes":
                return (
                    <NotificacoesPage/>
                );

            case "planos":
                return (
                    <PlanoTreinoPage/>
                );
            case "pagamento":
                return (
                    <div className="content-section">
                        <h2 className="section-title">Plano atual de mensalidade</h2>
                        
                        {showPlanChanged && (
                            <div className="success-message">
                                <p>Plano alterado com sucesso para {currentPlan}!</p>
                            </div>
                        )}
                        
                        <div className="pagamentos-container">
                            {PlanosData.map((mensalidade, idx) => (
                                <Mensalidades
                                    key={idx}
                                    name={mensalidade.name}
                                    price={mensalidade.price}
                                    description={mensalidade.description}
                                    features={mensalidade.features}
                                    isCurrentPlan={currentPlan === mensalidade.name}
                                    onPlanChange={handlePlanChange}
                                />
                            ))}
                        </div>
                    </div>
                );
            default:
                return (
                    <div className="content-section">
                        <h2 className="section-title">{menuItems.find(item => item.id === activeSection)?.label}</h2>
                        <p className="coming-soon">Esta seção está em desenvolvimento...</p>
                    </div>
                );
        }
    };

    if (loading) return <div className="loading">Carregando...</div>;
    if (error) return <div className="error">Erro: {error}</div>;

    return (
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
