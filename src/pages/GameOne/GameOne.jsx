import React, { useReducer, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import './GameOne.css';
import RenderWord from './RenderWord';
import RenderAlphabet from './RenderAlphabet';
import RenderHangmanImage from './RenderHangmanImage';
import { initialState, reducer } from './GameReducer';
import { alphabet, words } from './constans';

const MAX_MISTAKES = 7;

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

  return (
    <div className='GameOne'>
      <h1>Hangman</h1>
      <RenderHangmanImage mistakes={state.mistakes} />

      {/* Separamos los mensajes y el componente RenderWord */}
      {state.gameOver ? (
        <h2>You lost! The word was: {state.randomWord}</h2>
      ) : state.won ? (
        <h2>You won! The word was: {state.randomWord}</h2>
      ) : (
        <div className='contain-word'>
          <h2>Guess the word:</h2>
          <RenderWord randomWord={state.randomWord} rights={state.rights} />
        </div>
      )}

      <h3>Wrong guesses: {Array.from(state.wrongs).join(', ')}</h3>

      {!state.gameOver && !state.won && (
        <RenderAlphabet
          alphabet={alphabet}
          evaluateGuess={evaluateGuess}
          rights={state.rights}
          wrongs={state.wrongs}
          gameOver={state.gameOver}
        />
      )}

      <button
        className='custom-button'
        onClick={() =>
          dispatch({ type: 'START_GAME', payload: getRandomWord() })
        }
      >
        Restart
      </button>

      <Button text='Return to Home' onClick={() => navigate('/')} />
    </div>
  );
};

export default GameOne;
