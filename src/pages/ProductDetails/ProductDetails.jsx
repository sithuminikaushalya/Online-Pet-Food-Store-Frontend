import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; 
import { StoreContext } from '../../context/StoreContext'; 
import './ProductDetails.css';

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const { addToCart, isLoggedIn, setShowLogin } = useContext(StoreContext); 
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`http://localhost:4000/api/food/${id}`);
                
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const result = await response.json();
                if (result.success) {
                    setProduct(result.data);
                } else {
                    setError(result.message || 'Failed to fetch product');
                }
            } catch (error) {
                setError('Error fetching product: ' + error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    const handleAddToCart = () => {
        if (quantity > 0) {
            if (isLoggedIn()) {
                addToCart(id, quantity); 
                navigate('/cart'); 
            } else {
                setShowLogin(true); 
            }
        } else {
            alert('Quantity must be greater than 0');
        }
    };

    return (
        <div className="product-details">
            {loading && <p>Loading product details...</p>}
            {error && <p className="error-message">{error}</p>}
            {product && (
                <div className="product-detail-content">
                    <img src={`http://localhost:4000/images/${product.image}`} alt={product.name} className="product-image" />
                    <div className="product-info">
                        <h1>{product.name}</h1>
                        <p className="product-description">{product.description}</p>
                        <p className="product-price">Price: Rs. {product.price}.00</p>
                        
                        <div className="quantity-container">
                            <label htmlFor="quantity">Quantity:</label>
                            <input
                                type="number"
                                id="quantity"
                                value={quantity}
                                onChange={(e) => setQuantity(Number(e.target.value))}
                                min="1"
                            />
                        </div>

                        {product.quantity > 0 ? (
                            <button onClick={handleAddToCart} className="add-to-cart-button">Add to Cart</button>
                        ) : (
                            <button className="out-of-stock-button" disabled>Out of Stock</button>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductDetails;
