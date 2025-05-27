import React from "react";
import "./PopUp.css";
import { useNavigate } from "react-router-dom";

const PopUp = ({ features, name, onClose }) => {
  if (!features) return null;
  const navigate = useNavigate();

  const handlePlanSelect = () => {
    navigate('/mensalidade-forms', { 
      state: { 
        planName: name
      } 
    });
    onClose(); // Close popup after navigation
  };

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-content" onClick={e => e.stopPropagation()}>
        <button className="popup-x" onClick={onClose} aria-label="Fechar popup">×</button>
        <h3>PLANO DE MENSALIDADE</h3>
        <h4>{name}</h4>
        <ul>
          {features.map((feature, idx) => (
            <li key={idx}>{feature}</li>
          ))}
        </ul>
        <button className="popup-select" onClick={handlePlanSelect}>Selecionar</button>
      </div>
    </div>
  );
};

export default PopUp;