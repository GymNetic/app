import React, { useState, useEffect } from 'react';
import './ExCard.css';
import { FaHeart, FaRegHeart, FaPlus } from "react-icons/fa";

const ExCard = ({ name, photo, desc, type }) => {
    const [isLiked, setIsLiked] = useState(false);

    useEffect(() => {
        const favorites = JSON.parse(localStorage.getItem('favoriteExercises') || '[]');
        setIsLiked(favorites.some(ex => ex.name === name));
    }, [name]);

    const handleLike = () => {
        const newLikeState = !isLiked;
        setIsLiked(newLikeState);
        
        const favorites = JSON.parse(localStorage.getItem('favoriteExercises') || '[]');
        
        if (newLikeState) {
            const newFavorite = {
                id: Date.now(),
                name,
                category: type,
                photo,
                desc,
                lastDone: new Date().toISOString().split('T')[0]
            };
            favorites.push(newFavorite);
        } else {
            const index = favorites.findIndex(ex => ex.name === name);
            if (index !== -1) favorites.splice(index, 1);
        }
        
        localStorage.setItem('favoriteExercises', JSON.stringify(favorites));
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
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExCard;