import { useState } from 'react';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock } from 'react-icons/fa';
import './Contact.css';

const Contact = () => {
  // Agregamos la clase dark-bg al contenedor principal para asegurar contraste en el texto
  const [form, setForm] = useState({ 
    name: '', 
    email: '', 
    phone: '',
    subject: 'Consulta',
    message: '' 
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simular envío del formulario
    setTimeout(() => {
      console.log('Mensaje enviado:', form);
      setIsSubmitting(false);
      setIsSuccess(true);
      
      // Resetear formulario después de 3 segundos
      setTimeout(() => {
        setForm({ 
          name: '', 
          email: '', 
          phone: '',
          subject: 'Consulta',
          message: '' 
        });
        setIsSuccess(false);
      }, 3000);
    }, 1500);
  };

  const contactInfo = [
    {
      icon: <FaMapMarkerAlt className="contact-icon" />,
      title: 'Dirección',
      content: 'Cabrera 5099, Palermo, CABA, Argentina',
      link: 'https://goo.gl/maps/example',
      isLink: true
    },
    {
      icon: <FaPhone className="contact-icon" />,
      title: 'Teléfono',
      content: '(+54 9 11) 6875-4000',
      link: 'tel:+541168754000',
      isLink: true
    },
    {
      icon: <FaEnvelope className="contact-icon" />,
      title: 'Email',
      content: 'info@lacabrera.com.ar',
      link: 'mailto:info@lacabrera.com.ar',
      isLink: true
    },
    {
      icon: <FaClock className="contact-icon" />,
      title: 'Horario de atención',
      content: 'Lunes a Domingo\n12:00 - 15:30 hs / 20:00 - 23:30 hs',
      isLink: false
    }
  ];

  if (isSuccess) {
    return (
      <div className="contact-success">
        <div className="success-message">
          <h2>¡Mensaje Enviado!</h2>
          <p>Gracias por contactarte con nosotros. Te responderemos a la brevedad.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="contact-container dark-bg" style={{ backgroundColor: '#1a1a1a' }}>
      <div className="contact-header">
        <h1>CONTÁCTANOS</h1>
        <p className="subtitle">Estamos aquí para responder a tus consultas</p>
      </div>

      <div className="contact-content">
        <div className="contact-form-container">
          <h2>Envíanos un mensaje</h2>
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Nombre completo *</label>
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

            <div className="form-group">
              <label htmlFor="phone">Teléfono</label>
              <input 
                type="tel" 
                id="phone" 
                name="phone" 
                value={form.phone} 
                onChange={handleChange} 
                placeholder="+54 9 11 1234-5678"
              />
            </div>

            <div className="form-group">
              <label htmlFor="subject">Asunto</label>
              <select 
                id="subject" 
                name="subject" 
                value={form.subject} 
                onChange={handleChange}
              >
                <option value="Consulta">Consulta general</option>
                <option value="Reserva">Reserva de mesa</option>
                <option value="Evento">Evento privado</option>
                <option value="Trabajo">Trabajá con nosotros</option>
                <option value="Otro">Otro asunto</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="message">Mensaje *</label>
              <textarea 
                id="message" 
                name="message" 
                value={form.message} 
                onChange={handleChange} 
                required 
                placeholder="¿En qué podemos ayudarte?"
                rows="5"
              />
            </div>

            <div className="form-submit">
              <button 
                type="submit" 
                className="submit-button"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Enviando...' : 'ENVIAR MENSAJE'}
              </button>
            </div>
          </form>
        </div>

        <div className="contact-info-container">
  <div className="contact-info-box1">
    <h2>Información de contacto</h2>
  </div>
  <div className="contact-separator"></div>
  <div className="contact-info-box2">
    <p className="contact-description">
      Estamos disponibles para responder tus consultas y recibir tus comentarios. No dudes en contactarnos a través de cualquiera de estos canales.
    </p>
  </div>
  <div className="contact-separator"></div>
  <div className="contact-info-box3">
    <div className="contact-details">
      <div className="contact-detail">
        <div className="contact-text">
          <h3>Dirección</h3>
          <p>Cabrera 5099, Palermo, CABA, Argentina</p>
        </div>
      </div>
      <div className="contact-detail">
        <div className="contact-text">
          <h3>Teléfono</h3>
          <a href="tel:+541168754000">(+54 9 11) 6875-4000</a>
        </div>
      </div>
      <div className="contact-detail">
        <div className="contact-text">
          <h3>Email</h3>
          <a href="mailto:info@lacabrera.com.ar">info@lacabrera.com.ar</a>
        </div>
      </div>
      <div className="contact-detail">
        <div className="contact-text">
          <h3>Horario de atención</h3>
          <p>Lunes a Domingo<br />12:00 - 15:30 hs / 20:00 - 23:30 hs</p>
        </div>
      </div>
    </div>
  </div>
</div>
      </div>

      <div className="map-container">
        <iframe 
          title="Ubicación del restaurante"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3284.0728250271105!2d-58.43078492439998!3d-34.60298375739038!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcca64542b9f79%3A0x10b82e08a0f8e3b!2sLa%20Cabrera!5e0!3m2!1sen!2sar!4v1620000000000!5m2!1sen!2sar" 
          width="100%" 
          height="450" 
          style={{ border: 0 }} 
          allowFullScreen="" 
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
};

export default Contact;
