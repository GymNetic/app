import React from 'react';
import { Link } from 'react-router-dom';
import './HorizontalCard.css';

const HorizontalCard = ({ title, link, description, buttonText, videoLabel, index = 0 }) => {
  const isOdd = index % 2 !== 0;

  return (
      <div className="hc-container">
        <div className={`hc-content ${!isOdd ? 'hc-reverse' : ''}`}>
          <div className="hc-text-section">
            <h1 className="hc-title">{title || 'Example Title'}</h1>
            <p className="hc-description">{description || 'This is an example description for the horizontal card component.'}</p>
            <Link to={link || '/'} className="hc-more-button">
              {buttonText || 'MAIS'}
            </Link>
          </div>

          <div className="hc-video-placeholder">
            <div className="hc-play-icon">▶</div>
            <span className="hc-video-label">{videoLabel || 'VÍDEO EXEMPLO'}</span>
          </div>
        </div>
      </div>
  );
};

export default HorizontalCard;
