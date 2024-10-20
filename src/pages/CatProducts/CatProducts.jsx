import React, { useEffect } from 'react';
import { assets } from '../../assets/assets';
import './CatProducts.css';

const CatProducts = () => {
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page when the component is mounted
  }, []);

  return (
    <div className="cat-products">
      <div className="welcomecat-section">
        <div className="welcomecat-text">
          <h1 className="title">Elevate Your Cat's Wellness with NutriPet's Premium Cat Food.</h1>
          <p className="description">Uplift your cat's wellness with our thoughtfully crafted cat food, providing balanced nutrition for a vibrant and flourishing life. NutriPet is an all-in-one package enriched with the best nutrients, ensuring your pet cat enjoys a delicious and wholesome meal in every serving.

NutriPet offers a complete and balanced diet tailored for cats. It delivers optimal levels of protein and is fortified with essential vitamins and minerals to support your cat's overall health throughout its lifetime. Our high-quality cat food satisfies hunger between meals with its rich proteins and minerals. Vitamin A enhances the immune system and promotes healthy vision, while our special ingredient 'Moringa' helps prevent the development of cancer, making NutriPet the ideal choice for your feline companion's nutrition and well-being.</p>
        </div>
        <div className="welcomecat-image">
          <img src={assets.catproduct} alt="Dog and Cat" />
        </div>
      </div>
    </div>
  );
}

export default CatProducts;
