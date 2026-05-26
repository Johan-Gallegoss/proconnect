import React, { useState } from 'react';

/**
 * Página de inicio con hero, buscador y chips de búsqueda rápida.
 *
 * Props:
 * @param {Function} onFindExperts - Callback con la query de búsqueda al navegar a expertos
 */
export default function HomePage({ onFindExperts }) {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <main className="pt-20">
      <section className="relative min-h-[921px] flex flex-col items-start justify-center px-12 overflow-hidden">
        {/* Glow decorativo de fondo */}
        <div className="absolute top-0 right-0 w-2/3 h-full opacity-20 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-l from-[#ff5451]/30 to-transparent blur-[120px] rounded-full -mr-40 mt-20" />
        </div>

        <div className="max-w-4xl z-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#222a3e] border border-[#5b403e]/20 mb-8">
            <span className="w-2 h-2 rounded-full bg-[#ff5451] shadow-[0_0_8px_#ff5451]" />
            <span className="text-[10px] uppercase tracking-[0.1rem] font-bold text-[#ab8986]">
              El Estándar de Excelencia
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-6xl md:text-8xl font-extrabold tracking-tighter text-[#dbe2fd] mb-8 leading-[0.9]">
            Precisión <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ffb3ad] to-[#ff5451]">
              Profesional
            </span>
            <br />a tu alcance.
          </h1>

          {/* Subtítulo */}
          <p className="text-xl text-[#ab8986] max-w-2xl mb-12 leading-relaxed">
            Accede a un mercado selecto de profesionales de élite. Desde constructores
            estructurales hasta abogados corporativos.
          </p>

          {/* Buscador */}
          <div className="w-full max-w-2xl flex items-center p-2 bg-[#222a3e] rounded-xl shadow-[0px_12px_32px_rgba(6,14,32,0.6)] border border-[#5b403e]/10">
            <div className="flex-1 flex items-center px-4 gap-3">
              <span className="material-symbols-outlined text-[#ffb3ad]">search</span>
              <input
                className="bg-transparent border-none focus:ring-0 text-[#dbe2fd] placeholder:text-[#ab8986] outline-none w-full py-4 font-medium"
                placeholder="Busca arquitectos, abogados o gasfíteres..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && onFindExperts(searchQuery)}
              />
            </div>
            <button
              onClick={() => onFindExperts(searchQuery)}
              className="bg-[#ff5451] text-white px-8 py-4 rounded-lg font-bold hover:shadow-[0px_4px_12px_rgba(255,84,81,0.4)] hover:brightness-110 transition-all active:scale-95"
            >
              Buscar Expertos
            </button>
          </div>

          {/* Chips de búsqueda rápida */}
          <div className="flex flex-wrap gap-3 mt-6">
            {['Abogado', 'Arquitecto', 'Diseñador', 'Gasfíter', 'Contador'].map(tag => (
              <button
                key={tag}
                onClick={() => onFindExperts(tag)}
                className="px-4 py-1.5 rounded-full bg-[#131b2e] border border-[#5b403e]/30 text-xs font-bold text-[#ab8986] hover:border-[#ff5451]/50 hover:text-[#ffb3ad] transition-all"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
