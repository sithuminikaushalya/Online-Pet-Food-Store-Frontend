import React, { useContext, useEffect, useState } from 'react';
import { StoreContext } from '../../context/StoreContext';
import './MyOrders.css';
import axios from 'axios';
import { assets } from '../../assets/assets';   

const MyOrders = () => {
    const { url, token } = useContext(StoreContext);
    const [data, setData] = useState([]);
   
    const fetchOrders = async () => {
        try {
            const response = await axios.post(
                "http://localhost:4000/api/order/userorders", 
                {}, 
                {
                    headers: {
                        Authorization: `Bearer ${token}`  // Corrected template literal
                    }
                }
            );
            setData(response.data.data);
            console.log(response.data);
        } catch (error) {
            console.error("Error fetching orders:", error);
        }
    };

    useEffect(() => {
        if (token) {
            fetchOrders();
        }
    }, [token]);
    
    return (
        <div className='my-orders'>
            <h2>My Orders</h2>
            <div className='container'>
                {data.length === 0 ? (
                    <div className="no-orders">
                        <img src={assets.noOrdersIcon} alt="No Orders" />
                        <p>You have no orders yet!</p>
                    </div>
                ) : (
                    data.map((order, index) => {
                        return (
                            <div key={index} className='my-orders-order'>
                                <img src={assets.parcelIcon} alt="Parcel" />
                                <p>
                                {order.items.map((item, idx) => {
                                    return (
                                        <span key={idx} className="ordered-product"> {/* Correct key placement */}
                                            {item.name} x {item.quantity}
                                            {idx !== order.items.length - 1 && <br />} {/* Add line break if not the last item */}
                                        </span>
                                    );
                                })}
                                </p>
                                <p>Rs. {order.amount}.00</p>
                                <p>Items: {order.items.length}</p>
                                <p>
                                    <span style={{ color: "#66cc99" }}> &#x25cf;   </span>
                                    <b> {order.status}</b>
                                </p>
                                <button onClick={fetchOrders}>Track Order</button>
                            </div>
                        )
                    })
                )}
            </div>
        </div>
    );
};

export default MyOrders;
