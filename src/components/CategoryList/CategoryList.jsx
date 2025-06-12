import React from 'react';
import { useNavigate } from 'react-router-dom';
import './CategoryList.css';

const categories = [
  {
    id: 'harinas',
    name: 'Harinas y Premezclas',
    image: 'https://images.unsplash.com/photo-1605517899800-9ccf8f0e6f0e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
  },
  {
    id: 'especias',
    name: 'Especias y Condimentos',
    image: 'https://images.unsplash.com/photo-1606787366850-de6330128bfc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
  },
  {
    id: 'frutos-secos',
    name: 'Frutos Secos',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80',
  },
  {
    id: 'legumbres',
    name: 'Legumbres y Semillas',
    image: 'https://images.unsplash.com/photo-1597362925123-77861d3fbac7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
  },
  {
    id: 'bebidas',
    name: 'Bebidas',
    image: 'https://images.unsplash.com/photo-1551024601-bec78aea704c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1364&q=80',
  },
  {
    id: 'chocolates',
    name: 'Chocolates y Dulces',
    image: 'https://images.unsplash.com/photo-1587131623029-d893263c1fc2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
  },
  {
    id: 'galletas',
    name: 'Galletas y Snacks',
    image: 'https://images.unsplash.com/photo-1608190003443-86ab162a7192?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
  },
  {
    id: 'suplementos',
    name: 'Suplementos',
    image: 'https://images.unsplash.com/photo-1546069901-14a5b4e8640b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80',
  },
];

const CategoryList = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (categoryId) => {
    navigate(`/categoria/${categoryId}`);
  };

  return (
    <div className="category-list">
      <h2 className="category-list-title">Nuestras Categorías</h2>
      <div className="category-grid">
        {categories.map((category) => (
          <div 
            key={category.id} 
            className="category-card"
            onClick={() => handleCategoryClick(category.id)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && handleCategoryClick(category.id)}
          >
            <div className="category-image-container">
              <img 
                src={category.image} 
                alt={category.name} 
                className="category-image"
                loading="lazy"
              />
              <div className="category-overlay">
                <h3 className="category-name">{category.name}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
