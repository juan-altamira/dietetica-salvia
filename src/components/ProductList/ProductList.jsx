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

    useEffect(() => {
        // Si hay productos filtrados (de búsqueda), usamos esos
        if (filteredProducts && filteredProducts.length > 0) {
            setDisplayedProducts(filteredProducts);
            setCurrentPage(1);
            return;
        }

        // Si hay un categoryId, filtramos por categoría
        if (categoryId) {
            const categoryName = categoryId.split('-').join(' ');
            const categoryProducts = products.filter(
                product => product.category.toLowerCase().includes(categoryName)
            );
            setDisplayedProducts(categoryProducts);
            setCurrentCategory(categoryProducts[0]?.category || '');
        } else {
            // Si no hay ni búsqueda ni categoría, mostramos todos los productos
            setDisplayedProducts(products);
        }
        setCurrentPage(1);
    }, [categoryId, filteredProducts]);

    const totalPages = Math.ceil(displayedProducts.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const paginatedProducts = displayedProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    const scrollToProductList = () => {
        if (productListRef.current) {
            productListRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
        // El scroll se manejará en el efecto
    };

    // Efecto para manejar el scroll cuando cambia la categoría o la página
    useEffect(() => {
        scrollToProductList();
    }, [currentPage, categoryId, filteredProducts]);

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
