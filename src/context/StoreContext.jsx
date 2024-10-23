import React, { createContext, useEffect, useState } from "react";
import axios from 'axios';
import LoginPopup from "../components/LoginPopup/LoginPopup";
import './StoreContext.css';
export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    const [cartItems, setCartItems] = useState({});
    const [itemDetails, setItemDetails] = useState({});
    const [token, setToken] = useState('');
    const [showLogin, setShowLogin] = useState(false);
    const [userData, setUserData] = useState(null);
    const [user, setUser] = useState(null);
    const [message, setMessage] = useState('');
    const [showMessagePopup, setShowMessagePopup] = useState(false); // State for showing the popup
    const url = 'http://localhost:4000/';

    const isLoggedIn = () => !!token;

    const loginUser = (userData) => {
        setUser(userData); // Assume userData has the _id property
    };

    const handleLogin = (user) => {
        setUser(user);
        const tokenFromStorage = localStorage.getItem('token');
        setToken(tokenFromStorage);
        setShowLogin(false);
        loadCartData(tokenFromStorage);
    };

const addToCart = async (itemId, quantity) => {
    if (!isLoggedIn()) {
        setShowLogin(true);
        return;
    }

    const availableQuantity = itemDetails[itemId]?.quantity || 0;
    const currentCartQuantity = cartItems[itemId] || 0; // Default to 0 if undefined

    const newQuantity = currentCartQuantity + quantity;

    // Check if the total quantity in the cart exceeds the available stock
    if (newQuantity > availableQuantity) {
        const remainingQuantity = availableQuantity - currentCartQuantity;
        
        // Display the message in a popup and do NOT update the cart
     setMessage(`Only ${availableQuantity} units of ${itemDetails[itemId].name} are available. You currently have ${cartItems[itemId]} in your cart!`);
        setShowMessagePopup(true); // Show popup with message
        
        return; // Prevent adding and stay on the same page
    }

    try {
        // If quantity is valid, proceed to update the cart
        const updatedCart = { ...cartItems, [itemId]: newQuantity };
        setCartItems(updatedCart);
        setMessage(''); // Clear any previous messages after successful addition
        setShowMessagePopup(false); // Hide popup after successful addition

        await axios.post(url + "api/cart/update", { cart: updatedCart }, { 
            headers: { Authorization: `Bearer ${token}` } 
        });
    } catch (error) {
        console.error('Error adding to cart:', error);
    }
};

const addSingleToCart = async (itemId) => {
    if (!isLoggedIn()) {
        setShowLogin(true);
        return;
    }

    const availableQuantity = itemDetails[itemId]?.quantity || 0;
   const currentCartQuantity = cartItems[itemId] || 0; // Default to 0 if undefined

    const newQuantity = currentCartQuantity + 1;

    // Check if adding one more would exceed the available stock
    if (newQuantity > availableQuantity) {
        const remainingQuantity = availableQuantity - currentCartQuantity;
        
        // Display the message in a popup and do NOT update the cart
setMessage(`Only ${availableQuantity} units of ${itemDetails[itemId].name} are available. You currently have ${cartItems[itemId]} in your cart!`);
        setShowMessagePopup(true); // Show popup with message
        
        return; // Prevent adding and stay on the same page
    }

    try {
        // If quantity is valid, proceed to update the cart
        const updatedCart = { ...cartItems, [itemId]: newQuantity };
        setCartItems(updatedCart);
        setMessage(''); // Clear any previous messages after successful addition
        setShowMessagePopup(false); // Hide popup after successful addition

        await axios.post(url + "api/cart/update", { cart: updatedCart }, { 
            headers: { Authorization: `Bearer ${token}` } 
        });
    } catch (error) {
        console.error('Error adding single item to cart:', error);
    }
};

const updateCartQuantity = (itemId, quantity) => {
    // Ensure the quantity is not negative
    if (quantity < 0) return;

    setCartItems((prevItems) => ({
        ...prevItems,
        [itemId]: quantity,
    }));
};

 const removeFromCart = async (itemId) => {
        try {
           const updatedCart = { ...cartItems, [itemId]: (cartItems[itemId] || 0) - 1 }; // Default to 0 if undefined

            if (updatedCart[itemId] <= 0) delete updatedCart[itemId];
            setCartItems(updatedCart);

            if (token) {
                await axios.post(url + "api/cart/update", { cart: updatedCart }, { 
                    headers: { Authorization: `Bearer ${token}` } 
                });
            }
        } catch (error) {
            console.error('Error removing from cart:', error);
        }
    };

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0 && itemDetails[item]) {
                totalAmount += itemDetails[item].price * cartItems[item];
            }
        }
        return totalAmount;
    };

    const fetchItemDetails = async () => {
        try {
            const response = await axios.get(url + "api/food/list");
            if (response.data && Array.isArray(response.data.data)) {
                const data = response.data.data.reduce((acc, item) => {
                    acc[item._id] = item;
                    return acc;
                }, {});
                setItemDetails(data);
            } else {
                console.error('Unexpected response structure:', response.data);
            }
        } catch (error) {
            console.error('Error fetching item details:', error);
        }
    };

    const loadCartData = async (userToken) => {
        try {
            const response = await axios.get(url + "api/cart/get", {
                headers: { Authorization: `Bearer ${userToken}` }
            });

            if (response.data && response.data.success) {
                if (response.data.cartData) {
                    setCartItems(response.data.cartData);
                } else {
                    console.error('Cart data is empty.');
                }
            } else {
                console.error('Failed to fetch cart data:', response.data.message || 'Unknown error');
            }
        } catch (error) {
            console.error('Error fetching cart data:', error.response?.data || error.message);
        }
    };

   useEffect(() => {
        const storedToken = localStorage.getItem("token");

        if (storedToken) {
            setToken(storedToken);
            fetchItemDetails();
            loadCartData(storedToken);
        } else {
            console.warn("No token found in localStorage");
        }
    }, []);
    useEffect(() => {
        if (token) {
            loadCartData(token);
        }
    }, [token]);

    const contextValue = {
        cartItems,
        itemDetails,
        addToCart,
        addSingleToCart,
        removeFromCart,
        getTotalCartAmount,
        loadCartData,
        fetchItemDetails,
        isLoggedIn,
        setShowLogin,
        token,
        user,
        setUser,
        loginUser,
        handleLogin,
        updateCartQuantity
    };

   return (
        <>
            <StoreContext.Provider value={contextValue}>
                {props.children}
            </StoreContext.Provider>

            {showLogin && <LoginPopup setShowLogin={setShowLogin} onLogin={handleLogin} />}

            {/* Popup for Stock Message */}
            {showMessagePopup && (
                <div className="message-popup">
                    <div className="message-popup-content">
                        <p>{message}</p>
                        <button onClick={() => setShowMessagePopup(false)}>OK</button>
                    </div>
                </div>
            )}
        </>
    );
};

export default StoreContextProvider;
