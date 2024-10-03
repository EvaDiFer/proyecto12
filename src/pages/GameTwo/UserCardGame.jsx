import { useState, useEffect } from 'react';

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

export default useCardGame;
