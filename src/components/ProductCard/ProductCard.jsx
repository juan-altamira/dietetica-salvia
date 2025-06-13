import React, { useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import './ProductCard.css';

const ProductCard = ({ product }) => {
    const { addToCart } = useContext(CartContext);

    return (
        <div className="product-card">
            <div className="product-info">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-price">{product.price.toLocaleString('es-AR')}</p>
            </div>
            <button className="add-to-cart-btn" onClick={() => addToCart(product)}>
                Agregar al carrito
            </button>
        </div>
    );
};

export default ProductCard;
