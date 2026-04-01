import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

const LocationSection = () => (
  <section id="ubicacion" className="py-24 bg-secondary/50">
    <div className="container mx-auto px-4">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
        <p className="text-primary text-sm tracking-[0.3em] uppercase font-body mb-2">Encuéntranos</p>
        <h2 className="font-heading text-3xl md:text-5xl font-bold text-foreground">Ubicación</h2>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-10">
        <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-6">
          <div className="flex items-start gap-4">
            <MapPin size={20} className="text-primary mt-1 shrink-0" />
            <div>
              <h3 className="font-heading text-lg font-semibold text-foreground">Dirección</h3>
              <p className="text-muted-foreground text-sm font-body">Carretera Panorámica Pípila-ISSSTE S/N, P.º de La Presa, 36000 Guanajuato, Gto., México</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <Phone size={20} className="text-primary mt-1 shrink-0" />
            <div>
              <h3 className="font-heading text-lg font-semibold text-foreground">Teléfono</h3>
              <p className="text-muted-foreground text-sm font-body">+52 473 121 12 64</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <Mail size={20} className="text-primary mt-1 shrink-0" />
            <div>
              <h3 className="font-heading text-lg font-semibold text-foreground">Correo</h3>
              <p className="text-muted-foreground text-sm font-body">alanbatman09@gmail.com</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <Clock size={20} className="text-primary mt-1 shrink-0" />
            <div>
              <h3 className="font-heading text-lg font-semibold text-foreground">Horario de Recepción</h3>
              <p className="text-muted-foreground text-sm font-body">Recepción 24 horas · Check-in: 3:00 PM · Check-out: 12:00 PM</p>
              <a
  href="https://wa.me/524731211264"
  target="_blank"
  rel="noopener noreferrer"
  className="mt-4 inline-block bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
>
  📲 Contactar por WhatsApp
</a>
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="rounded-xl overflow-hidden border border-border h-[350px]">
          <iframe
            title="Ubicación Hotel Paseo de la Presa Guanajuato"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.6359840535324!2d-101.25422079001446!3d21.007223988438792!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x842b73ff8d8ed3fd%3A0xc883b6c017d3b44c!2sHotel%20Paseo%20de%20La%20Presa!5e0!3m2!1ses-419!2smx!4v1775070504992!5m2!1ses-419!2smx"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </motion.div>
      </div>
    </div>
  </section>
);

export default LocationSection;
