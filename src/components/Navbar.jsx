import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import './Navbar.css';

const logo = '/logo-cabrera.svg'; // Ruta al logo en la carpeta public

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  // Cerrar el menú al cambiar de ruta
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  // Cerrar el menú al hacer clic fuera de él
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isMenuOpen && !e.target.closest('.nav-links') && !e.target.closest('.menu-toggle')) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="logo">
          <img src={logo} alt="La Cabrera" className="logo-img" />
        </Link>
        
        <button 
          className={`menu-toggle ${isMenuOpen ? 'active' : ''}`}
          onClick={toggleMenu}
          aria-expanded={isMenuOpen}
          aria-controls="main-navigation"
          aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
        >
          {isMenuOpen ? (
            <FaTimes className="menu-icon" />
          ) : (
            <FaBars className="menu-icon" />
          )}
        </button>
        
        <ul 
          className={`nav-links ${isMenuOpen ? 'active' : ''}`}
          id="main-navigation"
          role="navigation"
          aria-label="Menú principal"
        >
          <li><Link to="/">Inicio</Link></li>
          <li><Link to="/menu">Menú</Link></li>
          <li><Link to="/reservations">Reservas</Link></li>
          <li><Link to="/contact">Contacto</Link></li>
          <li className="mobile-booking">
            <Link to="/reservations" className="book-button">Reservar Mesa</Link>
          </li>
        </ul>
        
        <Link to="/reservations" className="book-button desktop-booking">
          Reservar Mesa
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
