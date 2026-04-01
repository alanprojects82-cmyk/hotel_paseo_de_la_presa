import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const quickAnswers: Record<string, string> = {
  precio: "Nuestras tarifas comienzan desde $859 MXN/noche (Estándar) hasta $1,800 MXN/noche (Suite Premium). ¡Calificación de 4.0 estrellas con 203 reseñas!",
  habitacion: "Contamos con 3 tipos: Estándar ($859 MXN), Deluxe con desayuno ($1,197 MXN) y Suite Premium ($1,800 MXN). Todas incluyen Wi-Fi gratis, A/C y estacionamiento.",
  ubicacion: "Estamos en Carretera Panorámica Pípila-ISSSTE S/N, P.º de La Presa, 36000 Guanajuato. Cerca del Teatro Juárez y el Jardín de la Unión. Tel: +52 473 106 7596.",
  checkin: "El check-in es a las 3:00 PM y el check-out a las 12:00 PM. Contamos con recepción las 24 horas.",
  estacionamiento: "¡Sí! Contamos con estacionamiento privado y completamente gratuito para nuestros huéspedes.",
  restaurante: "Tenemos restaurante en el hotel. El desayuno está disponible con cargo adicional. Ofrecemos servicio de lavandería completo y limpieza diaria.",
  alberca: "Contamos con alberca al aire libre. ¡Perfecta para relajarte después de explorar Guanajuato!",
  mascota: "¡Sí, somos Pet Friendly! 🐕 Se permiten mascotas (perros) con un cargo adicional.",
  cancelacion: "Ofrecemos cancelación gratuita según la tarifa seleccionada. La opción estándar permite cancelar gratis hasta 48 horas antes del check-in.",
  perro: "¡Sí, somos Pet Friendly! 🐕 Se permiten perros con un cargo adicional. ¡Trae a tu compañero peludo!",
  wifi: "¡El Wi-Fi es completamente gratuito en todas las áreas del hotel!",
  aire: "Contamos con aire acondicionado en las habitaciones para tu máximo confort.",
  telefono: "Puedes contactarnos al +52 473 106 7596. Nuestra recepción está disponible las 24 horas.",
  desayuno: "Ofrecemos desayuno con cargo adicional. La habitación Deluxe lo incluye en la tarifa.",
};

function findAnswer(input: string): string {
  const lower = input.toLowerCase();
  for (const [key, answer] of Object.entries(quickAnswers)) {
    if (lower.includes(key)) return answer;
  }
  if (lower.includes("reserv")) return "¡Puedes hacer tu reserva directamente en nuestra sección 'Reservar Ahora'! El proceso es 100% automatizado y recibirás confirmación inmediata.";
  if (lower.includes("hola") || lower.includes("buenos") || lower.includes("buenas"))
    return "¡Hola! 👋 Bienvenido al Hotel Paseo de la Presa. ¿En qué puedo ayudarte? Puedes preguntarme sobre habitaciones, precios, servicios, ubicación o reservaciones.";
  return "Gracias por tu mensaje. Puedo ayudarte con información sobre habitaciones, precios, servicios, ubicación, check-in/check-out y políticas de cancelación. ¿Qué te gustaría saber?";
}

const ChatBot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "¡Hola! 👋 Soy el asistente virtual del Hotel Paseo de la Presa. ¿En qué puedo ayudarte hoy?" },
  ]);
  const [input, setInput] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = () => {
    if (!input.trim()) return;
    const userMsg: Message = { role: "user", content: input.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setTimeout(() => {
      setMessages((prev) => [...prev, { role: "assistant", content: findAnswer(userMsg.content) }]);
    }, 600);
  };

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center hover:opacity-90 transition-opacity"
        aria-label="Abrir chat"
      >
        {open ? <X size={22} /> : <MessageCircle size={22} />}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 z-50 w-[340px] max-h-[480px] bg-card rounded-xl border border-border shadow-xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-primary text-primary-foreground px-4 py-3">
              <p className="font-heading text-sm font-semibold">Asistente Virtual</p>
              <p className="text-[10px] opacity-80 font-body">Disponible 24/7</p>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-[250px]">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] rounded-lg px-3 py-2 text-sm font-body ${
                      m.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-secondary-foreground"
                    }`}
                  >
                    {m.content}
                  </div>
                </div>
              ))}
              <div ref={endRef} />
            </div>

            {/* Input */}
            <div className="border-t border-border p-3 flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send()}
                placeholder="Escribe tu pregunta..."
                className="flex-1 border border-border rounded-md px-3 py-2 text-sm font-body bg-background text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
              />
              <button onClick={send} className="bg-primary text-primary-foreground p-2 rounded-md hover:opacity-90 transition-opacity" aria-label="Enviar mensaje">
                <Send size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBot;
