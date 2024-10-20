import React from 'react';
import { NavLink } from 'react-router-dom';
import './ExploreFood.css';
import { FoodTypes } from '../../assets/assets';

const ExploreFood = () => {
  return (
    <div className='ExploreFood' id='ExploreFood'>
      <h1>Our Products</h1>
      <div className='ExploreFoodList'>
        {FoodTypes.map((item, index) => {
          const path = item.FoodName.toLowerCase().includes('dog') ? '/DogProducts' : '/CatProducts';
          return (
            <div key={index} className='ExploreFoodListItems'>
              <img src={item.FoodTypeImage} alt={item.FoodName} />
              <p>{item.FoodName}</p>
              <NavLink to={path} className='button2'>
                Explore More
              </NavLink>
              <br/>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ExploreFood;
