import React from 'react';

const Card = ({ card, onClick, isFlipped }) => (
  <div className={`card ${isFlipped ? 'flipped' : ''}`} onClick={onClick}>
    <div className='front'></div>
    <div className='back'>
      <img src={card.image} alt={card.name} />
    </div>
  </div>
);

export default Card;
