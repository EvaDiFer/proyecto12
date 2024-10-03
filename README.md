<!-- # React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


 -->

import React, { useReducer, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import './GameOne.css';
import { alphabet, words } from './constans';

const MAX_MISTAKES = 7;

const initialState = {
randomWord: '',
rights: new Set(),
wrongs: new Set(),
mistakes: 0,
gameOver: false,
won: false,
};

const reducer = (state, action) => {
switch (action.type) {
case 'START_GAME':
return {
...initialState,
randomWord: action.payload,
};
case 'ADD_RIGHT':
return {
...state,
rights: new Set(state.rights).add(action.payload),
};
case 'ADD_WRONG':
return {
...state,
wrongs: new Set(state.wrongs).add(action.payload),
mistakes: state.mistakes + 1,
};
case 'GAME_OVER':
return { ...state, gameOver: true };
case 'WON':
return { ...state, won: true };
default:
return state;
}
};

const GameOne = () => {
const navigate = useNavigate();
const [state, dispatch] = useReducer(reducer, initialState);

const getRandomWord = () => words[Math.floor(Math.random() * words.length)];

useEffect(() => {
dispatch({ type: 'START_GAME', payload: getRandomWord() });
}, []);

const evaluateGuess = (letter) => {
if (
state.rights.has(letter) ||
state.wrongs.has(letter) ||
state.gameOver
) {
return;
}

    if (state.randomWord.includes(letter)) {
      dispatch({ type: 'ADD_RIGHT', payload: letter });

      if (
        state.randomWord
          .split('')
          .every((l) => state.rights.has(l) || l === letter)
      ) {
        dispatch({ type: 'WON' });
      }
    } else {
      dispatch({ type: 'ADD_WRONG', payload: letter });
      if (state.mistakes + 1 >= MAX_MISTAKES) {
        dispatch({ type: 'GAME_OVER' });
      }
    }

};

const renderWord = () =>
state.randomWord
.split('')
.map((letter, index) => (
<span key={index}>{state.rights.has(letter) ? letter : '\_'}</span>
));

const renderAlphabet = () =>
alphabet.map((letter) => (
<button
key={letter}
onClick={() => evaluateGuess(letter)}
disabled={
state.wrongs.has(letter) || state.rights.has(letter) || state.gameOver
}
aria-label={`Guess the letter: ${letter}`} >
{letter}
</button>
));

const renderHangmanImage = () => (
<img
src={`/img${state.mistakes}.png`}
alt={`Hangman: ${state.mistakes} mistakes`}
className='hangman-image'
/>
);

return (

<div className='GameOne'>
<h1>Hangman</h1>
{renderHangmanImage()}
<h2>
{state.gameOver
? `You lost! The word was: ${state.randomWord}`
: state.won
? `You won! The word was: ${state.randomWord}`
: renderWord()}
</h2>
<h3>Wrong guesses: {Array.from(state.wrongs).join(', ')}</h3>
<div>{renderAlphabet()}</div>
<button
className='custom-button'
onClick={() =>
dispatch({ type: 'START_GAME', payload: getRandomWord() })
} >
Restart
</button>
<Button text='Return to Home' onClick={() => navigate('/')} />
</div>
);
};

export default GameOne;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './GameTwo.css';
import { cards } from './arraycards';

const useCardGame = (initialCards) => {
const [shuffledCards, setShuffledCards] = useState([]);
const [flippedCards, setFlippedCards] = useState([]);
const [matchedCards, setMatchedCards] = useState([]);
const [points, setPoints] = useState(0);
const [isAnimating, setIsAnimating] = useState(false);

// Barajar las cartas al iniciar
useEffect(() => {
const shuffled = initialCards.sort(() => Math.random() - 0.5);
setShuffledCards(shuffled);
}, [initialCards]);

const handleCardClick = (card) => {
if (
flippedCards.length < 2 &&
!flippedCards.includes(card.id) &&
!matchedCards.includes(card.id) &&
!isAnimating
) {
setFlippedCards((prev) => [...prev, card.id]);
}
};

const checkMatch = () => {
const [firstCardId, secondCardId] = flippedCards;
const firstCard = shuffledCards.find((card) => card.id === firstCardId);
const secondCard = shuffledCards.find((card) => card.id === secondCardId);

    if (firstCard.name === secondCard.name) {
      setMatchedCards((prev) => [...prev, firstCard.id, secondCard.id]);
      setPoints((prev) => prev + 1);
      setFlippedCards([]);
    } else {
      setIsAnimating(true);
      setTimeout(() => {
        setFlippedCards([]);
        setIsAnimating(false);
      }, 1000);
    }

};

useEffect(() => {
if (flippedCards.length === 2) {
checkMatch();
}
}, [flippedCards]);

const resetGame = () => {
const shuffled = initialCards.sort(() => Math.random() - 0.5);
setShuffledCards(shuffled);
setFlippedCards([]);
setMatchedCards([]);
setPoints(0);
};

return {
shuffledCards,
flippedCards,
matchedCards,
points,
handleCardClick,
resetGame,
};
};

const Card = ({ card, onClick, isFlipped }) => (

  <div className={`card ${isFlipped ? 'flipped' : ''}`} onClick={onClick}>
    <div className='front'></div>
    <div className='back'>
      <img src={card.image} alt={card.name} />
    </div>
  </div>
);

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

return (
<div className='GameTwo'>
<h1>Memory Game</h1>
<h3>Puntos: {points}</h3>
<div className='cards-container'>{renderCards()}</div>
{matchedCards.length === shuffledCards.length && <h2>¡Ganaste!</h2>}
<button className='custom-button ' onClick={resetGame}>
Restart
</button>
<button className='custom-button' onClick={() => navigate('/')}>
Return to Home
</button>
</div>
);
};

export default GameTwo;
