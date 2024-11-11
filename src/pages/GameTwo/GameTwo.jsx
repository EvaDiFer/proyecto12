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
      <header>
        <h1>Memory Game</h1>
      </header>

      <main>
        <section>
          <Score points={points} />
        </section>

        <section>
          <CardContainer
            shuffledCards={shuffledCards}
            flippedCards={flippedCards}
            matchedCards={matchedCards}
            handleCardClick={handleCardClick}
          />
          {matchedCards.length === shuffledCards.length && <h2>¡Ganaste!</h2>}
        </section>
      </main>

      <footer>
        <button className='custom-button' onClick={resetGame}>
          Restart
        </button>

        <button className='custom-button' onClick={() => navigate('/')}>
          Return to Home
        </button>
      </footer>
    </div>
  );
};

export default GameTwo;
