import React, { useEffect } from 'react';
import { assets } from '../../assets/assets';
import './DogProducts.css';

const DogProducts = () => {
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page when the component is mounted
  }, []);

  return (
    <div className="dog-products">
      <div className="welcomedog-section">
        <div className="welcomedog-text">
          <h1 className="title">Fuel Your Dog's Vitality with NutriPet's Premium Dog Food.</h1>
          <p className="description">Explore the expertise behind our premium dog food, expertly crafted to fuel your dog's boundless energy and ensure their overall well-being. NutriPet is an all-in-one pet food product enriched with the best nutrients, providing a delicious and wholesome meal in every serving.

NutriPet keeps your adult or puppy dog healthy with a shiny coat. Our formula is made with a special fusion of 100% natural ingredients to support your dog's overall health and nourishment. It includes high-quality proteins for muscle development, vitamins for vibrant skin and coat, crude fiber for better digestion, and essential nutrients like Omega 3, Vitamin D, and Calcium for a robust immune system. Additionally, our unique ingredient, Moringa, helps prevent cancer development, making NutriPet the ultimate choice for your dog's nutrition and well-being.</p>
        </div>
        <div className="welcomedog-image">
          <img src={assets.dogproduct} alt="Dog and Cat" />
        </div>
      </div>
    </div>
  );
}

export default DogProducts;
