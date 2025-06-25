import "./Mensalidades.css";
import PopUp from "./PopUp";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Mensalidades = ({ name, price, description, features }) => {
    const [showPopUp, setShowPopUp] = useState(false);
        const navigate = useNavigate(); // Adicione esta linha
    const handlePlanSelect = () => {
        // You can pass plan details as state to access them in the forms page
        navigate('/mensalidade-forms', {
            state: {
                planName: name,
                planPrice: price,
                planDescription: description
            }
        });
    };

    return (
        <>
            <div className="mensalidade-card">
                <h2 className="mensalidade-title">{name}</h2>
                <p className="mensalidade-description">{description}</p>
                <p className="mensalidade-price">{price}</p>
                <button
                    className="mensalidade-button"
                    onClick={handlePlanSelect}
                >
                    Selecionar
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