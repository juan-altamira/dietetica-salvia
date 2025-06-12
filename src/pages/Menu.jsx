import { useNavigate } from 'react-router-dom';
import './Menu.css';

const Menu = () => {
  const navigate = useNavigate();

  const handleReservationClick = () => {
    navigate('/reservations');
  };
  const menuSections = [
    {
      title: 'ENTRADAS',
      items: [
        { name: 'Provoleta', description: 'Queso provolone a la parrilla con hierbas y miel', price: '4.200' },
        { name: 'Empanadas', description: 'Carne cortada a cuchillo, cebolla, huevo y aceitunas', price: '900 c/u' },
        { name: 'Matambre de cerdo', description: 'Con ensalada rusa y salsa criolla', price: '4.800' },
        { name: 'Rabas con salsa tártara', description: 'Aros de calamar rebozados y fritos, acompañados de salsa tártara', price: '6.500' },
      ],
    },
    {
      title: 'PLATOS PRINCIPALES - CARNES',
      items: [
        { name: 'Milanesa de ternera', description: 'Con guarnición a elección', price: '7.200' },
        { name: 'Suprema de pollo al disco', description: 'Pollo cocinado al disco con mezcla de verduras salteadas', price: '6.300' },
        { name: 'Milanesa de pollo crocante', description: 'Con ensalada fresca de lechuga, tomate y cebolla', price: '6.100' },
      ],
    },
    {
      title: 'PLATOS PRINCIPALES - PESCADOS Y MARISCOS',
      items: [
        { name: 'Salmón grillado', description: 'Con emulsión de cítricos y puré rústico de papas', price: '9.200' },
        { name: 'Paella de mariscos', description: 'Arroz con mariscos mixtos, azafrán y verduras (mínimo 2 personas)', price: '8.500 por porción' },
      ],
    },
    {
      title: 'PLATOS PRINCIPALES - PASTAS Y RISOTTOS',
      items: [
        { name: 'Risotto de hongos y espárragos', description: 'Arroz arborio cremoso con hongos portobellos y espárragos frescos', price: '5.300' },
        { name: 'Risotto de hongos y parmesano', description: 'Arroz cremoso con hongos salteados y queso parmesano', price: '5.300' },
        { name: 'Tagliatelle al "ragù" de lentejas', description: 'Pasta casera con salsa de lentejas, tomate y hierbas aromáticas', price: '4.800' },
        { name: 'Gnocchi de papa', description: 'Con salsa cremosa de cuatro quesos', price: '4.700' },
      ],
    },
    {
      title: 'PLATOS VEGETARIANOS',
      items: [
        { name: 'Curry de garbanzos y vegetales', description: 'Estofado de garbanzos con vegetales y especias, acompañado de arroz basmati', price: '4.600' },
        { name: 'Pastel de papas vegetariano', description: 'Capas de puré de papas, zucchini, berenjena y queso gratinado', price: '4.200' },
        { name: 'Omelette de espinaca', description: 'Tortilla rellena de espinaca, queso de cabra y nueces, acompañada de brotes frescos', price: '4.500' },
      ],
    },
    {
      title: 'CORTES PREMIUM',
      items: [
        { name: 'Bife de Chorizo', description: 'Corte premium de 400g con guarnición', price: '8.900' },
        { name: 'Ojo de Bife', description: 'Corte ancho y tierno de 450g', price: '9.800' },
        { name: 'Entraña', description: 'Corte jugoso de 350g con chimichurri', price: '8.200' },
        { name: 'Asado de tira', description: 'Corte premium de 350g con chimichurri', price: '7.800' },
      ],
    },
    {
      title: 'BEBIDAS',
      items: [
        { name: 'Agua mineral', description: 'Con gas o sin gas', price: '3.200' },
        { name: 'Limonada o Pomelada', description: '500ml - Refrescante bebida natural', price: '5.300' },
        { name: 'Limonada o Pomelada', description: '250ml - Versión chica', price: '3.500' },
        { name: 'Gaseosas', description: 'Variedad de sabores', price: '4.200' },
        { name: 'Jugo Exprimido', description: 'Fresco de frutas naturales', price: '4.700' },
      ],
    },
    {
      title: 'GUARNICIONES',
      items: [
        { name: 'Papas Fritas', price: '1.800' },
        { name: 'Ensalada Mixta', price: '2.100' },
        { name: 'Puré de Calabaza', price: '1.900' },
      ],
    },
  ];

  return (
    <div className="menu-container dark-bg" style={{ backgroundColor: '#1a1a1a' }}>
      <div className="menu-header">
        <h1>NUESTRO MENÚ</h1>
        <p className="menu-subtitle">Sabores auténticos de la parrilla argentina</p>
      </div>

      <div className="menu-sections">
        {menuSections.map((section, index) => (
          <div key={index} className="menu-section">
            <h2 className="section-title">{section.title}</h2>
            <div className="menu-items">
              {section.items.map((item, itemIndex) => (
                <div key={itemIndex} className="menu-item">
                  <div className="item-info">
                    <h3>{item.name}</h3>
                    {item.description && <p className="item-description">{item.description}</p>}
                  </div>
                  <span className="item-price">${item.price}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="menu-footer">
        <p>Consultar por nuestro menú de postres y vinos</p>
        <button className="reservation-button" onClick={handleReservationClick}>
          RESERVAR MESA
        </button>
      </div>
    </div>
  );
};

export default Menu;
