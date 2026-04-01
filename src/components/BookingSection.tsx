import { useState, useEffect, useMemo } from "react";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";
import { CalendarDays, Users, CreditCard, CheckCircle2 } from "lucide-react";
import { rooms } from "./RoomsSection";
import { format, differenceInDays, addDays } from "date-fns";
import { es } from "date-fns/locale";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const BookingSection = () => {
  const today = new Date();
  const [checkIn, setCheckIn] = useState<Date | undefined>(undefined);
  const [checkOut, setCheckOut] = useState<Date | undefined>(undefined);
  const [selectedRoom, setSelectedRoom] = useState(rooms[0].id);
  const [guests, setGuests] = useState(1);
  const [pets, setPets] = useState(false);
const petFee = 249; // MXN por noche
  const [step, setStep] = useState(0); // 0 = form, 1 = summary, 2 = confirmed
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [reservationId, setReservationId] = useState("");
  pets: pets ? "Sí" : "No" // <-

  // Listen for room selection from RoomsSection
  useEffect(() => {
    const handler = (e: Event) => {
      const roomId = (e as CustomEvent).detail;
      if (rooms.find((r) => r.id === roomId)) setSelectedRoom(roomId);
    };
    window.addEventListener("select-room", handler);
    return () => window.removeEventListener("select-room", handler);
  }, []);

  const room = rooms.find((r) => r.id === selectedRoom)!;
  const nights = checkIn && checkOut ? differenceInDays(checkOut, checkIn) : 0;
  const subtotal = nights * room.price + (pets ? nights * petFee : 0);
const tax = Math.round(subtotal * 0.16);
const total = subtotal + tax;

  const message = `
* Hola, buenas tardes!

- Acabo de realizar una reservación en Hotel Paseo de la Presa.-

 Num. de reservación: #${reservationId}
 Nombre: ${name}
  Habitación: ${room.name}
  Huéspedes: ${guests}
Mascota: ${pets ? "Sí " : "No "}
  Check-in: ${checkIn ? format(checkIn, "dd MMM yyyy", { locale: es }) : ""} en horario de 3pm
  Check-out: ${checkOut ? format(checkOut, "dd MMM yyyy", { locale: es }) : ""} en horario de 12pm
 Total: $${total} MXN

* Quisiera recibir más información sobre mi estancia.

¡Gracias!
`;

  const canProceed = checkIn && checkOut && nights > 0;

const handleConfirm = () => {
  console.log("BOTÓN FUNCIONA 🔥");

  if (!name || !email) {
    console.log("Faltan datos ❌");
    return;
  }

  const newId = Math.floor(1000 + Math.random() * 9000) + String.fromCharCode(65 + Math.floor(Math.random() * 26));

  setReservationId(newId); //

  sendEmail(newId); //

  setStep(2);
};

const sendEmail = (reservationId: string) => {
console.log("CLICK DETECTADO 🔥");

  emailjs.send(
    'service_qjycng7',
    'template_ggwnf1f',
    {
      name: name,
      email: email,
      room: room.name,
      checkin: checkIn ? checkIn.toLocaleDateString() : '',
      checkout: checkOut ? checkOut.toLocaleDateString() : '',
      total: total,
      reservation_number: reservationId
    },
    '-SJbbXRCJg-uS6PmV'
  )
  .then(() => {
    console.log("Correo enviado ✅");
  })
  .catch((error) => {
    console.error("Error ❌:", error);
  });
};

  return (
    <section id="reservar" className="py-24 bg-secondary/50">
      <div className="container mx-auto px-4 max-w-3xl">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <p className="text-primary text-sm tracking-[0.3em] uppercase font-body mb-2">Reservaciones</p>
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-foreground">Reservar Ahora</h2>
          <p className="text-muted-foreground text-sm mt-3 font-body">Proceso 100% automatizado — sin esperas.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-card rounded-xl border border-border p-6 md:p-10 shadow-sm"
        >
          {/* Steps indicator */}
          <div className="flex items-center justify-center gap-4 mb-10">
            {[
              { icon: <CalendarDays size={18} />, label: "Fechas" },
              { icon: <CreditCard size={18} />, label: "Datos" },
              { icon: <CheckCircle2 size={18} />, label: "Confirmado" },
            ].map((s, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${step >= i ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                  {s.icon}
                </div>
                <span className={`text-xs font-body hidden sm:inline ${step >= i ? "text-foreground" : "text-muted-foreground"}`}>{s.label}</span>
                {i < 2 && <div className={`w-8 h-px ${step > i ? "bg-primary" : "bg-border"}`} />}
              </div>
            ))}
          </div>

          {step === 0 && (
            <div className="space-y-6">
              {/* Room selector */}
              <div>
                <label className="block text-sm font-body font-medium text-foreground mb-2">Tipo de habitación</label>
                <div className="grid grid-cols-3 gap-3">
                  {rooms.map((r) => (
                    <button
                      key={r.id}
                      onClick={() => setSelectedRoom(r.id)}
                      className={`text-left p-3 rounded-lg border text-sm font-body transition-colors ${selectedRoom === r.id ? "border-primary bg-primary/5" : "border-border hover:border-primary/40"}`}
                    >
                      <span className="block font-medium text-foreground text-xs">{r.name}</span>
                      <span className="text-muted-foreground text-xs">${r.price.toLocaleString()} / noche</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Dates */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-body font-medium text-foreground mb-2">Check-in</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <button className="w-full text-left border border-border rounded-md px-3 py-2 text-sm font-body text-foreground hover:border-primary/40 transition-colors">
                        {checkIn ? format(checkIn, "dd MMM yyyy", { locale: es }) : "Seleccionar fecha"}
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={checkIn}
                        onSelect={(d) => {
                          setCheckIn(d);
                          if (d && (!checkOut || checkOut <= d)) setCheckOut(addDays(d, 1));
                        }}
                        disabled={(d) => d < today}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div>
                  <label className="block text-sm font-body font-medium text-foreground mb-2">Check-out</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <button className="w-full text-left border border-border rounded-md px-3 py-2 text-sm font-body text-foreground hover:border-primary/40 transition-colors">
                        {checkOut ? format(checkOut, "dd MMM yyyy", { locale: es }) : "Seleccionar fecha"}
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={checkOut}
                        onSelect={setCheckOut}
                        disabled={(d) => d <= (checkIn || today)}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              {/* Guests */}
<div>
  <label className="block text-sm font-body font-medium text-foreground mb-2">Huéspedes</label>
  <div className="flex items-center gap-3">
    <Users size={16} className="text-muted-foreground" />
    <select
      value={guests}
      onChange={(e) => setGuests(Number(e.target.value))}
      className="border border-border rounded-md px-3 py-2 text-sm font-body bg-background text-foreground"
    >
      {Array.from({ length: room.capacity }, (_, i) => i + 1).map((n) => (
        <option key={n} value={n}>{n} {n === 1 ? "huésped" : "huéspedes"}</option>
      ))}
    </select>
  </div>
</div>

{/* Mascotas */}
<div className="flex items-center gap-2 mt-4">
  <input
    type="checkbox"
    id="pets"
    checked={pets}
    onChange={(e) => setPets(e.target.checked)}
    className="w-4 h-4"
  />
  <label htmlFor="pets" className="text-sm font-body text-foreground">
    Traer mascota (+${petFee} MXN por noche)
  </label>
</div>

              {/* Price summary */}
              {canProceed && (
                <div className="bg-secondary rounded-lg p-4 space-y-2 text-sm font-body">
                  <div className="flex justify-between text-foreground">
                    <span>{room.name} × {nights} {nights === 1 ? "noche" : "noches"}</span>
                    <span>${subtotal.toLocaleString()} MXN</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>IVA (16%)</span>
                    <span>${tax.toLocaleString()} MXN</span>
                  </div>
                  <div className="border-t border-border pt-2 flex justify-between font-semibold text-foreground">
                    <span>Total</span>
                    <span>${total.toLocaleString()} MXN</span>
                  </div>
                </div>
              )}

              <button
                onClick={() => setStep(1)}
                className="w-full bg-primary text-primary-foreground py-3 rounded-md font-medium hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Continuar
              </button>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-body font-medium text-foreground mb-2">Nombre completo</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border border-border rounded-md px-3 py-2 text-sm font-body bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="Juan Pérez"
                />
              </div>
              <div>
                <label className="block text-sm font-body font-medium text-foreground mb-2">Correo electrónico</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-border rounded-md px-3 py-2 text-sm font-body bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="correo@ejemplo.com"
                />
              </div>

              <div className="bg-secondary rounded-lg p-4 text-sm font-body space-y-1">
                <p className="text-foreground font-medium">{room.name}</p>
                <p className="text-muted-foreground">{checkIn && format(checkIn, "dd MMM", { locale: es })} — {checkOut && format(checkOut, "dd MMM yyyy", { locale: es })}</p>
                <p className="text-muted-foreground">{guests} {guests === 1 ? "huésped" : "huéspedes"} · {nights} {nights === 1 ? "noche" : "noches"}</p>
                <p className="font-semibold text-foreground pt-1">Total: ${total.toLocaleString()} MXN</p>
              </div>

              <div className="flex gap-3">
                <button onClick={() => setStep(0)} className="flex-1 border border-border text-foreground py-3 rounded-md font-medium hover:bg-muted transition-colors">
                  Atrás
                </button>
                <button
                  onClick={handleConfirm}
                  className="flex-1 bg-primary text-primary-foreground py-3 rounded-md font-medium hover:opacity-90 transition-opacity disabled:opacity-40"
                >
                  Confirmar Reserva
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="text-center py-8 space-y-4">
              <CheckCircle2 size={56} className="mx-auto text-primary" />
              <h3 className="font-heading text-2xl font-bold text-foreground">¡Reserva Confirmada!</h3>
              <p className="text-muted-foreground text-sm font-body max-w-md mx-auto">
                Hemos enviado la confirmación a <strong className="text-foreground">{email}</strong>. Tu número de reserva es <strong className="text-foreground">#{reservationId}</strong>.
              </p>
             <a
  href={`https://wa.me/524731211264?text=${encodeURIComponent(message)}`}
  target="_blank"
  rel="noopener noreferrer"
  className="block mt-2 text-green-600 text-sm underline"
>
  Contactar por WhatsApp
</a>
              <button onClick={() => { setStep(0); setName(""); setEmail(""); setCheckIn(undefined); setCheckOut(undefined); }} className="text-primary text-sm underline mt-4 font-body">
                Hacer otra reserva
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default BookingSection;
