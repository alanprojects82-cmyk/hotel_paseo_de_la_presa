import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [view, setView] = useState("dash1");
  
  return (
<div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-[#1a0f12] via-[#2a1418] to-[#0f0a0c]">
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#8B1E3F33,transparent_60%)]" />
      {/* 🔙 BOTÓN INICIO */}
      <button
        onClick={() => navigate("/")}
        className="absolute top-4 left-4 z-50 bg-[#8B1E3F] text-white px-4 py-2 rounded-lg shadow hover:bg-[#6F172F] transition"
      >
        ← Inicio
      </button>

      {/* 📌 BOTÓN PANEL */}
      <button
        onClick={() => setOpen(true)}
        className="absolute top-4 right-4 z-50 bg-[#8B1E3F] text-white px-4 py-2 rounded-lg shadow hover:bg-[#6F172F] transition"
      >
        Panel
      </button>

      {/* 🧠 CONTENIDO */}
      <div className="p-10 flex flex-col items-center text-center">

        <h1 className="text-3xl font-bold mb-6 text-[#F5E6D3]">
  Dashboard Hotel Paseo de la Presa
</h1>

        {/* 📊 CAMBIO DE DASHBOARDS */}
        {view === "dash1" && (
          <img src="/Dashboard1Hotel_Paseo.svg" className="w-full max-w-6xl rounded-2xl shadow-2xl border border-white/10" />
        )}

        {view === "dash2" && (
          <img src="/Dashboard2Hotel_Paseo.svg" className="w-full max-w-6xl rounded-2xl shadow-2xl border border-white/10" />
        )}

        {view === "dash3" && (
          <img src="/Dashboard3Hotel_Paseo.svg" className="w-full max-w-6xl rounded-2xl shadow-2xl border border-white/10" />
        )}

        {view === "dash4" && (
          <img src="/Dashboard4Hotel_Paseo.svg" className="w-full max-w-6xl rounded-2xl shadow-2xl border border-white/10" />
        )}

      </div>

      {/* 🌑 OVERLAY */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={() => setOpen(false)}
        />
      )}

      {/* 📌 SIDEBAR */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-50 transition-transform duration-300
        ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="p-6">

          <button
            onClick={() => setOpen(false)}
            className="mb-6 bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
          >
            ✕ Cerrar
          </button>

          <h2 className="text-xl font-bold mb-4 text-gray-800">
            Dashboards disponibles
          </h2>

          <div className="flex flex-col gap-3">

            <button
              onClick={() => { setView("dash1"); setOpen(false); }}
              className={`text-left px-3 py-2 rounded transition ${
                view === "dash1"
                  ? "bg-[#8B1E3F] text-white"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              📊 Dashboard 1
            </button>

            <button
              onClick={() => { setView("dash2"); setOpen(false); }}
              className={`text-left px-3 py-2 rounded transition ${
                view === "dash2"
                  ? "bg-[#8B1E3F] text-white"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              📈 Dashboard 2
            </button>

            <button
              onClick={() => { setView("dash3"); setOpen(false); }}
              className={`text-left px-3 py-2 rounded transition ${
                view === "dash3"
                  ? "bg-[#8B1E3F] text-white"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              💰 Dashboard 3
            </button>

            <button
              onClick={() => { setView("dash4"); setOpen(false); }}
              className={`text-left px-3 py-2 rounded transition ${
                view === "dash4"
                  ? "bg-[#8B1E3F] text-white"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              🏨 Dashboard 4
            </button>

          </div>

        </div>
      </div>

    </div>
  );
}