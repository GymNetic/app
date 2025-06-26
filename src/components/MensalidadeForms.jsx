import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { SlArrowLeft } from "react-icons/sl";
import "./MensalidadeForms.css";
import apiService from "../services/apiService";

function MensalidadeForms() {
    const navigate = useNavigate();
    const location = useLocation();
    const planData = location.state || { planName: "Plano Básico", planPrice: "€29,99/mês", planDescription: "Plano Padrão" };

    const [formData, setFormData] = useState({
        name: "",
        sobrenome: "",
        email: "",
        telefone: "",
        datanasc: "",
        morada: "",
        password: "",
        confirmPassword: "",
        termos: false
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [showPasswordFields, setShowPasswordFields] = useState(false);

    const handleGoBack = (e) => {
        e.preventDefault();
        navigate('/mensalidade-forms');
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!showPasswordFields) {
            setShowPasswordFields(true);
            return;
        }

        // Validações de password
        if (formData.password !== formData.confirmPassword) {
            setError("Os códigos de acesso não coincidem.");
            return;
        }
        if (formData.password.length < 6) {
            setError("O código de acesso deve ter pelo menos 6 caracteres.");
            return;
        }

        try {
            setLoading(true);
            setError("");

            const userData = {
                email: formData.email,
                password: formData.password,
                confirmPassword: formData.confirmPassword,
                nome: `${formData.name} ${formData.sobrenome}`
            };

            const response = await apiService.auth.register(userData);

            if (response.message) {
                alert(response.message);
                navigate('/login');
            } else {
                throw new Error("Falha ao registrar usuário.");
            }
        } catch (error) {
            setError(error.message || "Falha ao criar a conta. Por favor, tente novamente.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mensalidade-forms">
            <h1>Mensalidades</h1>
            <div className="mensalidade-forms-text">
                <p>Selecionaste este plano: {planData.planName}</p>
                <p>{showPasswordFields ? "Cria a tua senha para finalizares a adesão" : "Insere as tuas informações"}</p>
            </div>

            {error && (
                <div className="error-message">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                {!showPasswordFields ? (
                    <>
                        <div className="mensalidade-forms-container">
                            <div className="mensalidade-forms-input1">
                                <label htmlFor="name">Nome</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                                <label htmlFor="datanasc">Data de Nascimento</label>
                                <input
                                    type="date"
                                    id="datanasc"
                                    name="datanasc"
                                    value={formData.datanasc}
                                    onChange={handleChange}
                                    placeholder="dd-mm-aaaa"
                                    required
                                />
                            </div>
                            <div className="mensalidade-forms-input2">
                                <label htmlFor="sobrenome">Sobrenome</label>
                                <input
                                    type="text"
                                    id="sobrenome"
                                    name="sobrenome"
                                    value={formData.sobrenome}
                                    onChange={handleChange}
                                    required
                                />
                                <label htmlFor="telefone">Telefone</label>
                                <input
                                    type="tel"
                                    id="telefone"
                                    name="telefone"
                                    value={formData.telefone}
                                    onChange={handleChange}
                                    required
                                />
                                <label htmlFor="morada">Morada</label>
                                <input
                                    type="text"
                                    id="morada"
                                    name="morada"
                                    value={formData.morada}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="password-creation-form">
                        <div className="password-fields">
                            <div className="input-group">
                                <label htmlFor="password">Cria o teu Código de Acesso</label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                    minLength="6"
                                    placeholder="Mínimo de 6 caracteres"
                                />
                            </div>
                            <div className="input-group">
                                <label htmlFor="confirmPassword">Confirma o teu Código de Acesso</label>
                                <input
                                    type="password"
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    required
                                    minLength="6"
                                    placeholder="Repete o código de acesso"
                                />
                            </div>
                        </div>
                        <div className="plan-summary">
                            <h3>Resumo do Plano</h3>
                            <div className="plan-details">
                                <p><strong>Plano:</strong> {planData.planName}</p>
                                <p><strong>Preço:</strong> {planData.planPrice}</p>
                                <p><strong>Descrição:</strong> {planData.planDescription}</p>
                            </div>
                        </div>
                    </div>
                )}

                <div className="mensalidade-forms-checkbox">
                    <input
                        type="checkbox"
                        id="termos"
                        name="termos"
                        checked={formData.termos}
                        onChange={handleChange}
                        required
                    />
                    <label htmlFor="termos">
                        Aceito os Termos de Uso e Política de Privacidade
                    </label>
                </div>

                <div className="mensalidade-forms-div">
                    <div className="mensalidade-forms-button">
                        <button type="submit" disabled={loading}>
                            {loading ? "PROCESSANDO..." : (showPasswordFields ? "CRIAR CONTA" : "CONTINUAR")}
                        </button>
                    </div>
                    <div className="mensalidade-forms-back">
                        <SlArrowLeft />
                        <a
                            href="#"
                            className="mensalidade-link"
                            onClick={showPasswordFields ?
                                (e) => {
                                    e.preventDefault();
                                    setShowPasswordFields(false);
                                } :
                                handleGoBack}
                        >
                            {showPasswordFields ? "VOLTAR AOS DADOS PESSOAIS" : "VOLTAR AOS PLANOS"}
                        </a>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default MensalidadeForms;