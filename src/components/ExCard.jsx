import React, { useState } from 'react';
import './ExCard.css';

const ExCard = ({ name, photo, desc, type }) => {
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  return (
    <div className="ex-card">
      <div className="ex-card-image">
        <img src={photo} alt={name} />
      </div>
      <div className="ex-card-content">
        <div className="ex-card-header">
          <h3>{name}</h3>
          <span className="ex-card-type">{type}</span>
        </div>
        <p className="ex-card-desc">{desc}</p>
        <button
          className={`like-button ${isLiked ? 'liked' : ''}`}
          onClick={handleLike}
        >
          {isLiked ? '❤️' : '🤍'} {isLiked ? 'Favoritado' : 'Favoritar'}
        </button>
      </div>
    </div>
  );
};

export default ExCard;