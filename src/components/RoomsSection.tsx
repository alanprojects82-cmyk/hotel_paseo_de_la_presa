import { motion } from "framer-motion";
import { Users, Wifi, Coffee, Bath } from "lucide-react";
import roomStandard from "@/assets/room-standard.jpg";
import roomDeluxe from "@/assets/room-deluxe.jpg";
import roomSuite from "@/assets/room-suite.jpg";

export interface Room {
  id: string;
  name: string;
  description: string;
  price: number;
  capacity: number;
  image: string;
  amenities: string[];
}

export const rooms: Room[] = [
  {
    id: "standard",
    name: "Habitación Estándar",
    description: "Habitación con 1 cama King, ideal para parejas o viajeros de negocios. Incluye Wi-Fi y estacionamiento gratuito.",
    price: 859,
    capacity: 2,
    image: roomStandard,
    amenities: ["Wi-Fi", "A/C", "TV", "Estacionamiento"],
  },
  {
    id: "deluxe",
    name: "Habitación Deluxe",
    description: "Espacio amplio con vista al Paseo de la Presa y decoración colonial. Incluye desayuno continental.",
    price: 1197,
    capacity: 2,
    image: roomDeluxe,
    amenities: ["Wi-Fi", "Desayuno", "A/C", "TV"],
  },
  {
    id: "suite",
    name: "Suite Premium",
    description: "Nuestra mejor habitación con sala de estar, terraza privada y servicio personalizado.",
    price: 1800,
    capacity: 3,
    image: roomSuite,
    amenities: ["Wi-Fi", "Terraza", "Sala", "Desayuno"],
  },
];

const iconMap: Record<string, React.ReactNode> = {
  "Wi-Fi": <Wifi size={14} />,
  Minibar: <Coffee size={14} />,
  Jacuzzi: <Bath size={14} />,
};

const RoomsSection = () => {
  const scrollToBooking = (roomId: string) => {
    const el = document.querySelector("#reservar");
    el?.scrollIntoView({ behavior: "smooth" });
    // dispatch custom event for booking form to pick up
    window.dispatchEvent(new CustomEvent("select-room", { detail: roomId }));
  };

  return (
    <section id="habitaciones" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-primary text-sm tracking-[0.3em] uppercase font-body mb-2">Alojamiento</p>
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-foreground">Nuestras Habitaciones</h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {rooms.map((room, i) => (
            <motion.div
              key={room.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="bg-card rounded-lg overflow-hidden border border-border group"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={room.image}
                  alt={room.name}
                  loading="lazy"
                  width={800}
                  height={600}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-heading text-xl font-semibold text-foreground">{room.name}</h3>
                  <div className="flex items-center gap-1 text-muted-foreground text-xs">
                    <Users size={14} />
                    <span>{room.capacity}</span>
                  </div>
                </div>
                <p className="text-muted-foreground text-sm mb-4 font-body">{room.description}</p>
                <div className="flex flex-wrap gap-2 mb-5">
                  {room.amenities.map((a) => (
                    <span key={a} className="flex items-center gap-1 text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded-full">
                      {iconMap[a] || null}
                      {a}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-heading font-bold text-foreground">${room.price.toLocaleString()}</span>
                    <span className="text-muted-foreground text-xs ml-1">MXN / noche</span>
                  </div>
                  <button
                    onClick={() => scrollToBooking(room.id)}
                    className="bg-primary text-primary-foreground text-sm px-4 py-2 rounded-md hover:opacity-90 transition-opacity"
                  >
                    Reservar
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RoomsSection;
