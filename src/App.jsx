import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar/Navbar.jsx';
import { Route, Routes } from 'react-router-dom';
import Cart from './pages/Cart/Cart.jsx';
import PlaceOrder from './pages/PlaceOrder/PlaceOrder.jsx';
import Home from './pages/Home/Home.jsx';
import Signin from './components/Auth/Sign in/Signin.jsx';
import Footer from './components/Footer/Footer.jsx';
import LoginPopup from './components/LoginPopup/LoginPopup.jsx';
import About_Us from './pages/About_Us/About_Us.jsx';
import DogProducts from './pages/DogProducts/DogProducts.jsx';
import CatProducts from './pages/CatProducts/CatProducts.jsx';

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/user');
      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }
      const userData = await response.json();
      setUser(userData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching user data:', error);
      setLoading(false);
    }
  };

  const handleLogin = (userData) => {
    setUser(userData);
    setShowLogin(false);
  };

  const handleLogout = () => {
    setUser(null);
    // Additional logout cleanup can go here
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {showLogin && <LoginPopup setShowLogin={setShowLogin} setMenu={() => {}} onLogin={handleLogin} />}
      <div className='app'>
        <Navbar setShowLogin={setShowLogin} isAuthenticated={!!user} user={user} onLogout={handleLogout} />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/Cart' element={<Cart />} />
          <Route path='/Order' element={<PlaceOrder />} />
          <Route path='/Sign in' element={<Signin />} />
          <Route path='/about_us' element={<About_Us />} />
          <Route path='/DogProducts' element={<DogProducts />} />
          <Route path='/CatProducts' element={<CatProducts />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;
