import "./Mensalidades.css";
import PopUp from "./PopUp";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "../services/authService";

const Mensalidades = ({ name, price, description, features, isCurrentPlan, onPlanChange }) => {
    const [showPopUp, setShowPopUp] = useState(false);
    const navigate = useNavigate();
    
    const handlePlanSelect = () => {
        // Se o usuário já estiver autenticado, trocar de plano
        if (isAuthenticated()) {
            if (isCurrentPlan) {
                // O usuário já está nesse plano
                alert(`Você já está utilizando o plano ${name}.`);
            } else {
                // Confirmar troca de plano
                const confirmChange = window.confirm(`Deseja trocar para o plano ${name}?`);
                if (confirmChange && typeof onPlanChange === 'function') {
                    onPlanChange(name);
                }
            }
        } else {
            // Novo usuário - enviar para formulário de registro com dados do plano
            navigate('/mensalidade-forms', {
                state: {
                    planName: name,
                    planPrice: price,
                    planDescription: description
                }
            });
        }
    };

    return (
        <>
            <div className={`mensalidade-card ${isCurrentPlan ? 'current-plan' : ''}`}>
                {isCurrentPlan && <div className="current-plan-badge">Seu plano atual</div>}
                <h2 className="mensalidade-title">{name}</h2>
                <p className="mensalidade-description">{description}</p>
                <p className="mensalidade-price">{price}</p>
                <button
                    className={`mensalidade-button ${isCurrentPlan ? 'disabled-button' : ''}`}
                    onClick={handlePlanSelect}
                    disabled={isCurrentPlan}
                >
                    {isCurrentPlan ? 'Plano Atual' : 'Selecionar'}
                </button>
                <a
                    href="#"
                    className="mensalidade-link"
                    onClick={e => { e.preventDefault(); setShowPopUp(true); }}
                >
                    O que está incluído?
                </a>
            </div>
            {showPopUp && (
                <PopUp features={features} name={name} onClose={() => setShowPopUp(false)} />
            )}
        </>
    );
};

export default Mensalidades;
