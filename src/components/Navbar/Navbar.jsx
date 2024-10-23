import React, { useState, useEffect, useContext } from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets.js';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext.jsx';

const Navbar = ({ isAuthenticated, user, onLogout, setShowLogin }) => {
  const [menu, setMenu] = useState('');
  const [showConfirmLogout, setShowConfirmLogout] = useState(false);
  const location = useLocation();
  const navigate = useNavigate(); // Use navigate for redirection
  const { setUser } = useContext(StoreContext);

  useEffect(() => {
    if (user) {
      setUser(user); // Send user data to StoreContext
    }
  }, [user, setUser]);

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
      case '/myorders': // Add case for My Orders
        setMenu('My Orders');
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
    onLogout(); // Trigger the logout functionality (like clearing tokens)
    navigate('/'); // Redirect to the home page
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Smooth scroll to top
    window.location.reload(); // Force page reload to refresh cart state
  };

  const cancelLogout = () => {
    setShowConfirmLogout(false);
  };

  const handleCartClick = () => {
    if (isAuthenticated) {
      navigate('/cart');
    } else {
      setShowLogin(true); // Show login popup if not authenticated
    }
  };

  const handleOrdersClick = () => {
    if (isAuthenticated) {
      window.scrollTo({ top: 0, behavior: 'smooth' });  // Smooth scroll to top
      navigate('/myorders');
    } else {
      setShowLogin(true); // Show login popup if not authenticated
    }
  };

  return (
    <>
      <div className='Navbar'>
        <Link to='/'><img src={assets.Logo2} alt='Logo' className='Logo2' /></Link>
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
            <>
              <li className='user-info'>
                Welcome, {user.name}!
              </li>
              <li onClick={handleSignOutClick} className='logout-button'>
                Sign Out
              </li>
            </>
          ) : (
            <li onClick={handleSignInClick} className={menu === 'Sign in' ? 'active' : ''}>
              Sign In
            </li>
          )}
        </ul>
        <div className='Navbar-right'>
          <div onClick={handleCartClick}>  {/* Handle cart click with authentication check */}
            <img src={assets.Carticon} alt='Cart' className='Carticon' />
          </div>
          <div onClick={handleOrdersClick}>  {/* Handle orders click with authentication check */}
            <img src={assets.order} alt='Orders' className='order-icon' /> {/* Add Order Icon */}
          </div>
          <div className="dot"></div>
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
