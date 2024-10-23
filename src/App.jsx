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
import ProductDetails from './pages/ProductDetails/ProductDetails.jsx';
import Verify from './pages/Verify/Verify.jsx';
import MyOrders from './pages/MyOrders/MyOrders.jsx';
import axios from 'axios';


const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
   

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const response = await axios.get('http://localhost:4000/api/user/me', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.data.success) {
          setUser(response.data.user);
          loadCartData(token);  // Load the cart for the logged-in user
        } else {
          setError('Failed to fetch user data');
        }
      } catch (err) {

      }
    }
    setLoading(false);
  };

  const handleLogin = (userData) => {
    setUser(userData);
    setShowLogin(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className='App'>
      <Navbar
        isAuthenticated={!!user}
        user={user}
        onLogout={handleLogout}
        setShowLogin={setShowLogin}
      />
      {error && <div className="error-message">{error}</div>}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/DogProducts' element={<DogProducts />} />
        <Route path='/CatProducts' element={<CatProducts />} />
        <Route path='/About_Us' element={<About_Us />} />
        <Route path='/signin' element={<Signin />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/Order' element={<PlaceOrder />} />
        <Route path='/product/:id' element={<ProductDetails />} />
        <Route path='/verify' element={<Verify/>} />
        <Route path='/myorders' element={<MyOrders/>} />
      </Routes>
      <Footer />
      {showLogin && <LoginPopup setShowLogin={setShowLogin} onLogin={handleLogin} />}
    </div>
  );
};

export default App;
