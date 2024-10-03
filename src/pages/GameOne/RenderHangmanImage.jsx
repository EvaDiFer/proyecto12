const RenderHangmanImage = ({ mistakes }) => (
  <img
    src={`/img${mistakes}.png`}
    alt={`Hangman: ${mistakes} mistakes`}
    className='hangman-image'
  />
);

export default RenderHangmanImage;
