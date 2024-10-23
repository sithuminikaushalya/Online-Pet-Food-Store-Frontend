import React, { useContext, useState } from 'react';
import './Cart.css';
import { StoreContext } from '../../context/StoreContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
    const { cartItems, itemDetails, removeFromCart, getTotalCartAmount, updateCartQuantity } = useContext(StoreContext);
    const navigate = useNavigate();
    
    const [message, setMessage] = useState(''); // New state for message
    const [showMessagePopup, setShowMessagePopup] = useState(false); // State for showing the popup

    window.scrollTo(0, 0); 

    if (!itemDetails || Object.keys(itemDetails).length === 0) {
        return <div>Loading...</div>;
    }

    const handleQuantityChange = (itemId, quantity) => {
        // Ensure quantity is a valid number, default to 0 if undefined or less than 0
        quantity = quantity >= 0 ? quantity : 0;

        // Get the available quantity of the item, default to 0 if unavailable
        const availableQuantity = itemDetails?.[itemId]?.quantity || 0;

        // Ensure current cart quantity defaults to 0 if undefined
        const currentCartQuantity = cartItems?.[itemId] || 0;

        // Check if quantity exceeds available stock
        if (quantity > availableQuantity) {
            setMessage(`Only ${availableQuantity} units of ${itemDetails?.[itemId]?.name || 'this item'} are available. You currently have ${currentCartQuantity} in your cart!`);
            setShowMessagePopup(true);
            return; // Do not update the cart
        }

        // Update cart quantity if valid
        updateCartQuantity(itemId, quantity);
    };

    const totalCartAmount = getTotalCartAmount();
    const deliveryFee = totalCartAmount === 0 ? 0 : 300;
    const totalAmount = totalCartAmount + deliveryFee;

    return (
        <div className='cart'>
            <div className='cart-items'>
                <div className='cart-items-title'>
                    <p>Image</p>
                    <p>Title</p>
                    <p>Price</p>
                    <p>Quantity</p>
                    <p>Total</p>
                    <p>Remove</p>
                </div>
                <br />
                <hr />
                {Object.keys(cartItems).map((itemId) => {
                    const item = itemDetails[itemId];
                    
                    // Ensure cartItems[itemId] defaults to 0 if undefined
                    const cartQuantity = cartItems[itemId] || 0;

                    if (item && cartQuantity > 0) {
                        return (
                            <div key={itemId} className='cart-items-item'>
                                <img 
                                    src={`http://localhost:4000/images/${item.image}`} 
                                    alt={item.name} 
                                    className='product-image' 
                                />
                                <p className='items'>{item.name}</p>
                                <p className='items'>Rs. {item.price}.00</p>
                                <input 
                                    type="number"
                                    min="0"
                                    value={cartQuantity}  // Use cartQuantity here
                                    onChange={(e) => handleQuantityChange(itemId, parseInt(e.target.value))}
                                    className='quantity-input'
                                />
                                <p>Rs. {item.price * cartQuantity}.00</p>  {/* Calculate using cartQuantity */}
                                <p onClick={() => removeFromCart(itemId)} className='cross'>x</p>
                                <hr />
                            </div>
                        );
                    }
                    return null;
                })}
            </div>

            <div className='cart-bottom'>
                <div className='cart-total'>
                    <h2>Cart Totals</h2>
                    <div>
                        <div className='cart-total-details'>
                            <p>Subtotal</p>
                            <p>Rs. {totalCartAmount}.00</p>
                        </div>
                        <hr />
                        <div className='cart-total-details'>
                            <p>Delivery Fee</p>
                            <p>Rs. {deliveryFee}.00</p>
                        </div>
                        <div className='cart-total-details'>
                            <p>Total</p>
                            <p>Rs. {totalAmount}.00</p>
                        </div>
                    </div>
                    <button 
                        onClick={() => navigate('/Order')} 
                        disabled={totalCartAmount === 0}
                        className={totalCartAmount === 0 ? 'disabled-button' : ''}
                    >
                        Proceed to Checkout
                    </button>
                </div>
            </div>

            {/* Message popup */}
            {showMessagePopup && (
                <div className="message-popup">
                    <div className="message-popup-content">
                        {message}
                    </div>
                    <button onClick={() => setShowMessagePopup(false)}>
                        OK
                    </button>
                </div>
            )}
        </div>
    );
};

export default Cart;
