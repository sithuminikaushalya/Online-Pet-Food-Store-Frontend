import React, { useContext, useState } from 'react';
import './LoginPopup.css';
import axios from 'axios';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';

const LoginPopup = ({ setShowLogin, onLogin }) => {
    const { handleLogin } = useContext(StoreContext) || {}; // Provide a fallback
    const [currState, setCurrState] = useState("Login");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [error, setError] = useState("");

    const handleClose = () => {
        setShowLogin(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const baseURL = 'http://localhost:4000/api/user';
            const endpoint = currState === "Login" ? '/login' : '/register';
            const response = await axios.post(`${baseURL}${endpoint}`, currState === "Login" ? { email, password } : { name, email, password });

            if (response.data.success) {
                const token = response.data.token;
                localStorage.setItem('token', token);
                const userResponse = await axios.get('http://localhost:4000/api/user/me', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });

                if (userResponse.data.success) {
                    const userData = userResponse.data.user;
                    onLogin(userData);
                    handleLogin(userData);
                    setTimeout(() => {
                        window.location.reload();
                    }, 1);
                    if (currState !== "Sign Up") {
                        handleClose();
                    }
                }
            } else {
                setError(response.data.message);
            }
        } catch (err) {
            setError("An error occurred. Please try again.");
            console.error('Error:', err);
        }
    };

    return (
        <div className='login-popup'>
            <form className="login-popup-container" onSubmit={handleSubmit}>
                <div className="login-popup-title">
                    <h2>{currState}</h2>
                    <img
                        onClick={handleClose}
                        src={assets.cross_icon}
                        alt="Close"
                        className="close-icon"
                    />
                </div>
                <div className="login-popup-inputs">
                    {currState === "Sign Up" && (
                        <input
                            type="text"
                            placeholder="Your name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    )}
                    <input
                        type="email"
                        placeholder="Your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {error && <p className="error-message">{error}</p>}
                <button type="submit">
                    {currState === "Sign Up" ? "Create account" : "Login"}
                </button>
                {currState === "Sign Up" && (
                    <label className="terms-checkbox">
                        <input type="checkbox" required />
                        By continuing, I agree to the terms of use & privacy policy.
                    </label>
                )}
                <div className="additional-options">
                    {currState === "Login" ? (
                        <p>
                            Create a new account? <span className="login-link" onClick={() => setCurrState("Sign Up")}>Click here</span>
                        </p>
                    ) : (
                        <p>
                            Already have an account? <span className="login-link" onClick={() => setCurrState("Login")}>Login here</span>
                        </p>
                    )}
                </div>
            </form>
        </div>
    );
};

export default LoginPopup;
