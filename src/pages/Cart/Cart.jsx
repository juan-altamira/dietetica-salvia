import React, { useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import './Cart.css';

const Cart = () => {
    const { cart, removeFromCart, clearCart } = useContext(CartContext);

    const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

    return (
        <div className="cart-container">
            <h1 className="cart-title">Carrito de Compras</h1>
            {cart.length === 0 ? (
                <p className="cart-empty">Tu carrito está vacío.</p>
            ) : (
                <>
                    <div className="cart-items">
                        {cart.map((item) => (
                            <div key={item.id} className="cart-item">
                                <div className="cart-item-info">
                                    <h3 className="cart-item-name">{item.name}</h3>
                                    <p className="cart-item-price">${item.price.toLocaleString('es-AR')} x {item.quantity}</p>
                                </div>
                                <button className="remove-item-btn" onClick={() => removeFromCart(item.id)}>
                                    Eliminar
                                </button>
                            </div>
                        ))}
                    </div>
                    <div className="cart-summary">
                        <h2 className="cart-total">Total: ${totalPrice.toLocaleString('es-AR')}</h2>
                        <button className="clear-cart-btn" onClick={clearCart}>
                            Vaciar Carrito
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default Cart;
