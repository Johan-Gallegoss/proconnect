import React from 'react';
import AvatarFallback from './AvatarFallback';

const CARD_GRADIENTS = [
  'from-[#ff5451]/20 to-transparent',
  'from-[#69d8d4]/10 to-transparent',
  'from-[#ffb3ad]/15 to-transparent',
  'from-[#24a09d]/15 to-transparent',
];

/**
 * Tarjeta visual de un profesional en el grid de búsqueda.
 * @param {Object} professional - Datos del profesional desde la API
 * @param {number} index        - Posición en la lista (para alternar el degradado del banner)
 */
export default function ProfessionalCard({ professional, index }) {
  const professionName = professional.profession?.name ?? null;
  const gradient = CARD_GRADIENTS[index % CARD_GRADIENTS.length];

  return (
    <article className="group relative overflow-hidden rounded-xl bg-[#131b2e] border border-[#5b403e]/10 hover:border-[#ff5451]/30 transition-all duration-300 hover:shadow-[0px_0px_40px_rgba(255,84,81,0.08)]">
      {/* Banner superior con gradiente */}
      <div className={`h-32 w-full bg-gradient-to-br ${gradient} relative`}>
        <div className="absolute -bottom-10 left-6 p-1 bg-[#0b1326] rounded-full shadow-2xl">
          <AvatarFallback name={professional.name} size="lg" />
        </div>
      </div>

      {/* Contenido de la tarjeta */}
      <div className="pt-12 p-6 space-y-4">
        {/* Nombre, título y badge */}
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-bold text-[#dbe2fd] group-hover:text-[#ffb3ad] transition-colors">
              {professional.name}
            </h3>
            <p className="text-xs font-medium text-[#69d8d4] uppercase tracking-widest mt-1">
              {professionName ?? 'Profesional Independiente'}
            </p>
          </div>
          <div className="flex items-center gap-1 bg-[#ff5451]/10 px-2 py-1 rounded flex-shrink-0">
            <span
              className="material-symbols-outlined text-xs text-[#ff5451]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              verified
            </span>
            <span className="text-xs font-bold text-[#ff5451]">Nuevo</span>
          </div>
        </div>

        {/* Descripción */}
        <p className="text-sm text-[#ab8986] line-clamp-2 leading-relaxed">
          {professional.description
            ? professional.description
            : `Profesional especializado en ${professionName ?? 'su área'}, disponible para proyectos y consultas.`}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {professionName && (
            <span className="px-2 py-1 bg-[#222a3e] text-[10px] font-bold rounded uppercase text-[#dbe2fd]/70 tracking-wide">
              {professionName}
            </span>
          )}
          <span className="px-2 py-1 bg-[#222a3e] text-[10px] font-bold rounded uppercase text-[#dbe2fd]/70 tracking-wide">
            Disponible
          </span>
        </div>

        {/* Footer: email y botón */}
        <div className="pt-4 flex items-center justify-between border-t border-[#5b403e]/15">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-sm text-[#ab8986]">mail</span>
            <span className="text-xs text-[#ab8986] truncate max-w-[120px]">{professional.email}</span>
          </div>
          <button className="bg-[#ff5451] text-white px-4 py-2 rounded-lg font-bold text-sm hover:brightness-110 active:scale-95 transition-all">
            Ver Perfil
          </button>
        </div>
      </div>
    </article>
  );
}
