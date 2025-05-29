import React from "react";
import "./simplePopUp.css";
import { useNavigate } from "react-router-dom";

const SimplePopUp = ({onClose }) => {

    const navigate = useNavigate();
    return (
        <div className="popup-overlay" onClick={onClose}>
            <div className="popup-content" onClick={e => e.stopPropagation()}>
                <button className="popup-x" onClick={onClose} aria-label="Fechar popup">×</button>
                <h3>CÓDIGOS DE ACESSO</h3>
                <p>O código de acesso é um código único que permite o acesso a áreas restritas do site, como a área de utilizador ou planos de mensalidade.</p>
            </div>
        </div>
    );
};

export default SimplePopUp;