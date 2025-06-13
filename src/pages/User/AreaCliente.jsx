import React, { useState, useEffect } from "react";
import "./AreaCliente.css";

function AreaCliente() {
    const [client, setClient] = useState(null);
    const [editing, setEditing] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function fetchClient() {
            setLoading(true);
            setError("");
            try {
                const response = await fetch("/api/cliente"); // ajuste o endpoint conforme necessário
                if (!response.ok) throw new Error("Erro ao buscar dados do cliente");
                const data = await response.json();
                setClient(data);
                setName(data.name);
                setEmail(data.email);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        fetchClient();
    }, []);

    const handleEdit = async (e) => {
        e.preventDefault();
        // Aqui pode adicionar chamada para atualizar na API se desejar
        setClient({ ...client, name, email });
        setEditing(false);
    };

    if (loading) return <div>Carregando...</div>;
    if (error) return <div>Erro: {error}</div>;

    return (
        <div className="area-cliente">
            <h1>Área do Cliente</h1>
            {!editing ? (
                <div className="client-info">
                    <p><strong>Nome:</strong> {client.name}</p>
                    <p><strong>Email:</strong> {client.email}</p>
                    <button onClick={() => setEditing(true)}>Editar Dados</button>
                </div>
            ) : (
                <form onSubmit={handleEdit} className="edit-form">
                    <input
                        type="text"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        required
                    />
                    <input
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                    />
                    <button type="submit">Salvar</button>
                    <button type="button" onClick={() => setEditing(false)}>Cancelar</button>
                </form>
            )}
        </div>
    );
}

export default AreaCliente;