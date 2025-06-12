import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CategoryList from '../../components/CategoryList/CategoryList';
import ProductList from '../../components/ProductList/ProductList';
import SearchBar from '../../components/SearchBar/SearchBar';
import { products } from '../../data/products';
import './Home.css';

const Home = () => {
    const { categoryId } = useParams();
    const [searchQuery, setSearchQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const navigate = useNavigate();
    
    // Función para volver a la página principal
    const handleBackToCategories = (e) => {
        e.preventDefault();
        e.stopPropagation();
        window.location.href = '/';
        return false;
    };

    // Efecto para manejar cambios en la búsqueda y categoría
    useEffect(() => {
        let result = [...products];
        let filteredByCategory = [];
        let filteredBySearch = [];

        // Filtrar por categoría si existe
        if (categoryId) {
            const categoryName = categoryId.split('-').join(' ');
            filteredByCategory = result.filter(product => 
                product.category.toLowerCase() === categoryName.toLowerCase()
            );
        } else {
            filteredByCategory = result;
        }

        // Filtrar por búsqueda si existe
        if (searchQuery) {
            const query = searchQuery.trim().toLowerCase();
            filteredBySearch = filteredByCategory.filter(product =>
                product.name.toLowerCase().includes(query) ||
                product.category.toLowerCase().includes(query)
            );
            setFilteredProducts(filteredBySearch);
        } else {
            setFilteredProducts(filteredByCategory);
        }

        // Actualizar sugerencias solo si hay texto de búsqueda
        if (searchQuery && searchQuery.trim().length > 1) {
            const searchResults = products.filter(product =>
                product.name.toLowerCase().includes(searchQuery.trim().toLowerCase()) ||
                product.category.toLowerCase().includes(searchQuery.trim().toLowerCase())
            );
            setSuggestions(searchResults.slice(0, 5));
        } else {
            setSuggestions([]);
        }
    }, [categoryId, searchQuery, products]);

    const handleSearch = (query) => {
        // Si la búsqueda está vacía, limpiar y mostrar todas las categorías
        if (!query.trim()) {
            setSearchQuery('');
            if (!categoryId) {
                setFilteredProducts(products);
            }
            return;
        }
        setSearchQuery(query);
    };

    const handleClear = () => {
        setSearchQuery('');
        setSuggestions([]);
        // Si estamos en una categoría, mantener los productos de esa categoría
        if (categoryId) {
            const categoryName = categoryId.split('-').join(' ');
            const categoryProducts = products.filter(p => 
                p.category.toLowerCase() === categoryName.toLowerCase()
            );
            setFilteredProducts(categoryProducts);
        } else {
            // Si no hay categoría, mostrar todos los productos
            setFilteredProducts(products);
        }
    };

    const handleSuggestionClick = (suggestion) => {
        // Si la sugerencia es una categoría, navegar a esa categoría
        if (suggestion.category) {
            const categorySlug = suggestion.category.toLowerCase().replace(/\s+/g, '-');
            navigate(`/categoria/${categorySlug}`);
            setSearchQuery('');
        } else {
            // Si es un producto, realizar búsqueda
            setSearchQuery(suggestion.name);
        }
    };

    return (
        <div className="home-container">
            <header className="home-header">
                <h1>Bienvenido a nuestra Tienda de Dietética</h1>
                <p>Encuentra los mejores productos naturales y orgánicos</p>
            </header>
            
            <SearchBar 
                onSearch={handleSearch} 
                onClear={handleClear}
                onSuggestionClick={handleSuggestionClick}
                suggestions={suggestions}
                placeholder="Buscar productos o categorías..."
                value={searchQuery}
            />
            
            {categoryId || searchQuery ? (
                <div className="products-section">
                    <div className="section-header">
                        <h2 className="section-title">
                            {searchQuery 
                                ? `Resultados para: ${searchQuery}` 
                                : `Productos: ${filteredProducts[0]?.category || ''}`}
                        </h2>
                        <div style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '12px 28px',
                            background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
                            color: 'white',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontWeight: '600',
                            textAlign: 'center',
                            margin: '15px 0',
                            border: 'none',
                            fontSize: '1rem',
                            boxShadow: '0 4px 14px rgba(37, 99, 235, 0.3)',
                            transition: 'all 0.3s ease',
                            position: 'relative',
                            overflow: 'hidden',
                            zIndex: '1'
                        }}
                        onMouseOver={e => {
                            e.currentTarget.style.transform = 'translateY(-2px)';
                            e.currentTarget.style.boxShadow = '0 6px 18px rgba(37, 99, 235, 0.4)';
                        }}
                        onMouseOut={e => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = '0 4px 14px rgba(37, 99, 235, 0.3)';
                        }}
                        onMouseDown={e => {
                            e.currentTarget.style.transform = 'translateY(1px)';
                            e.currentTarget.style.boxShadow = '0 2px 8px rgba(37, 99, 235, 0.3)';
                        }}
                        onMouseUp={e => {
                            e.currentTarget.style.transform = 'translateY(-2px)';
                            e.currentTarget.style.boxShadow = '0 6px 18px rgba(37, 99, 235, 0.4)';
                        }}
                        onClick={handleBackToCategories}
                        onKeyDown={(e) => e.key === 'Enter' && handleBackToCategories(e)}
                        role="button"
                        tabIndex={0}
                        >
                            <svg 
                                width="18" 
                                height="18" 
                                viewBox="0 0 24 24" 
                                fill="none" 
                                stroke="currentColor" 
                                strokeWidth="2" 
                                strokeLinecap="round" 
                                strokeLinejoin="round"
                                style={{
                                    marginRight: '8px',
                                    transition: 'transform 0.3s ease'
                                }}
                                className="back-arrow"
                            >
                                <line x1="19" y1="12" x2="5" y2="12"></line>
                                <polyline points="12 19 5 12 12 5"></polyline>
                            </svg>
                            Volver a categorías
                        </div>
                    </div>
                    <ProductList filteredProducts={filteredProducts} />
                </div>
            ) : (
                <CategoryList />
            )}
        </div>
    );
};

export default Home;
