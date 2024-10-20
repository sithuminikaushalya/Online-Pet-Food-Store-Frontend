import React from 'react';
import './Header.css';
import { assets } from '../../assets/assets';

const Header = () => {
  return (
    <div className='Header'>
      <div className='Header-content'>
        <div className='Upper-side'>
          <img src={assets.Headerimg} alt="Header" className='Headerimg' />
          <p className='description'>            
        Ensure your pet stays healthy and shiny with NutriPet, providing the best nutrition for their vibrant life!          </p>
        </div>
        <div className='Bottom-side'>
          <h1>
            Our furry friends deserve only the best things in this world. Treat them purr-fect treats!
          </h1>
        </div>
      </div>
      <img src={assets.dogfood} alt="Home Bottom" className='HomeBottomImg' />
    </div>
  );
};

export default Header;
