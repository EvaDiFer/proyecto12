export const RenderAlphabet = ({
  alphabet,
  evaluateGuess,
  rights,
  wrongs,
  gameOver,
}) => (
  <div>
    {alphabet.map((letter) => (
      <button
        key={letter}
        onClick={() => evaluateGuess(letter)}
        disabled={wrongs.has(letter) || rights.has(letter) || gameOver}
        aria-label={`Guess the letter: ${letter}`}
      >
        {letter}
      </button>
    ))}
  </div>
);

export default RenderAlphabet;
