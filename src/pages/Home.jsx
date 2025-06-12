import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <div className="home">
      <header className="hero">
        <div className="hero-content">
          <h1>LA CABRERA</h1>
          <p className="subtitle">Parrilla & Vinos</p>
          <div className="hero-buttons">
            <Link to="/menu" className="btn btn-primary">VER MENÚ</Link>
            <Link to="/reservations" className="btn btn-secondary">RESERVAR</Link>
          </div>
        </div>
      </header>

      <section className="about">
        <div className="about-content">
          <h2>Nuestra Historia</h2>
          <p>Desde 1999, La Cabrera se ha convertido en un ícono de la parrilla argentina, ofreciendo cortes premium en un ambiente cálido y sofisticado en el corazón de Palermo.</p>
        </div>
      </section>

      <section className="highlights">
        <h2>Nuestros Platos Destacados</h2>
        <div className="dishes-grid">
          <div className="dish">
            <div 
              className="dish-img"
              style={{
                backgroundImage: 'url(https://static.esnota.com/uploads/2024/10/bife-de-chorizo.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '200px',
                width: '100%',
                borderRadius: '8px 8px 0 0'
              }}
            ></div>
            <h3>Bife de Chorizo</h3>
            <p>Corte premium de 400g con guarnición</p>
          </div>
          <div className="dish">
            <div 
              className="dish-img"
              style={{
                backgroundImage: 'url(https://www.lacasadelqueso.com.ar/wp-content/uploads/2017/07/provoleta-queso-provolone.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '200px',
                width: '100%',
                borderRadius: '8px 8px 0 0'
              }}
            ></div>
            <h3>Provoleta</h3>
            <p>Queso provolone a la parrilla con hierbas</p>
          </div>
          <div className="dish">
            <div 
              className="dish-img"
              style={{
                backgroundImage: 'url(https://cloudfront-us-east-1.images.arcpublishing.com/infobae/VJKZQ3F7IZA2TLCZPMK245M3VE.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '200px',
                width: '100%',
                borderRadius: '8px 8px 0 0'
              }}
            ></div>
            <h3>Choripán</h3>
            <p>Clásico chorizo en pan casero</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
