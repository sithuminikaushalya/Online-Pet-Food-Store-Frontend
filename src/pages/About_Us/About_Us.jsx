import React from 'react';
import './About_Us.css';
import { assets } from '../../assets/assets.js';

const About_Us = () => {
  console.log('Image sources:', assets.dogcat, assets.dogcathover); 

  return (
    <div className="about-us-container">
      <div className="welcome-section">
        <div className="welcome-text">
          <h1 className="title">NutriPet is Your Pet's Best Choice for Nourishment, Health, and Happiness Guaranteed!</h1><br/>
          <p className="description">NutriPet is an all-in-one pet food product enriched with the best nutrients. At NutriPet, our passion for pets drives everything we do. We're dedicated to crafting premium pet food that ensures your furry companions live their happiest, healthiest lives. We believe in transparency, quality ingredients, and meticulous care in formulating recipes that cater to your pet's unique nutritional needs. Join us in our commitment to providing superior nutrition for your beloved pets.</p>
        </div>
        <div className="welcome-image">
        <img src={assets.doggfood1} alt="Dog and Cat" />
        </div>
      </div>
      <div className="vision-mission">
        <div className="vision section">
          <h2>Vision</h2>
          <p>At NutriPet, we aspire to be the trusted global leader in premium pet nutrition, enhancing the lives of pets and their families worldwide.</p>
        </div>
        <div className="mission section">
          <h2>Mission</h2>
          <p>Our mission is to create superior cat and dog food through relentless innovation, delivering optimal nutrition for pets' health, longevity, and happiness.</p>
        </div>
      </div>

      <div className="dogcat-hover-container">
        <img src={assets.dogcathover} alt="Dog and Cat Hover" />
      </div>

      <div className="quality-policy section">
        <h2>Quality Policy</h2>
        <ul>
          <li><strong>Premium Ingredients:</strong> NutriPet sources only top-tier, natural components, ensuring the highest quality standards for every pet food recipe we produce.</li>
          <li><strong>Scientific Formulation:</strong> Our recipes are meticulously crafted, backed by scientific research to guarantee optimal nutrition and health benefits for your pets.</li>
          <li><strong>Transparency & Trust:</strong> NutriPet maintains unwavering transparency, providing clear information about ingredient sources and processes, fostering trust with pet owners.</li>
          <li><strong>Diverse Dietary Solutions:</strong> We offer a diverse range of pet food options, including grain-free and specialized diets, catering to various pet dietary needs and preferences.</li>
          <li><strong>Customer-Centric Approach:</strong> NutriPet prioritizes customer satisfaction, providing support and guidance for seamless transitions to our products, ensuring pets' well-being.</li>
          <li><strong>Continuous Improvement:</strong> We are committed to continuous improvement, striving to elevate pet nutrition standards through innovation and consistent product enhancement.</li>
        </ul>
      </div>
    </div>
  );
};

export default About_Us;
