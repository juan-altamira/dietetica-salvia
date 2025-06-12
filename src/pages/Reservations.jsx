import { useState } from 'react';
import './Reservations.css';

const Reservations = () => {
  // Agregamos la clase dark-bg al contenedor principal para asegurar contraste en el texto
  const [form, setForm] = useState({ 
    name: '', 
    email: '', 
    phone: '', 
    date: '', 
    time: '', 
    guests: '2',
    specialRequests: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulación de envío de formulario
    setTimeout(() => {
      console.log('Reserva enviada:', form);
      setIsSubmitting(false);
      setIsSuccess(true);
      // Reset form after 3 seconds
      setTimeout(() => {
        setForm({ 
          name: '', 
          email: '', 
          phone: '', 
          date: '', 
          time: '', 
          guests: '2',
          specialRequests: ''
        });
        setIsSuccess(false);
      }, 3000);
    }, 1500);
  };

  const today = new Date().toISOString().split('T')[0];
  const maxDate = new Date();
  maxDate.setMonth(maxDate.getMonth() + 3);
  const maxDateStr = maxDate.toISOString().split('T')[0];

  if (isSuccess) {
    return (
      <div className="reservation-success">
        <div className="success-message">
          <h2>¡Reserva Confirmada!</h2>
          <p>Hemos recibido tu solicitud de reserva para el {form.date} a las {form.time}.</p>
          <p>Te esperamos en nuestro restaurante.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="reservations-container dark-bg" style={{ backgroundColor: '#1a1a1a' }}>
      <div className="reservations-header">
        <h1>RESERVAS</h1>
        <p className="subtitle">Reserva tu mesa en nuestro restaurante</p>
      </div>

      <div className="reservation-form-container">
        <form onSubmit={handleSubmit} className="reservation-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name">Nombre Completo *</label>
              <input 
                type="text" 
                id="name" 
                name="name" 
                value={form.name} 
                onChange={handleChange} 
                required 
                placeholder="Tu nombre"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="email">Email *</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                value={form.email} 
                onChange={handleChange} 
                required 
                placeholder="tu@email.com"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="phone">Teléfono *</label>
              <input 
                type="tel" 
                id="phone" 
                name="phone" 
                value={form.phone} 
                onChange={handleChange} 
                required 
                placeholder="+54 9 11 1234-5678"
              />
            </div>

            <div className="form-group">
              <label htmlFor="guests">Comensales *</label>
              <select 
                id="guests" 
                name="guests" 
                value={form.guests} 
                onChange={handleChange}
                required
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, '9+'].map(num => (
                  <option key={num} value={num}>
                    {num} {num === 1 ? 'persona' : num === '9+' ? 'o más personas' : 'personas'}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="date">Fecha *</label>
              <input 
                type="date" 
                id="date" 
                name="date" 
                value={form.date} 
                onChange={handleChange} 
                min={today}
                max={maxDateStr}
                required 
              />
            </div>

            <div className="form-group">
              <label htmlFor="time">Hora *</label>
              <select 
                id="time" 
                name="time" 
                value={form.time} 
                onChange={handleChange}
                required
              >
                <option value="">Selecciona una hora</option>
                {['12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
                  '20:00', '20:30', '21:00', '21:30', '22:00', '22:30', '23:00'].map(time => (
                  <option key={time} value={time}>{time} hs</option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group full-width">
            <label htmlFor="specialRequests">Pedidos especiales (opcional)</label>
            <textarea 
              id="specialRequests" 
              name="specialRequests" 
              value={form.specialRequests} 
              onChange={handleChange} 
              placeholder="Alergias, preferencias, celebraciones especiales..."
              rows="3"
            />
          </div>

          <div className="form-submit">
            <button 
              type="submit" 
              className="submit-button"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Procesando...' : 'RESERVAR MESA'}
            </button>
          </div>

          <p className="reservation-note">
            * Los campos son obligatorios. Te contactaremos para confirmar tu reserva.
          </p>
        </form>

        <div className="reservation-info">
          <h3>Horario de atención</h3>
          <p><strong>Almuerzo:</strong> 12:00 a 15:30 hs</p>
          <p><strong>Cena:</strong> 20:00 a 23:30 hs</p>
          
          <div className="contact-info">
            <h3>Contacto</h3>
            <p><i className="icon-phone"></i> (+54 9 11) 6875-4000</p>
            <p><i className="icon-email"></i> reservas@lacabrera.com.ar</p>
          </div>
          
          <div className="location">
            <h3>Ubicación</h3>
            <p>Cabrera 5099, Palermo, CABA</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reservations;
