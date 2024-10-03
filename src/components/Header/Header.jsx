import React from 'react';
import Button from '../../components/Button/Button';
import { useNavigate } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const navigate = useNavigate();

  return (
    <div className='Header'>
      <h1 className='title'>Playground of Games</h1>
      <Button text='Hangman' onClick={() => navigate('/gameone')} />
      <Button text='Memory Game' onClick={() => navigate('/gametwo')} />
      <p>
        Proyecto 12 para Rock
        <span style={{ fontWeight: 'bold', textTransform: 'none' }}>
          {'{' + 'theCode' + '}'}
        </span>
      </p>
    </div>
  );
};

export default Header;
