import { useEffect } from 'react';
import { WHATSAPP_LINK } from '../config/campaignLinks';
import './LandingPage.css';

/**
 * Landing Page Component
 * 
 * @param {Object} props
 * @param {string} props.slug - Slug atual da URL (para tracking/analytics)
 * 
 * IMPORTANTE: O link do WhatsApp é FIXO e ÚNICO, importado diretamente
 * da constante WHATSAPP_LINK. Não varia baseado na slug.
 */
function LandingPage({ slug }) {

  // Initialize carousels and progress bar
  useEffect(() => {
    // Progress Bar
    const handleScroll = () => {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      const progressBar = document.getElementById('progressBar');
      if (progressBar) {
        progressBar.style.width = scrolled + '%';
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Carousel System
    const carousels = {};

    const initCarousel = (containerId) => {
      const container = document.getElementById(containerId);
      if (!container) return;
      
      const track = container.querySelector('.carousel-track');
      const slides = track?.querySelectorAll('.carousel-slide');
      const nav = container.querySelector('.carousel-nav');
      
      if (!track || !slides || !nav) return;

      carousels[containerId] = {
        currentIndex: 0,
        totalSlides: slides.length,
        track: track
      };

      nav.innerHTML = '';
      for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('div');
        dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
        dot.onclick = () => goToSlide(containerId, i);
        nav.appendChild(dot);
      }

      updateCarousel(containerId);
    };

    const moveCarousel = (containerId, direction) => {
      const carousel = carousels[containerId];
      if (!carousel) return;
      
      carousel.currentIndex += direction;
      
      if (carousel.currentIndex < 0) {
        carousel.currentIndex = carousel.totalSlides - 1;
      } else if (carousel.currentIndex >= carousel.totalSlides) {
        carousel.currentIndex = 0;
      }
      
      updateCarousel(containerId);
    };

    const goToSlide = (containerId, index) => {
      const carousel = carousels[containerId];
      if (!carousel) return;
      carousel.currentIndex = index;
      updateCarousel(containerId);
    };

    const updateCarousel = (containerId) => {
      const carousel = carousels[containerId];
      const container = document.getElementById(containerId);
      if (!carousel || !container) return;
      
      const nav = container.querySelector('.carousel-nav');
      const dots = nav?.querySelectorAll('.carousel-dot');
      
      carousel.track.style.transform = `translateX(-${carousel.currentIndex * 100}%)`;
      
      dots?.forEach((dot, index) => {
        dot.classList.toggle('active', index === carousel.currentIndex);
      });
    };

    // Make moveCarousel available globally for arrow buttons
    window.moveCarousel = moveCarousel;

    // Initialize carousels
    initCarousel('testimonials-carousel');
    initCarousel('method-carousel');
    initCarousel('stats-carousel');
    initCarousel('benefits-carousel');

    // Auto-play carousels
    const intervals = [
      setInterval(() => moveCarousel('testimonials-carousel', 1), 4000),
      setInterval(() => moveCarousel('method-carousel', 1), 4000),
      setInterval(() => moveCarousel('stats-carousel', 1), 4500),
      setInterval(() => moveCarousel('benefits-carousel', 1), 4500),
    ];

    return () => {
      window.removeEventListener('scroll', handleScroll);
      intervals.forEach(clearInterval);
    };
  }, []);

  // Toggle FAQ
  const toggleFaq = (e) => {
    e.currentTarget.classList.toggle('active');
  };

  // WhatsApp button with icon (usa link fixo importado)
  const WhatsAppButton = ({ href = WHATSAPP_LINK, className = "cta-whatsapp" }) => (
    <a 
      href={href} 
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      aria-label="Conversar no WhatsApp"
    >
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
      </svg>
      Conversar no WhatsApp
    </a>
  );

  // WhatsApp download link (usa link fixo importado)
  const WhatsAppDownloadLink = () => (
    <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="telegram-download-link">
      ¿Dudas? Escríbenos al WhatsApp
    </a>
  );

  return (
    <>
      {/* Progress Bar */}
      <div className="progress-bar" id="progressBar"></div>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-image">
            <img 
              src="/image/textos-vicente-imagens-no-ombro.webp" 
              alt="Vicente Perpétuo" 
              className="vicente-photo"
            />
          </div>

          <h1 className="hero-title" style={{ marginTop: '-25rem', position: 'relative', zIndex: 3 }}>
            EL <span className="accent">GRUPO MÁS GRANDE</span> DE <span className="accent">ANÁLISIS DE FÚTBOL</span> DE CHILE
          </h1>

          <p className="hero-subtitle" style={{ marginTop: '0.5rem', position: 'relative', zIndex: 3 }}>
            Tips diarias y ganancias todos los días | <span className="highlight">+15.000 Miembros Activos</span>
          </p>

          <div className="telegram-button-wrapper">
            <WhatsAppButton />
            <WhatsAppDownloadLink />
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="benefits-section">
        <div className="container">
          <h2 className="section-title" style={{ textAlign: 'center' }}>
            LO QUE RECIBES AL ENTRAR
          </h2>

          <div className="carousel-container" id="benefits-carousel">
            <button className="carousel-arrow prev" onClick={() => window.moveCarousel?.('benefits-carousel', -1)}>‹</button>
            <div className="carousel-track" id="benefits-track">
              {[
                { icon: '📲', title: 'Tips Diarias', desc: 'Análisis y tips enviadas directo a tu Telegram todos los días' },
                { icon: '📊', title: 'Planilla de Gestión', desc: 'Controla tu banca como un profesional con nuestra planilla exclusiva' },
                { icon: '🎓', title: 'Método Completo', desc: 'Aprende la estrategia detrás de cada tip y mejora tus propias análisis' },
                { icon: '🌎', title: 'Cobertura Total', desc: 'Champions, Libertadores, ligas europeas y más de 20 competiciones' },
                { icon: '👥', title: 'Comunidad Activa', desc: 'Intercambia experiencias con más de 15.000 miembros' },
                { icon: '🎯', title: 'Cuotas Altas', desc: 'Buscamos odds de 2.0+ con análisis que justifican cada entrada' },
              ].map((benefit, i) => (
                <div className="carousel-slide" key={i}>
                  <div className="benefits-grid">
                    <div className="benefit-card">
                      <div className="benefit-icon">{benefit.icon}</div>
                      <h3>{benefit.title}</h3>
                      <p>{benefit.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button className="carousel-arrow next" onClick={() => window.moveCarousel?.('benefits-carousel', 1)}>›</button>
            <div className="carousel-nav" id="benefits-nav"></div>
          </div>

          <div className="telegram-button-wrapper">
            <WhatsAppButton />
            <WhatsAppDownloadLink />
          </div>
        </div>
      </section>

      {/* Method Section */}
      <section className="method-section">
        <div className="container">
          <h2 className="section-title" style={{ textAlign: 'center' }}>
            EL MÉTODO VICENTE:<br />
            <span style={{ color: '#9EFF00' }}>CUOTAS CON ESTRATEGIA</span>
          </h2>

          <div className="carousel-container" id="method-carousel">
            <button className="carousel-arrow prev" onClick={() => window.moveCarousel?.('method-carousel', -1)}>‹</button>
            <div className="carousel-track" id="method-track">
              {[
                { icon: '🎯', title: 'Análisis Profundo', desc: 'Estudiamos cada partido a fondo: estadísticas, forma actual, lesiones, historial. Solo enviamos tips con alta probabilidad.' },
                { icon: '💰', title: 'Gestión de Banca', desc: 'Te enseñamos a gestionar tu dinero como un profesional. Nunca arriesgues más de lo necesario.' },
                { icon: '📈', title: 'Cuotas Altas Seguras', desc: 'Buscamos odds de 2.0 o más con análisis que justifican el riesgo. Más retorno con estrategia.' },
              ].map((method, i) => (
                <div className="carousel-slide" key={i}>
                  <div className="method-grid">
                    <div className="method-card">
                      <div className="method-icon">{method.icon}</div>
                      <h3>{method.title}</h3>
                      <p>{method.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button className="carousel-arrow next" onClick={() => window.moveCarousel?.('method-carousel', 1)}>›</button>
            <div className="carousel-nav" id="method-nav"></div>
          </div>

          <div className="telegram-button-wrapper">
            <WhatsAppButton />
            <WhatsAppDownloadLink />
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="results-section">
        <div className="container">
          <h2 className="section-title" style={{ textAlign: 'center' }}>
            LOS NÚMEROS HABLAN POR SÍ SOLOS
          </h2>

          <div className="carousel-container" id="stats-carousel">
            <button className="carousel-arrow prev" onClick={() => window.moveCarousel?.('stats-carousel', -1)}>‹</button>
            <div className="carousel-track" id="stats-track">
              {[
                { number: '15K+', label: 'Miembros Activos' },
                { number: '100K+', label: 'Seguidores en Redes' },
                { number: '2.5+', label: 'Odd Promedio' },
                { number: '20+', label: 'Ligas Analizadas' },
              ].map((stat, i) => (
                <div className="carousel-slide" key={i}>
                  <div className="stats-grid">
                    <div className="stat-card">
                      <span className="stat-number">{stat.number}</span>
                      <span className="stat-label">{stat.label}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button className="carousel-arrow next" onClick={() => window.moveCarousel?.('stats-carousel', 1)}>›</button>
            <div className="carousel-nav" id="stats-nav"></div>
          </div>

          <div className="telegram-button-wrapper">
            <WhatsAppButton />
            <WhatsAppDownloadLink />
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="social-proof">
        <div className="container">
          <h2 className="section-title">
            MIRA LO QUE ELLOS<br />TIENEN QUE DECIR:
          </h2>

          <p className="section-subtitle">
            Miles de chilenos ya están ganando con nuestros tips de cuotas altas
          </p>

          <div className="carousel-container" id="testimonials-carousel">
            <button className="carousel-arrow prev" onClick={() => window.moveCarousel?.('testimonials-carousel', -1)}>‹</button>
            <div className="carousel-track" id="testimonials-track">
              {[1, 2, 3, 4, 5].map((num) => (
                <div className="carousel-slide" key={num}>
                  <div className="slide-image-wrapper">
                    <img src={`/image/slide${num}.jpg`} alt={`Slide ${num}`} className="slide-image" />
                  </div>
                </div>
              ))}
            </div>
            <button className="carousel-arrow next" onClick={() => window.moveCarousel?.('testimonials-carousel', 1)}>›</button>
            <div className="carousel-nav" id="testimonials-nav"></div>
          </div>

          <div className="telegram-button-wrapper">
            <WhatsAppButton />
            <WhatsAppDownloadLink />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section">
        <div className="container">
          <h2 className="section-title" style={{ textAlign: 'center' }}>
            PREGUNTAS FRECUENTES
          </h2>

          <div className="faq-container">
            {[
              { q: '¿Es realmente gratis?', a: '¡Sí! El acceso al grupo de Telegram es completamente gratuito. Recibes todas las tips diarias sin pagar nada.' },
              { q: '¿Cuántas tips recibo por día?', a: 'Enviamos de 2 a 4 tips diarias en promedio. Priorizamos calidad sobre cantidad - solo enviamos cuando identificamos oportunidades reales.' },
              { q: '¿Necesito experiencia en apuestas?', a: 'No, enseñamos todo desde cero. Incluye guía completa para principiantes y método de gestión de banca.' },
              { q: '¿Cuánto necesito invertir?', a: 'Puedes empezar con muy poco - desde $5.000 CLP. Lo importante es seguir nuestro método de gestión de banca.' },
              { q: '¿Qué ligas cubren?', a: 'Más de 20 ligas: Champions League, Libertadores, Premier League, LaLiga, Serie A, Bundesliga, Liga Chilena y muchas más.' },
            ].map((faq, i) => (
              <div className="faq-item" key={i} onClick={toggleFaq}>
                <div className="faq-question">
                  {faq.q}
                  <span className="faq-icon">▼</span>
                </div>
                <div className="faq-answer">{faq.a}</div>
              </div>
            ))}
          </div>

          <div className="telegram-button-wrapper">
            <WhatsAppButton />
            <WhatsAppDownloadLink />
          </div>
        </div>
      </section>

      {/* Final CTA Section - USA O LINK FIXO DO WHATSAPP */}
      <section className="final-cta" id="whatsapp-section">
        <div className="container">
          <h2>¡ENTRA AHORA AL GRUPO VIP!</h2>
          
          <p className="final-cta-text">
            🔥 Solo quedan 3 cupos disponibles<br />
            ¡No te quedes afuera del grupo que más acierta en Chile!
          </p>

          <div className="telegram-button-wrapper">
            {/* BOTÃO WHATSAPP COM LINK FIXO E ÚNICO */}
            <WhatsAppButton />
            {/* LINK DE SUPORTE WHATSAPP (FIXO) */}
            <WhatsAppDownloadLink />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <p>&copy; 2024 Vicente Perpétuo - Grupo de Cuotas Altas. Todos los derechos reservados.</p>
        <div className="footer-links">
          <a href="#">Términos y Condiciones</a>
          <a href="#">Política de Privacidad</a>
          <a href="#">Contacto</a>
        </div>
      </footer>
    </>
  );
}

export default LandingPage;


