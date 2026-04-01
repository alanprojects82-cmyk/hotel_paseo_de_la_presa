import { motion } from "framer-motion";
import heroImg from "@/assets/hero-hotel.jpg";

const HeroSection = () => {
  const scrollToBooking = () => {
    document.querySelector("#reservar")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="inicio" className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      <img
        src={heroImg}
        alt="Hotel Paseo de la Presa - Fachada colonial en Guanajuato"
        className="absolute inset-0 w-full h-full object-cover"
        width={1920}
        height={1080}
      />
      <div className="absolute inset-0 bg-foreground/50" />

      <div className="relative z-10 text-center px-4 max-w-3xl">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-primary-foreground/80 text-sm tracking-[0.4em] uppercase font-body mb-4"
        >
          Bienvenido a
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground leading-tight mb-6"
        >
          Hotel Paseo
          <br />
          de la Presa
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-primary-foreground/90 text-lg md:text-xl font-body font-light mb-8 max-w-xl mx-auto"
        >
          ⭐ 4.0 estrellas · 203 reseñas · Cerca del Teatro Juárez y el Jardín de la Unión. Alberca, Wi-Fi y estacionamiento gratis.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button
            onClick={scrollToBooking}
            className="bg-primary text-primary-foreground px-8 py-3 rounded-md text-base font-medium hover:opacity-90 transition-opacity"
          >
            Reservar Ahora
          </button>
          <button
            onClick={() => document.querySelector("#habitaciones")?.scrollIntoView({ behavior: "smooth" })}
            className="border border-primary-foreground/40 text-primary-foreground px-8 py-3 rounded-md text-base font-medium hover:bg-primary-foreground/10 transition-colors"
          >
            Ver Habitaciones
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
