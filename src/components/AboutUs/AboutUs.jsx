import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AboutUs.css';
import { assets } from '../../assets/assets.js'; 

const AboutUs = () => {
  const navigate = useNavigate();

  const handleLearnMoreClick = () => {
    navigate('/about_us');
    window.scrollTo(0, 0); 
  };

  return (
    <div className="about-us-container">
      <br/>
      <h1 className="about-us-title">About Us</h1>
      <div className="about-us-content">
        <img src={assets.aboutus} alt="About Us" className="about-us-image" />
        <div className="about-us-text">
          <p>
            <br/><br/>
            Welcome to NutriPet, where we focus exclusively on ensuring the happiness and health of your dogs and cats through our premium selection of dog and cat foods. As a proud member of City Health Imports, NutriPet is committed to providing safe and effective nutrition tailored specifically for your beloved pets.
          </p>
          <p>
          Our team at NutriPet is passionate about delivering products that promote the well-being of your furry companions. With a dedication to quality and safety, we offer a range of meticulously crafted dog and cat foods that meet the highest standards of nutrition, ensuring your pets thrive and stay vibrant throughout their lives.
          </p>
          <br/>
          <button className='button' onClick={handleLearnMoreClick}>Learn More</button>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
