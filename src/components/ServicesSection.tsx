import { motion } from "framer-motion";
import { Wifi, Car, UtensilsCrossed, Waves, Sparkles, ShieldCheck } from "lucide-react";
import poolImg from "@/assets/hotel-pool.jpg";

const services = [
  { icon: <Wifi size={24} />, title: "Wi-Fi Gratuito", desc: "Conexión de alta velocidad sin costo en todas las áreas del hotel." },
  { icon: <Car size={24} />, title: "Estacionamiento Gratis", desc: "Estacionamiento privado y seguro sin costo adicional para huéspedes." },
  { icon: <UtensilsCrossed size={24} />, title: "Restaurante", desc: "Restaurante con desayuno disponible (cargo adicional) y cocina regional." },
  { icon: <Waves size={24} />, title: "Alberca al Aire Libre", desc: "Disfruta de nuestra alberca al aire libre con vista panorámica." },
  { icon: <Sparkles size={24} />, title: "Pet Friendly", desc: "Se permiten mascotas (perros) con cargo adicional. ¡Trae a tu compañero!" },
  { icon: <ShieldCheck size={24} />, title: "Recepción 24 Horas", desc: "Servicio de recepción las 24 horas, guardaequipaje y servicio de despertador." },
];

const ServicesSection = () => (
  <section id="servicios" className="py-24 bg-background">
    <div className="container mx-auto px-4">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
        <p className="text-primary text-sm tracking-[0.3em] uppercase font-body mb-2">Experiencia</p>
        <h2 className="font-heading text-3xl md:text-5xl font-bold text-foreground">Nuestros Servicios</h2>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div className="grid sm:grid-cols-2 gap-6">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-5 rounded-lg bg-card border border-border hover:border-primary/30 transition-colors"
            >
              <div className="text-primary mb-3">{s.icon}</div>
              <h3 className="font-heading text-lg font-semibold text-foreground mb-1">{s.title}</h3>
              <p className="text-muted-foreground text-sm font-body">{s.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="rounded-xl overflow-hidden">
          <img src={poolImg} alt="Alberca del Hotel Paseo de la Presa" loading="lazy" width={800} height={600} className="w-full h-full object-cover" />
        </motion.div>
      </div>
    </div>
  </section>
);

export default ServicesSection;
