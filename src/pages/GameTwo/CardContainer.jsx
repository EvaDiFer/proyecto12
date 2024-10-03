import React from 'react';
import Card from './Card';

const CardContainer = ({
  shuffledCards,
  flippedCards,
  matchedCards,
  handleCardClick,
}) => {
  const renderCards = () =>
    shuffledCards.map((card) => (
      <Card
        key={card.id}
        card={card}
        onClick={() => handleCardClick(card)}
        isFlipped={
          flippedCards.includes(card.id) || matchedCards.includes(card.id)
        }
      />
    ));

  return <div className='cards-container'>{renderCards()}</div>;
};

export default CardContainer;
