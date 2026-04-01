const Footer = () => (
  <footer id="contacto" className="bg-foreground text-primary-foreground py-16">
    <div className="container mx-auto px-4">
      <div className="grid md:grid-cols-3 gap-10 mb-10">
        <div>
          <h3 className="font-heading text-xl font-bold mb-3">Hotel Paseo de la Presa</h3>
          <p className="text-primary-foreground/70 text-sm font-body leading-relaxed">
            Elegancia colonial en el corazón de Guanajuato. Hospedaje automatizado con la calidez de México.
          </p>
        </div>
        <div>
          <h4 className="font-heading text-sm font-semibold mb-3 uppercase tracking-wider">Enlaces</h4>
          <ul className="space-y-2 text-sm font-body text-primary-foreground/70">
            <li><a href="#inicio" className="hover:text-primary transition-colors">Inicio</a></li>
            <li><a href="#habitaciones" className="hover:text-primary transition-colors">Habitaciones</a></li>
            <li><a href="#reservar" className="hover:text-primary transition-colors">Reservar</a></li>
            <li><a href="#servicios" className="hover:text-primary transition-colors">Servicios</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-heading text-sm font-semibold mb-3 uppercase tracking-wider">Contacto</h4>
          <ul className="space-y-2 text-sm font-body text-primary-foreground/70">
            <li>Ctra. Panorámica Pípila-ISSSTE S/N, Guanajuato</li>
            <li>+52 473 121 12 64</li>
            <li>alanbatman09@gmail.com</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-primary-foreground/10 pt-6 text-center text-xs text-primary-foreground/50 font-body">
        © {new Date().getFullYear()} Hotel Paseo de la Presa. Todos los derechos reservados.
      </div>
    </div>
  </footer>
);

export default Footer;
