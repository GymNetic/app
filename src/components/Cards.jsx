import { useState } from 'react';
import './Cards.css';

const Card = ({ title, description, imageUrl, hasArrow }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="card-image-container">
        <div className="card-overlay"></div>
        <img 
          src={imageUrl} 
          alt={title} 
          className={`card-image ${isHovered ? 'card-image-hover' : ''}`} 
        />
      </div>
      <div className="card-content">
        <h2 className="card-title">{title}</h2>
        {description && isHovered && (
          <p className="card-description">{description}</p>
        )}
        {hasArrow && isHovered && (
          <div className="card-arrow">
            <svg 
              width="32" 
              height="32" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </div>
        )}
      </div>
    </div>
  );
};

export default function Cards() {
  const cards = [
    {
      title: "Horário",
      imageUrl: "/Imgs/gymcard1.jpg",
      description: "Consulta o nosso horário completo de aulas e planeia a tua rotina de treinos.",
      hasArrow: true
    },
    {
      title: "Aulas",
      imageUrl: "/Imgs/gymcard2.jpg",
      description: "As nossas aulas contam com o melhor equipamento para levar o teu treino mais longe!",
      hasArrow: true
    },
    {
      title: "Mensalidades",
      imageUrl: "/Imgs/gymcard3.jpg",
      description: "Junta-te a nós hoje e muda a tua rotina de exercícios!",
      hasArrow: true
    }
  ];

  return (
    <div className="cards-container">
      <div className="cards-wrapper">
        {cards.map((card, index) => (
          <Card 
            key={index} 
            title={card.title} 
            description={card.description} 
            imageUrl={card.imageUrl}
            hasArrow={card.hasArrow}
          />
        ))}
      </div>
    </div>
  );
}