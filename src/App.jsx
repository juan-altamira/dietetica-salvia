import './App.css';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';
import Cart from './pages/Cart/Cart';
import { Routes, Route, useLocation } from 'react-router-dom';
import React, { useEffect } from 'react';

// Componente para hacer scroll al inicio al cambiar de ruta
const ScrollToTop = () => {
    const { pathname, search } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname, search]);

    return null;
};

function App() {
    return (
        <div className="app">
            <ScrollToTop />
            <Navbar />
            <main className="main-content">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/categoria/:categoryId" element={<Home />} />
                    <Route path="/cart" element={<Cart />} />
                    {/* Redirigir rutas antiguas a la nueva estructura */}
                    <Route path="/categoria" element={<Home />} />
                </Routes>
            </main>
        </div>
    );
}

export default App;
