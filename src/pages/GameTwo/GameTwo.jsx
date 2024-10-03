import React from 'react';
import { useNavigate } from 'react-router-dom';
import './GameTwo.css';
import { cards } from './arraycards';
import useCardGame from './UserCardGame';
import Score from './Score';
import CardContainer from './CardContainer';

const GameTwo = () => {
  const navigate = useNavigate();
  const {
    shuffledCards,
    flippedCards,
    matchedCards,
    points,
    handleCardClick,
    resetGame,
  } = useCardGame(cards);

  return (
    <div className='GameTwo'>
      <h1>Memory Game</h1>
      <Score points={points} />
      <CardContainer
        shuffledCards={shuffledCards}
        flippedCards={flippedCards}
        matchedCards={matchedCards}
        handleCardClick={handleCardClick}
      />
      {matchedCards.length === shuffledCards.length && <h2>¡Ganaste!</h2>}
      <button className='custom-button' onClick={resetGame}>
        Restart
      </button>
      <button className='custom-button' onClick={() => navigate('/')}>
        Return to Home
      </button>
    </div>
  );
};

export default GameTwo;
