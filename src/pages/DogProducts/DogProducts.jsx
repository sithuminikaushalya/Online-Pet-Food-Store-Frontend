import React, { useEffect, useState, useContext } from 'react';
import { assets } from '../../assets/assets'; 
import { Link, useNavigate } from 'react-router-dom';
import './DogProducts.css'; 
import { StoreContext } from '../../context/StoreContext'; 

const DogProducts = () => {
    const { addSingleToCart, isLoggedIn, setShowLogin } = useContext(StoreContext); // Access isLoggedIn and setShowLogin from StoreContext
    const [dogFoods, setDogFoods] = useState([]);
    const navigate = useNavigate();
    
    useEffect(() => {
        const fetchDogFoods = async () => {
            try {
                const response = await fetch('http://localhost:4000/api/food/list?category=Dog');
                
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const result = await response.json();
                if (result.success) {
                    setDogFoods(result.data);
                } else {
                    console.error("Failed to fetch dog products:", result.message);
                }
            } catch (error) {
                console.error('Error fetching dog products:', error);
            }
        };

        fetchDogFoods();
        window.scrollTo(0, 0); 
    }, []);

    const handleAddToCart = (itemId) => {
        if (isLoggedIn()) {
            addSingleToCart(itemId);
            navigate('/Cart'); // Navigate to the cart page if logged in
        } else {
            setShowLogin(true); // Show login popup if not logged in
        }
    };

    return (
        <div className="dog-products">
            <div className="welcomedog-section">
                <div className="welcomedog-text">
                    <h1 className="title">Nourish Your Dog's Health with NutriPet's Premium Dog Food.</h1>
                   <p className="description">
                        Explore the expertise behind our premium dog food, expertly crafted to fuel your dog's boundless energy and ensure their overall well-being. NutriPet is an all-in-one pet food product enriched with the best nutrients, providing a delicious and wholesome meal in every serving. NutriPet keeps your adult or puppy dog healthy with a shiny coat. Our formula is made with a special fusion of 100% natural ingredients to support your dog's overall health and nourishment. It includes high-quality proteins for muscle development, vitamins for vibrant skin and coat, crude fiber for better digestion, and essential nutrients like Omega 3, Vitamin D, and Calcium for a robust immune system. Additionally, our unique ingredient, Moringa, helps prevent cancer development, making NutriPet the ultimate choice for your dog's nutrition and well-being.
                    </p>
                </div>
                <div className="welcomedog-image">
                    <img src={assets.dogproduct} alt="Dog Food" />
                </div>
            </div>
            <div className="product-list">
                <div className="products-grid">
                    {dogFoods.length > 0 ? (
                        dogFoods.map(food => (
                            <div key={food._id} className="product-item">
                                <Link to={`/product/${food._id}`}>
                                    <img src={`http://localhost:4000/images/${food.image}`} alt={food.name} />
                                    <h3>{food.name}</h3>
                                    <p>Rs. {food.price}.00</p>
                                </Link>
                                
                                {/* Check stock quantity and disable Add to Cart if out of stock */}
                                {food.quantity > 0 ? (
                                    <button className="add-to-cart-btn" onClick={() => handleAddToCart(food._id)}>
                                        Add to Cart
                                    </button>
                                ) : (
                                    <button className="out-of-stock-btn" disabled>
                                        Out of Stock
                                    </button>
                                )}
                            </div>
                        ))
                    ) : (
                        <p>No dog products available</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DogProducts;
