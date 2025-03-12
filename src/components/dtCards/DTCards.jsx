import React from "react";
import './dtCards.css';

const cardsData = [
  {
    title: "Chest X-ray",
    description: "Most common method",
    emoji: "🩻",
    category: "diagnosis",
  },
  {
    title: "Blood & sputum tests",
    description: "To identify infection type",
    emoji: "🩸",
    category: "diagnosis",
  },
  {
    title: "Pulse oximetry",
    description: "To check oxygen levels",
    emoji: "❤️",
    category: "diagnosis",
  },
  {
    title: "Vaccination",
    description: "Pneumococcal & flu shots",
    emoji: "💉",
    category: "treatment",
  },
  {
    title: "Good hygiene",
    description: "Wash hands, avoid smoking",
    emoji: "🪥",
    category: "treatment",
  },
  {
    title: "Rest & hydration",
    description: "Sleep well, stay hydrated",
    emoji: "🥤",
    category: "treatment",
  },
  {
    title: "Antibiotics",
    description: "For bacterial pneumonia",
    emoji: "💊",
    category: "treatment",
  },
];

const DTCards = () => {
  return (
    <div className="cards-container">
      <h1>How is Pneumonia Diagnosed?</h1>
      <div className="cards">
        {cardsData
          .filter((card) => card.category === "diagnosis")
          .map((card, index) => (
            <div key={index} className="card diagnosis">
              <span className="emoji">{card.emoji}</span>
              <div>
                <strong>{card.title}</strong>
                <p>{card.description}</p>
              </div>
            </div>
          ))}
      </div>

      <h1>Prevention & Treatment</h1>
      <div className="cards">
        {cardsData
          .filter((card) => card.category === "treatment")
          .map((card, index) => (
            <div key={index} className="card treatment">
              <span className="emoji">{card.emoji}</span>
              <div>
                <strong>{card.title}</strong>
                <p>{card.description}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default DTCards;
