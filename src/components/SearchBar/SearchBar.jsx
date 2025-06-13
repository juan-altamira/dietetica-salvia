import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import './SearchBar.css';

const SearchBar = ({ onSearch, onClear, onSuggestionClick, suggestions = [], placeholder = 'Buscar productos...', value = '' }) => {
    const { addToCart } = useContext(CartContext);
    const [query, setQuery] = useState(value);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const navigate = useNavigate();

    // Actualizar el query cuando cambia el valor desde el padre
    useEffect(() => {
        setQuery(value);
    }, [value]);

    const handleInputChange = (e) => {
        const value = e.target.value;
        setQuery(value);
        onSearch(value); 
        setShowSuggestions(value.length > 1);
    };

    const handleClear = () => {
        setQuery('');
        onClear();
        setShowSuggestions(false);
    };

    const handleSuggestionSelect = (suggestion) => {
        setQuery(suggestion.name);
        setShowSuggestions(false);
        
        // Navegar a la categoría si es una sugerencia de categoría
        if (suggestion.category) {
            const categorySlug = suggestion.category.toLowerCase().replace(/\s+/g, '-');
            navigate(`/categoria/${categorySlug}`);
        }
        
        // Llamar al manejador de sugerencias si está definido
        if (onSuggestionClick) {
            onSuggestionClick(suggestion);
        }
    };

    return (
        <div className="search-bar-container" style={{
            position: 'relative',
            width: '100%',
            maxWidth: '700px',
            margin: '0 auto 3rem',
            zIndex: 5
        }}>
            <div className="search-input-wrapper" style={{
                position: 'relative',
                width: '100%',
                display: 'flex',
                alignItems: 'center'
            }}>
                <input
                    type="text"
                    value={query}
                    onChange={handleInputChange}
                    onFocus={() => setShowSuggestions(query.length > 1 && suggestions.length > 0)}
                    onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                    placeholder={placeholder}
                    style={{
                        width: '100%',
                        padding: '1rem 1.5rem',
                        fontSize: '1.1rem',
                        backgroundColor: 'var(--bg-secondary)',
                        border: '2px solid var(--border)',
                        borderRadius: '30px',
                        color: 'var(--text-primary)',
                        outline: 'none',
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
                        fontWeight: 500
                    }}
                    aria-label="Buscar productos"
                />
                {query && (
                    <button 
                        type="button" 
                        style={{
                            position: 'absolute',
                            right: '1rem',
                            background: 'none',
                            border: 'none',
                            color: 'var(--text-secondary)',
                            fontSize: '1.5rem',
                            cursor: 'pointer',
                            padding: 0,
                            lineHeight: 1,
                            transition: 'color 0.2s',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '24px',
                            height: '24px',
                            borderRadius: '50%'
                        }}
                        onMouseOver={(e) => {
                            e.currentTarget.style.color = 'var(--accent)';
                            e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
                        }}
                        onMouseOut={(e) => {
                            e.currentTarget.style.color = 'var(--text-secondary)';
                            e.currentTarget.style.backgroundColor = 'transparent';
                        }}
                        onClick={handleClear}
                        aria-label="Limpiar búsqueda"
                    >
                        ×
                    </button>
                )}
            </div>
            
            {showSuggestions && suggestions.length > 0 && (
                <ul style={{
                    position: 'absolute',
                    top: 'calc(100% + 8px)',
                    left: 0,
                    right: 0,
                    backgroundColor: 'var(--bg-secondary)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '12px',
                    margin: 0,
                    padding: '0.5rem 0',
                    maxHeight: '400px',
                    overflowY: 'auto',
                    zIndex: 1000,
                    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)',
                    listStyle: 'none'
                }}>
                    {suggestions.map((suggestion, index) => (
                        <li 
                            key={`${suggestion.id || index}-${suggestion.name}`}
                            style={{
                                padding: '0.9rem 1.5rem',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease',
                                borderBottom: '1px solid var(--border)',
                                textAlign: 'left',
                                display: 'flex',
                                alignItems: 'center',
                                color: 'var(--text-primary)',
                                fontSize: '1rem',
                                backgroundColor: 'transparent',
                                border: 'none',
                                width: '100%',
                                textAlign: 'left',
                                ':hover': {
                                    backgroundColor: 'var(--bg-tertiary)',
                                    paddingLeft: '1.8rem'
                                }
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = 'var(--bg-tertiary)';
                                e.currentTarget.style.paddingLeft = '1.8rem';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = 'transparent';
                                e.currentTarget.style.paddingLeft = '0.9rem';
                            }}
                            onMouseDown={(e) => e.preventDefault()}
                            onClick={() => handleSuggestionSelect(suggestion)}
                        >
                            <div style={{ 
                                flex: 1,
                                display: 'flex',
                                alignItems: 'center',
                                gap: '1rem',
                                minWidth: 0
                            }}>
                                <div style={{ 
                                    flex: 1,
                                    minWidth: 0,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '0.25rem'
                                }}>
                                    <span style={{ 
                                        fontWeight: 500, 
                                        whiteSpace: 'nowrap',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis'
                                    }}>
                                        {suggestion.name}
                                    </span>
                                    {suggestion.category && (
                                        <span style={{
                                            fontSize: '0.75rem',
                                            color: 'var(--text-secondary)',
                                            backgroundColor: 'var(--bg-tertiary)',
                                            padding: '0.15rem 0.5rem',
                                            borderRadius: '10px',
                                            whiteSpace: 'nowrap',
                                            alignSelf: 'flex-start',
                                            lineHeight: '1.2'
                                        }}>
                                            {suggestion.category}
                                        </span>
                                    )}
                                </div>
                                <span style={{ 
                                    color: 'var(--accent)',
                                    fontWeight: '600',
                                    whiteSpace: 'nowrap',
                                    margin: '0 0.5rem',
                                    minWidth: '70px',
                                    textAlign: 'right'
                                }}>
                                    ${suggestion.price.toLocaleString('es-AR')}
                                </span>
                                <button 
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        addToCart(suggestion);
                                        // Efecto visual al agregar al carrito
                                        const button = e.currentTarget;
                                        button.textContent = '✓';
                                        button.style.backgroundColor = '#10b981';
                                        setTimeout(() => {
                                            button.textContent = 'Agregar';
                                            button.style.backgroundColor = 'var(--accent)';
                                        }, 1000);
                                    }}
                                    style={{
                                        backgroundColor: 'var(--accent)',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '20px',
                                        padding: '0.4rem 0.8rem',
                                        fontSize: '0.85rem',
                                        fontWeight: 600,
                                        cursor: 'pointer',
                                        transition: 'all 0.2s ease',
                                        whiteSpace: 'nowrap',
                                        flexShrink: 0,
                                        height: '32px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        minWidth: '80px',
                                        ':hover': {
                                            backgroundColor: 'var(--accent-hover)',
                                            transform: 'translateY(-1px)'
                                        }
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.backgroundColor = 'var(--accent-hover)';
                                        e.currentTarget.style.transform = 'translateY(-1px)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.backgroundColor = 'var(--accent)';
                                        e.currentTarget.style.transform = 'translateY(0)';
                                    }}
                                >
                                    Agregar
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SearchBar;
