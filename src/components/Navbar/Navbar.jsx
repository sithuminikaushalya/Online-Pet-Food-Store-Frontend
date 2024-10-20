import React, { useState, useEffect } from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets.js';
import { Link, useLocation } from 'react-router-dom';

const Navbar = ({ isAuthenticated, user, onLogout, setShowLogin }) => {
  const [menu, setMenu] = useState('');
  const [showConfirmLogout, setShowConfirmLogout] = useState(false);
  const location = useLocation();

  useEffect(() => {
    switch (location.pathname) {
      case '/':
        setMenu('home');
        break;
      case '/DogProducts':
        setMenu('DogProducts');
        break;
      case '/CatProducts':
        setMenu('CatProducts');
        break;
      case '/signin':
        setMenu('Sign in');
        break;
      default:
        setMenu('');
        break;
    }
  }, [location.pathname]);

  const handleSignInClick = () => {
    setShowLogin(true);
    setMenu('Sign in');
  };

  const handleSignOutClick = () => {
    setShowConfirmLogout(true);
  };

  const confirmLogout = () => {
    setShowConfirmLogout(false);
    onLogout();
  };

  const cancelLogout = () => {
    setShowConfirmLogout(false);
  };

  return (
    <>
      <div className='Navbar'>
        <img src={assets.Logo2} alt='Logo' className='Logo2' />
        <ul className='Navbar-menu'>
          <Link
            to='/'
            onClick={() => {
              setMenu('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={menu === 'home' ? 'active' : ''}
          >
            Home
          </Link>
          <Link
            to='/DogProducts'
            onClick={() => {
              setMenu('DogProducts');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={menu === 'DogProducts' ? 'active' : ''}
          >
            Dog Food
          </Link>
          <Link
            to='/CatProducts'
            onClick={() => {
              setMenu('CatProducts');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={menu === 'CatProducts' ? 'active' : ''}
          >
            Cat Food
          </Link>
          <a
            href='#Footer'
            onClick={(e) => {
              e.preventDefault();
              setMenu('Contact Us');
              document.querySelector('#Footer').scrollIntoView({ behavior: 'smooth' });
            }}
            className={menu === 'Contact Us' ? 'active' : ''}
          >
            Contact Info
          </a>
          {isAuthenticated && user ? (
            <li onClick={handleSignOutClick} className='logout-button'>
              Sign Out
            </li>
          ) : (
            <li onClick={handleSignInClick} className={menu === 'Sign in' ? 'active' : ''}>
              Sign In
            </li>
          )}
        </ul>
        <div className='Navbar-right'>
          <img src={assets.Carticon} alt='Cart' className='Carticon' />
          <div className='dot'></div>
        </div>
      </div>

      {showConfirmLogout && (
        <div className='modal-overlay'>
          <div className='modal-content'>
            <h2>Confirm Logout</h2>
            <p>Are you sure you want to sign out?</p>
            <button onClick={confirmLogout}>Yes</button>
            <button onClick={cancelLogout}>No</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
