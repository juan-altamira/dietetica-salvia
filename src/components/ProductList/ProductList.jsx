import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from '../ProductCard/ProductCard';
import { products } from '../../data/products';
import './ProductList.css';

const ITEMS_PER_PAGE = 12;

const ProductList = ({ filteredProducts }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const { categoryId } = useParams();
    const [displayedProducts, setDisplayedProducts] = useState([]);
    const [currentCategory, setCurrentCategory] = useState('');
    const productListRef = useRef(null);

    // Detectar si es búsqueda
    const isBusqueda = filteredProducts && filteredProducts.length > 0;

    useEffect(() => {
        if (isBusqueda) {
            setDisplayedProducts(filteredProducts);
            setCurrentPage(1); // Siempre volver a la página 1 en búsqueda
        } else if (categoryId) {
            const categoryName = categoryId.split('-').join(' ');
            const categoryProducts = products.filter(
                product => product.category.toLowerCase().includes(categoryName)
            );
            setDisplayedProducts(categoryProducts);
            setCurrentCategory(categoryProducts[0]?.category || '');
            setCurrentPage(1);
        } else {
            setDisplayedProducts(products);
            setCurrentPage(1);
        }
        // eslint-disable-next-line
    }, [categoryId, filteredProducts]);

    const totalPages = Math.ceil(displayedProducts.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const paginatedProducts = displayedProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    // Scroll solo si cambia la página o la categoría, pero no por búsqueda
    useEffect(() => {
        if (!isBusqueda && productListRef.current) {
            productListRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        // eslint-disable-next-line
    }, [currentPage, categoryId]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
        // El scroll lo maneja el useEffect
    };

    if (displayedProducts.length === 0) {
        return (
            <div className="no-products">
                <h3>No se encontraron productos</h3>
                <p>Intenta con otros términos de búsqueda o categoría.</p>
            </div>
        );
    }

    return (
        <div className="product-list-container" ref={productListRef}>
            {currentCategory && (
                <h2 className="category-title">{currentCategory}</h2>
            )}
            
            <div className="product-grid">
                {paginatedProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>

            {totalPages > 1 && (
                <div className="pagination">
                    <button 
                        onClick={() => handlePageChange(1)} 
                        disabled={currentPage === 1}
                    >
                        «
                    </button>
                    <button 
                        onClick={() => handlePageChange(currentPage - 1)} 
                        disabled={currentPage === 1}
                    >
                        ‹
                    </button>
                    
                    {[...Array(totalPages).keys()].map((page) => (
                        <button
                            key={page + 1}
                            onClick={() => handlePageChange(page + 1)}
                            className={currentPage === page + 1 ? 'active' : ''}
                        >
                            {page + 1}
                        </button>
                    ))}
                    
                    <button 
                        onClick={() => handlePageChange(currentPage + 1)} 
                        disabled={currentPage === totalPages}
                    >
                        ›
                    </button>
                    <button 
                        onClick={() => handlePageChange(totalPages)} 
                        disabled={currentPage === totalPages}
                    >
                        »
                    </button>
                </div>
            )}
        </div>
    );
};

export default ProductList;
