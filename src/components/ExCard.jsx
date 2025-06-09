import React, { useState } from 'react';
import './ExCard.css';
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";

const ExCard = ({ name, photo, desc, type }) => {
    const [isLiked, setIsLiked] = useState(false);

    const handleLike = () => {
        setIsLiked(!isLiked);
    };

    const handleAddToTraining = () => {
        // Função a implementar para adicionar ao plano de treino
        console.log(`Exercício ${name} adicionado ao plano de treino`);
    };

    return (
        <div className="ex-card-container">
            <div className="ex-card-out">
                <div className="ex-card">
                    <div className="ex-card-image">
                        <img src={photo} alt={name} />
                    </div>
                    <div className="ex-card-content">
                        <div className="ex-card-header">
                            <h3>{name}</h3>
                            <button
                                className="like-button"
                                onClick={handleLike}
                            >
                                <span className={isLiked ? "like-icon liked" : "like-icon"}>
                                    {isLiked ? <FaHeart /> : <FaRegHeart />}
                                </span>
                                <span className="like-text">
                                    {isLiked ? 'Exercício Guardado' : 'Guardar Exercício'}
                                </span>
                            </button>
                        </div>
                        <div className="ex-card-type">
                            <span className="ex-card-type-label">Zona de Treino: </span>
                            <span>{type}</span>
                        </div>
                        <div className="ex-card-desc">
                            <span className="ex-card-desc-label">Passos: </span>
                            <span>{desc}</span>
                        </div>
                        <div className="ex-card-actions">

                        </div>
                    </div>
                </div>
                <button
                    className="add-to-plan-button"
                    onClick={handleAddToTraining}
                >
                    <FaPlus /> Adicionar ao Plano
                </button>
            </div>
        </div>
    );
};

export default ExCard;