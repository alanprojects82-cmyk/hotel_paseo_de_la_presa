import { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { href: "#inicio", label: "Inicio" },
  { href: "#habitaciones", label: "Habitaciones" },
  { href: "#servicios", label: "Servicios" },
  { href: "#ubicacion", label: "Ubicación" },
  { href: "#contacto", label: "Contacto" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const scrollTo = (href: string) => {
    setOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
      <div className="container mx-auto flex items-center justify-between py-4 px-4">
        <button onClick={() => scrollTo("#inicio")} className="flex flex-col items-start leading-none">
          <span className="font-heading text-xl font-bold tracking-wide text-foreground">Hotel Paseo de la Presa</span>
          <span className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground font-body">Guanajuato, México</span>
        </button>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <button key={l.href} onClick={() => scrollTo(l.href)} className="text-sm font-body text-muted-foreground hover:text-primary transition-colors">
              {l.label}
            </button>
          ))}
          <button onClick={() => scrollTo("#reservar")} className="bg-primary text-primary-foreground px-5 py-2 rounded-md text-sm font-medium hover:opacity-90 transition-opacity">
            Reservar Ahora
          </button>
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden text-foreground" onClick={() => setOpen(!open)}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden bg-background border-b border-border"
          >
            <div className="flex flex-col gap-4 p-6">
              {links.map((l) => (
                <button key={l.href} onClick={() => scrollTo(l.href)} className="text-left text-sm font-body text-muted-foreground hover:text-primary">
                  {l.label}
                </button>
              ))}
              <button onClick={() => scrollTo("#reservar")} className="bg-primary text-primary-foreground px-5 py-2 rounded-md text-sm font-medium mt-2">
                Reservar Ahora
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
