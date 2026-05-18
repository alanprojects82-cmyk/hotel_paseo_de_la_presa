import { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";

const links = [
  { href: "#inicio", label: "Inicio" },
  { href: "#habitaciones", label: "Habitaciones" },
  { href: "#servicios", label: "Servicios" },
  { href: "#ubicacion", label: "Ubicación" },
  { href: "#contacto", label: "Contacto" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const isHome = location.pathname === "/";

  const scrollTo = (href: string) => {
    setOpen(false);

    const element = document.querySelector(href);

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/40 backdrop-blur-md border-b border-white/10">
      <div className="container mx-auto flex items-center justify-between py-4 px-4">

        {/* LOGO */}
        <Link
          to="/"
          className="flex flex-col items-start leading-none"
        >
          <span className="text-xl font-bold tracking-wide text-[#f5e6d3]">
            Hotel Paseo de la Presa
          </span>

          <span className="text-[10px] uppercase tracking-[0.3em] text-[#e7d7c3]">
            Guanajuato, México
          </span>
        </Link>

        {/* DESKTOP */}
        <div className="hidden md:flex items-center gap-6">

          {/* BOTONES DE SCROLL */}
          {isHome &&
            links.map((l) => (
              <button
                key={l.href}
                onClick={() => scrollTo(l.href)}
                className="text-sm text-[#f5e6d3] hover:text-white transition-colors"
              >
                {l.label}
              </button>
            ))}

          {/* BOTÓN RESERVAR */}
          {isHome && (
            <button
              onClick={() => scrollTo("#reservar")}
              className="px-4 py-2 rounded-lg bg-[#7a1f2b] text-white hover:opacity-90 transition shadow-lg"
            >
              Reservar Ahora
            </button>
          )}

          {/* BOTÓN DASHBOARD */}
          <Link
            to="/dashboard"
            className="px-4 py-2 rounded-lg border border-[#e7d7c3]/40 bg-white/10 text-[#f5e6d3] hover:bg-white/20 transition shadow-lg"
          >
            Dashboards Ejecutivos
          </Link>
        </div>

        {/* MOBILE TOGGLE */}
        <button
          className="md:hidden text-[#f5e6d3]"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden bg-[#2b0f14]/95 border-t border-white/10"
          >
            <div className="flex flex-col gap-4 p-6">

              {/* LINKS */}
              {isHome &&
                links.map((l) => (
                  <button
                    key={l.href}
                    onClick={() => scrollTo(l.href)}
                    className="text-left text-sm text-[#f5e6d3]"
                  >
                    {l.label}
                  </button>
                ))}

              {/* RESERVAR */}
              {isHome && (
                <button
                  onClick={() => scrollTo("#reservar")}
                  className="px-4 py-2 rounded-lg bg-[#7a1f2b] text-white hover:opacity-90 transition"
                >
                  Reservar Ahora
                </button>
              )}

              {/* DASHBOARD */}
              <Link
                to="/dashboard"
                className="px-4 py-2 rounded-lg border border-[#e7d7c3]/40 bg-white/10 text-[#f5e6d3] text-center hover:bg-white/20 transition"
              >
                Dashboards Ejecutivos
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;