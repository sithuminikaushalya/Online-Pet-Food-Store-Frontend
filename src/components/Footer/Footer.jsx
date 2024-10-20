import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <div className='Footer' id='Footer'>
        <div className='Footer-content'>
            <h2>Contact Us</h2><br/>
            <div className='Social-icons'>
                <a href="https://www.facebook.com/people/Nutri-Pet/61550773566864/" target="_blank" rel="noopener noreferrer">
                    <img className='fb' src={assets.fb} alt="Facebook" />
                </a>
                <a href="https://www.instagram.com/nutripet_lk/" target="_blank" rel="noopener noreferrer">
                    <img className='ig' src={assets.ig} alt="Instagram" />
                </a>
                <a href="https://www.linkedin.com/company/nutripetpvtltd/" target="_blank" rel="noopener noreferrer">
                    <img className='linkedin' src={assets.linkedin} alt="LinkedIn" />
                </a>
            </div>
            <ul>
                <li>+94774903000</li>
                <li>info@nutripet.lk</li>
            </ul>
        </div>
        <hr />
        <p className='Footer-copyright'>Copyright @ 2024 Nutripet - All Right Reserved.</p>
    </div>
  )
}

export default Footer;
