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

  // Initialize progress bar
  useEffect(() => {
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

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

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

          <div className="hero-text-content">
            <div className="hero-headline-image">
              <img 
                src="/image/vicente_grupos.jpeg" 
                alt="Grupos Vicente Tips" 
                className="headline-image"
              />
            </div>

            <p className="hero-subtitle">
              Tips diarias y ganancias todos los días | <span className="highlight">+15.000 Miembros Activos</span>
            </p>

            <div className="telegram-button-wrapper">
              <WhatsAppButton />
              <WhatsAppDownloadLink />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <div className="footer-content">
          <div className="footer-main">
            <div className="footer-brand">
              <h3>Vicente Perpétuo</h3>
              <p>El grupo más grande de análisis de fútbol de Chile</p>
            </div>
            
            <div className="footer-stats">
              <div className="footer-stat">
                <span className="stat-number">15K+</span>
                <span className="stat-label">Miembros Activos</span>
              </div>
              <div className="footer-stat">
                <span className="stat-number">100K+</span>
                <span className="stat-label">Seguidores</span>
              </div>
              <div className="footer-stat">
                <span className="stat-number">2.5+</span>
                <span className="stat-label">Odd Promedio</span>
              </div>
            </div>

            <div className="footer-cta">
              <WhatsAppButton className="footer-whatsapp-btn" />
            </div>
          </div>

          <div className="footer-bottom">
            <div className="footer-links">
              <a href="#">Términos y Condiciones</a>
              <span className="separator">|</span>
              <a href="#">Política de Privacidad</a>
              <span className="separator">|</span>
              <a href="#">Contacto</a>
            </div>
            <p className="footer-copyright">
              &copy; 2024 Vicente Perpétuo - Grupo de Cuotas Altas. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}

export default LandingPage;


