import React from 'react';
import { useNavigate } from 'react-router-dom';
import './CategoryList.css';

const categories = [
  {
    id: 'harinas',
    name: 'Harinas y Premezclas',
    image: 'https://alatria.com/wp-content/uploads/Como-sustituir-la-harina-de-trigo-por-harina-sin-gluten.jpg',
  },
  {
    id: 'especias',
    name: 'Especias y Condimentos',
    image: 'https://images.unsplash.com/photo-1606787366850-de6330128bfc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
  },
  {
    id: 'frutos-secos',
    name: 'Frutos Secos',
    image: 'https://amazonical.com/wp-content/uploads/2021/04/Tipos-de-frutos-secos-90442081_s.jpg',
  },
  {
    id: 'legumbres',
    name: 'Legumbres y Semillas',
    image: 'https://images.unsplash.com/photo-1597362925123-77861d3fbac7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
  },
  {
    id: 'bebidas',
    name: 'Bebidas',
    image: 'https://www.somoselagua.com.ar/img/novedades/31.jpg',
  },
  {
    id: 'chocolates',
    name: 'Chocolates y Dulces',
    image: 'https://bucket.somosohlala.com.ar/s3fs-public/styles/internal_990/public/2024-06/2_1.png.webp?itok=lrEIdJX6',
  },
  {
    id: 'galletas',
    name: 'Galletas y Snacks',
    image: 'https://content.cuerpomente.com/medio/2022/12/20/galletas-de-avena-y-platano_21865895_1280x720.jpg',
  },
  {
    id: 'suplementos',
    name: 'Suplementos',
    image: 'https://www.infisport.com/media/amasty/blog/Creatina_1_6.jpg',
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
