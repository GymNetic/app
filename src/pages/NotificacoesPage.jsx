import { useState, useEffect } from "react";
import { notificacoes as notificacoesData } from "../data/notificacoesData";
import "./NotificacoesPage.css";

export default function NotificacoesPage() {
    const [notificacoes, setNotificacoes] = useState(() => {
        const savedNotificacoes = localStorage.getItem('notificacoes');
        return savedNotificacoes ? JSON.parse(savedNotificacoes) : notificacoesData.map(n => ({...n, lida: false}));
    });

    useEffect(() => {
        localStorage.setItem('notificacoes', JSON.stringify(notificacoes));
        // Dispara um evento customizado para atualizar o header
        window.dispatchEvent(new Event('notificacoesAtualizadas'));
    }, [notificacoes]);

    const toggleLida = (id) => {
        const notificacoesAtualizadas = notificacoes.map((notificacao) =>
            notificacao.id === id
                ? { ...notificacao, lida: !notificacao.lida }
                : notificacao
        );
        setNotificacoes(notificacoesAtualizadas);
    };

    return (
        <div className="notificacoes-container">
            <h1 className="notificacoes-title">Notificações</h1>
            <div>
                {notificacoes.map((notificacao) => (
                    <div
                        key={notificacao.id}
                        className={`notificacao-card ${
                            notificacao.lida ? "notificacao-lida" : "notificacao-nao-lida"
                        }`}
                        onClick={() => toggleLida(notificacao.id)}
                    >
                        <div className="notificacao-header">
                            <h2 className="notificacao-titulo">{notificacao.titulo}</h2>
                        </div>
                        <p className="notificacao-descricao">{notificacao.descricao}</p>
                        <span className="notificacao-hora">{notificacao.hora}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}