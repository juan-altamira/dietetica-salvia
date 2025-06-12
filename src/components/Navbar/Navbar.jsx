import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import './Navbar.css';

const Navbar = () => {
    const { cart } = useContext(CartContext);
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

    return (
        <nav className="navbar">
            <Link to="/" className="navbar-brand">Dietética Online</Link>
            <Link to="/cart" className="navbar-cart">
                <i className="fas fa-shopping-cart"></i>
                {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
            </Link>
        </nav>
    );
};

export default Navbar;
