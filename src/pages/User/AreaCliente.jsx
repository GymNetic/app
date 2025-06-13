import React, { useState, useEffect } from "react";
import { User, Heart, Calendar, Settings, BarChart3, BookOpen, CreditCard, Bell } from "lucide-react";
import "./AreaCliente.css";

function AreaCliente() {
    const [client, setClient] = useState(null);
    const [editing, setEditing] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [activeSection, setActiveSection] = useState("conta");

    // Dados mock para demonstração
    const [favoriteExercises] = useState([
        { id: 1, name: "Flexão de Braço", category: "Peito", lastDone: "2024-01-10" },
        { id: 2, name: "Agachamento", category: "Pernas", lastDone: "2024-01-09" },
        { id: 3, name: "Prancha", category: "Core", lastDone: "2024-01-08" }
    ]);

    const [workouts] = useState([
        { id: 1, name: "Treino A - Peito e Tríceps", date: "2024-01-10", duration: "45min" },
        { id: 2, name: "Treino B - Costas e Bíceps", date: "2024-01-09", duration: "50min" },
        { id: 3, name: "Treino C - Pernas", date: "2024-01-08", duration: "60min" }
    ]);

    const menuItems = [
        { id: "conta", label: "Minha Conta", icon: User },
        { id: "favoritos", label: "Exercícios Favoritos", icon: Heart },
        { id: "historico", label: "Histórico de Treinos", icon: Calendar },
        { id: "progresso", label: "Meu Progresso", icon: BarChart3 },
        { id: "planos", label: "Planos de Treino", icon: BookOpen },
        { id: "pagamento", label: "Pagamentos", icon: CreditCard },
        { id: "notificacoes", label: "Notificações", icon: Bell },
        { id: "configuracoes", label: "Configurações", icon: Settings }
    ];

    useEffect(() => {
        async function fetchClient() {
            setLoading(true);
            setError("");
            try {
                // Simulando uma chamada à API
                setTimeout(() => {
                    const mockData = {
                        name: "João Silva",
                        email: "joao.silva@email.com",
                        phone: "(11) 99999-9999",
                        birthDate: "1990-05-15",
                        memberSince: "2023-01-15"
                    };
                    setClient(mockData);
                    setName(mockData.name);
                    setEmail(mockData.email);
                    setLoading(false);
                }, 1000);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        }
        fetchClient();
    }, []);

    const handleEdit = (e) => {
        if (e) e.preventDefault();
        setClient({ ...client, name, email });
        setEditing(false);
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
                                <button className="btn-primary" onClick={() => setEditing(true)}>
                                    Editar Dados
                                </button>
                            </div>
                        ) : (
                            <div className="edit-form">
                                <div className="form-group">
                                    <label>Nome:</label>
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={e => setName(e.target.value)}
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
                                        <Heart className="heart-icon filled" size={20} />
                                    </div>
                                    <p className="exercise-category">{exercise.category}</p>
                                    <p className="exercise-last">Último treino: {exercise.lastDone}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                );

            case "historico":
                return (
                    <div className="content-section">
                        <h2 className="section-title">Histórico de Treinos</h2>
                        <div className="workout-list">
                            {workouts.map(workout => (
                                <div key={workout.id} className="workout-card">
                                    <div className="workout-info">
                                        <h3>{workout.name}</h3>
                                        <p className="workout-date">{workout.date}</p>
                                        <p className="workout-duration">Duração: {workout.duration}</p>
                                    </div>
                                    <button className="btn-outline">Ver Detalhes</button>
                                </div>
                            ))}
                        </div>
                    </div>
                );

            case "progresso":
                return (
                    <div className="content-section">
                        <h2 className="section-title">Meu Progresso</h2>
                        <div className="progress-stats">
                            <div className="stat-card">
                                <h3>Treinos Este Mês</h3>
                                <p className="stat-number">12</p>
                            </div>
                            <div className="stat-card">
                                <h3>Horas Treinadas</h3>
                                <p className="stat-number">18h</p>
                            </div>
                            <div className="stat-card">
                                <h3>Exercícios Favoritos</h3>
                                <p className="stat-number">{favoriteExercises.length}</p>
                            </div>
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