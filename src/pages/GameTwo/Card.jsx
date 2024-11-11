import React from 'react';

const Card = ({ card, onClick, isFlipped }) => (
  <article className={`card ${isFlipped ? 'flipped' : ''}`} onClick={onClick}>
    <figure className='front' aria-hidden='true'></figure>
    <figure className='back'>
      <img src={card.image} alt={card.name} />
    </figure>
  </article>
);

export default Card;
