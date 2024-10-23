import React, { useEffect, useState, useContext } from 'react';
import { assets } from '../../assets/assets'; 
import { Link, useNavigate } from 'react-router-dom'; 
import './CatProducts.css'; 
import { StoreContext } from '../../context/StoreContext'; 

const CatProducts = () => {
    const { addSingleToCart, isLoggedIn, setShowLogin } = useContext(StoreContext); 
    const [catFoods, setCatFoods] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCatFoods = async () => {
            try {
                const response = await fetch('http://localhost:4000/api/food/list?category=Cat');
                
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const result = await response.json();
                if (result.success) {
                    setCatFoods(result.data);
                } else {
                    console.error("Failed to fetch cat products:", result.message);
                }
            } catch (error) {
                console.error('Error fetching cat products:', error);
            }
        };

        fetchCatFoods();
        window.scrollTo(0, 0); 
    }, []);

    const handleAddToCart = (itemId) => {
        if (isLoggedIn()) {
            addSingleToCart(itemId);
            navigate('/cart'); 
        } else {
            setShowLogin(true); 
        }
    };
    
    return (<div className="cat-products"> <div className="welcomecat-section"> <div className="welcomecat-text"> <h1 className="title">Elevate Your Cat's Wellness with NutriPet's Premium Cat Food.</h1> <p className="description"> Uplift your cat's wellness with our thoughtfully crafted cat food, providing balanced nutrition for a vibrant and flourishing life. NutriPet is an all-in-one package enriched with the best nutrients, ensuring your pet cat enjoys a delicious and wholesome meal in every serving. NutriPet offers a complete and balanced diet tailored for cats. It delivers optimal levels of protein and is fortified with essential vitamins and minerals to support your cat's overall health throughout its lifetime. Our high-quality cat food satisfies hunger between meals with its rich proteins and minerals. Vitamin A enhances the immune system and promotes healthy vision, while our special ingredient 'Moringa' helps prevent the development of cancer, making NutriPet the ideal choice for your feline companion's nutrition and well-being. </p> </div> <div className="welcomecat-image"> <img src={assets.catproduct} alt="Cat Food" /> </div> </div> <div className="product-list"> <div className="products-grid"> {catFoods.length > 0 ? (catFoods.map(food => (<div key={food._id} className="product-item"> <Link to={`/product/${food._id}`}> <img src={`http://localhost:4000/images/${food.image}`} alt={food.name} /> <h3>{food.name}</h3> <p>Rs. {food.price}.00</p> </Link>
          {food.quantity > 0 ? (
                                    <button className="add-to-cart-btn" onClick={() => handleAddToCart(food._id)}>
                                        Add to Cart
                                    </button>
                                ) : (
                                    <button className="out-of-stock-btn" disabled>
                                        Out of Stock
                                    </button>
                                )} </div>))) : (<p>No cat products available</p>)} </div> </div> </div>);
}; export default CatProducts;