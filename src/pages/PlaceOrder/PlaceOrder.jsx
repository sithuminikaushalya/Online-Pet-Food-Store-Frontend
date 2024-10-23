// Frontend: PlaceOrder.js
import React, { useContext, useState } from 'react';
import './PlaceOrder.css';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';

const PlaceOrder = () => {
  window.scrollTo(0, 0);  // Ensure page is scrolled to top on render

  const url = 'http://localhost:4000/';  // Adjust this to match your backend's URL
  const { getTotalCartAmount, token, cartItems, itemDetails, setShowLogin, user } = useContext(StoreContext);

  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    street: "",
    city: "",
    state: "",
    country: "",
    phone: ""
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({ ...data, [name]: value }));
  };

  const placeOrder = async (event) => {
    event.preventDefault();
    if (!user || !token) {
      setShowLogin(true); // Show login popup if user is not authenticated
      return;
    }

    let orderItems = [];
    Object.values(itemDetails).forEach((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = { ...item };
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    });

    const userId = user ? user._id : null;

    let orderData = {
      userId: userId,
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 300, 
    };

    try {
      const response = await axios.post(url + "api/order/place", orderData, {
        headers: {
          Authorization: `Bearer ${token}`,  // Ensure correct syntax with backticks
        }
      });
      

      if (response.data.success) {
        const { session_url } = response.data;
        window.location.replace(session_url);  // Redirect to Stripe Checkout
      } else {
        alert("Error placing the order");
      }
    } catch (error) {
      console.error("Error placing order:", error.response ? error.response.data : error);
      alert("Error with your order. Please try again.");
    }
  };

  return (
    <form onSubmit={placeOrder} className="place-order">
      <div className='place-order-left'>
        <p className='title'>Delivery Information</p>
        <div className='multi-fields'>
          <input required name="firstname" onChange={onChangeHandler} value={data.firstname} type="text" placeholder='First name' />
          <input required name="lastname" onChange={onChangeHandler} value={data.lastname} type="text" placeholder='Last name' />
        </div>
        <input required name="email" onChange={onChangeHandler} value={data.email} type="email" placeholder="Email address" />
        <input required name="street" onChange={onChangeHandler} value={data.street} type="text" placeholder='Street' />
        <div className='multi-fields'>
          <input required name="city" onChange={onChangeHandler} value={data.city} type="text" placeholder='City' />
          <input required name="state" onChange={onChangeHandler} value={data.state} type="text" placeholder='State' />
        </div>
        <input required name="country" onChange={onChangeHandler} value={data.country} type="text" placeholder='Country' />
        <input required name="phone" onChange={onChangeHandler} value={data.phone} type="text" placeholder='Phone' />
      </div>
      <div className='place-order-right'>
        <div className='cart-total'>
          <h2>Cart Totals</h2>
          <div>
            <div className='cart-total-details'>
              <p>Subtotal</p>
              <p>Rs. {getTotalCartAmount()}.00</p>
            </div>
            <hr />
            <div className='cart-total-details'>
              <p>Delivery Fee</p>
              <p>Rs. {getTotalCartAmount() === 0 ? 0 : 300}.00</p>
            </div>
            <div className='cart-total-details'>
              <p>Total</p>
              <p>Rs. {getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 300}.00</p>
            </div>
            <button type="submit">Proceed to Payment</button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
