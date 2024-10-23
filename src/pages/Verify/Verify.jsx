import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import ClipLoader from "react-spinners/ClipLoader"; // Import the spinner

const Verify = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [status, setStatus] = useState(null); // Status message
    const [loading, setLoading] = useState(true); // Loading state for spinner

    // Function to verify the payment status
    const verifyPayment = async () => {
        const query = new URLSearchParams(location.search);
        const success = query.get('success');
        const orderId = query.get('orderId');

        console.log({ success, orderId });  // Log parameters to check their values

        try {
            // Call the backend API to verify the order/payment
            const response = await axios.post("http://localhost:4000/api/order/verify", { success, orderId });

            // Update the status based on the response from the server
            if (response.data.success) {
                setStatus('Payment successful. Redirecting to your orders...');
                setTimeout(() => {
                    navigate("/myorders");  // Redirect to the orders page
                }, 1000); // 1-second delay for user to see the message
            } else {
                setStatus('Payment failed. Order was canceled.');
                setTimeout(() => {
                    navigate("/");  // Redirect to homepage if payment failed
                }, 1000); // Delay to display message before navigation
            }
        } catch (error) {
            console.error("Error verifying payment:", error);
            setStatus('An error occurred while verifying your payment.');
        } finally {
            setLoading(false);  // Stop showing the spinner once verification completes
        }
    };

    useEffect(() => {
        verifyPayment();  // Trigger the verification on component mount
    }, []);

    return (
        <div style={{ textAlign: 'center', padding: '60px', marginTop: '50px' }}>
            <h2>Verifying Payment...</h2>
            {loading ? (
                <div className="spinner-container">
                    <ClipLoader size={100} color={"#123abc"} loading={loading} />
                    <p>Loading...</p>
                </div>
            ) : (
                <p>{status}</p>  // Show the status message once loading is complete
            )}
        </div>
    );
};

export default Verify;
