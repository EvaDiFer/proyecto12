export const RenderWord = ({ randomWord, rights }) => (
  <h2>
    {randomWord.split('').map((letter, index) => (
      <span key={index}>{rights.has(letter) ? letter : '_'}</span>
    ))}
  </h2>
);

export default RenderWord;
