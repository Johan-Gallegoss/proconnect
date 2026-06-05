import React, { useState, useEffect, useMemo } from 'react';
import ProfessionalCard from '../components/ProfessionalCard';
import SpecialtyCheckbox from '../components/SpecialtyCheckbox';

/**
 * Página de listado de profesionales con sidebar de filtros avanzados.
 *
 * Props:
 * @param {Function} onBack           - Navegar de vuelta al inicio
 * @param {string}   initialSearch    - Término de búsqueda inicial (desde el hero)
 */
export default function ProfessionalsPage({ onBack, initialSearch = '' }) {
  const [professionals, setProfessionals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filtros
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [selectedSpecialties, setSelectedSpecialties] = useState([]);
  const [locationFilter, setLocationFilter] = useState('');
  const [sortBy, setSortBy] = useState('relevance');

  // Carga inicial desde el backend
  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch('http://localhost:8080/api/users/professionals');
        if (!res.ok) throw new Error('No se pudo cargar la lista de profesionales.');
        setProfessionals(await res.json());
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  // Especialidades únicas extraídas dinámicamente del backend
  const uniqueSpecialties = useMemo(() => {
    const set = new Set();
    professionals.forEach(p => {
      if (p.profession?.name) set.add(p.profession.name);
    });
    return Array.from(set).sort();
  }, [professionals]);

  const toggleSpecialty = name => {
    setSelectedSpecialties(prev =>
      prev.includes(name) ? prev.filter(s => s !== name) : [...prev, name]
    );
  };

  // Lista filtrada y ordenada
  const filtered = useMemo(() => {
    let list = professionals.filter(p => {
      const q = searchTerm.toLowerCase();
      const matchSearch =
        !q ||
        p.name?.toLowerCase().includes(q) ||
        p.profession?.name?.toLowerCase().includes(q) ||
        p.description?.toLowerCase().includes(q);

      const matchSpecialty =
        selectedSpecialties.length === 0 ||
        selectedSpecialties.includes(p.profession?.name ?? '');

      return matchSearch && matchSpecialty;
    });

    if (sortBy === 'name')
      list = [...list].sort((a, b) => (a.name ?? '').localeCompare(b.name ?? ''));
    if (sortBy === 'profession')
      list = [...list].sort((a, b) =>
        (a.profession?.name ?? '').localeCompare(b.profession?.name ?? '')
      );

    return list;
  }, [professionals, searchTerm, selectedSpecialties, sortBy]);

  return (
    <>
      <main className="pt-24 min-h-screen flex px-8 gap-8">
        {/* ──────────── Sidebar de filtros ──────────── */}
        <aside
          className="w-72 hidden lg:flex flex-col gap-8 sticky top-24 h-[calc(100vh-8rem)] pb-12 overflow-y-auto"
          style={{ scrollbarWidth: 'thin', scrollbarColor: '#5b403e transparent' }}
        >
          {/* Título */}
          <div className="space-y-2">
            <h2 className="text-xs font-bold uppercase tracking-widest text-[#ff5451]">
              Filtros Avanzados
            </h2>
            <div className="h-1 w-12 bg-[#ff5451] rounded-full" />
          </div>

          {/* Buscar */}
          <section className="space-y-3">
            <label className="text-sm font-semibold text-[#dbe2fd] flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">search</span>
              Buscar
            </label>
            <input
              className="w-full bg-[#060d20] border border-[#5b403e]/30 rounded-lg p-3 text-sm text-[#dbe2fd] focus:ring-1 focus:ring-[#ff5451] placeholder:text-[#5b403e] outline-none"
              placeholder="Nombre, especialidad..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </section>

          {/* Especialidad */}
          <section className="space-y-4">
            <label className="text-sm font-semibold text-[#dbe2fd] flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">psychology</span>
              Especialidad
            </label>
            <div className="space-y-2">
              {loading ? (
                <p className="text-xs text-[#ab8986] animate-pulse pl-2">
                  Cargando especialidades...
                </p>
              ) : uniqueSpecialties.length === 0 ? (
                <p className="text-xs text-[#ab8986] pl-2">Sin especialidades aún</p>
              ) : (
                uniqueSpecialties.map(spec => (
                  <SpecialtyCheckbox
                    key={spec}
                    label={spec}
                    checked={selectedSpecialties.includes(spec)}
                    onChange={() => toggleSpecialty(spec)}
                  />
                ))
              )}
            </div>
          </section>

          {/* Valoración (decorativa) */}
          <section className="space-y-4">
            <label className="text-sm font-semibold text-[#dbe2fd] flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">star</span>
              Valoración
            </label>
            <button className="w-full flex items-center justify-between p-3 rounded-lg bg-[#131b2e] hover:bg-[#222a3e] transition-all group">
              <div className="flex gap-0.5">
                {[1, 2, 3, 4].map(i => (
                  <span
                    key={i}
                    className="material-symbols-outlined text-[#ff5451]"
                    style={{ fontSize: '18px', fontVariationSettings: "'FILL' 1" }}
                  >
                    star
                  </span>
                ))}
                <span
                  className="material-symbols-outlined text-[#ff5451]"
                  style={{ fontSize: '18px', fontVariationSettings: "'FILL' 0" }}
                >
                  star
                </span>
              </div>
              <span className="text-[10px] font-bold text-[#ab8986] group-hover:text-[#ffb3ad] transition-colors">
                4.0+
              </span>
            </button>
          </section>

          {/* Ubicación */}
          <section className="space-y-4">
            <label className="text-sm font-semibold text-[#dbe2fd] flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">location_on</span>
              Ubicación
            </label>
            <input
              className="w-full bg-[#060d20] border border-[#5b403e]/30 rounded-lg p-3 text-sm text-[#dbe2fd] focus:ring-1 focus:ring-[#ff5451] placeholder:text-[#5b403e] outline-none"
              placeholder="Ciudad o país..."
              value={locationFilter}
              onChange={e => setLocationFilter(e.target.value)}
            />
          </section>

          {/* Contador */}
          {!loading && !error && (
            <div
              className="mt-auto p-4 rounded-xl border border-[#ff5451]/15"
              style={{ background: 'rgba(255,84,81,0.05)' }}
            >
              <p className="text-xs text-[#ab8986] uppercase tracking-widest font-bold">
                Total registrados
              </p>
              <p className="text-3xl font-black text-[#ff5451] mt-1">{professionals.length}</p>
              <p className="text-xs text-[#dbe2fd]/40 mt-1">profesionales activos</p>
            </div>
          )}
        </aside>

        {/* ──────────── Contenido principal ──────────── */}
        <section className="flex-1 pb-20">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <button
                onClick={onBack}
                className="flex items-center gap-1 text-xs text-[#ab8986] hover:text-[#ffb3ad] transition-colors mb-3 group"
              >
                <span className="material-symbols-outlined text-sm group-hover:-translate-x-1 transition-transform">
                  arrow_back
                </span>
                Volver al inicio
              </button>

              <h1 className="text-4xl font-extrabold tracking-tighter text-[#dbe2fd]">
                Expertos{' '}
                {selectedSpecialties.length === 1 ? (
                  <>
                    en <span className="text-[#ff5451]">{selectedSpecialties[0]}</span>
                  </>
                ) : (
                  <span className="text-[#ff5451]">Verificados</span>
                )}
              </h1>

              <p className="text-[#ab8986] mt-2 text-sm">
                {loading
                  ? 'Cargando profesionales...'
                  : `Mostrando ${filtered.length} ${
                      filtered.length === 1 ? 'profesional' : 'profesionales'
                    } con disponibilidad inmediata.`}
              </p>
            </div>

            {/* Tabs de ordenamiento */}
            <div className="flex items-center gap-1 bg-[#131b2e] p-1.5 rounded-xl self-start md:self-auto">
              {[
                { value: 'relevance', label: 'Relevancia' },
                { value: 'name', label: 'Nombre' },
                { value: 'profession', label: 'Profesión' },
              ].map(opt => (
                <button
                  key={opt.value}
                  onClick={() => setSortBy(opt.value)}
                  className={`px-4 py-2 font-bold text-xs rounded-lg transition-all ${
                    sortBy === opt.value
                      ? 'bg-[#222a3e] text-[#ff5451] shadow'
                      : 'text-[#ab8986] hover:text-[#dbe2fd]'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Estado: cargando */}
          {loading && (
            <div className="flex flex-col items-center justify-center py-40 gap-6">
              <div className="relative w-16 h-16">
                <div className="absolute inset-0 rounded-full border-4 border-[#ff5451]/20 border-t-[#ff5451] animate-spin" />
              </div>
              <p className="text-[#ab8986] text-sm font-medium animate-pulse">
                Cargando profesionales...
              </p>
            </div>
          )}

          {/* Estado: error de conexión */}
          {error && !loading && (
            <div className="flex flex-col items-center justify-center py-40 gap-4 text-center">
              <span
                className="material-symbols-outlined text-[#ff5451]/40"
                style={{ fontSize: '64px' }}
              >
                wifi_off
              </span>
              <p className="text-[#dbe2fd] font-bold text-xl">No se pudo conectar</p>
              <p className="text-[#ab8986] text-sm max-w-sm">{error}</p>
              <p className="text-[#ab8986] text-xs opacity-60">
                Verifica que el backend esté corriendo en el puerto 8080.
              </p>
            </div>
          )}

          {/* Estado: sin resultados */}
          {!loading && !error && filtered.length === 0 && (
            <div className="flex flex-col items-center justify-center py-40 gap-4 text-center">
              <span
                className="material-symbols-outlined text-[#ff5451]/30"
                style={{ fontSize: '72px' }}
              >
                person_search
              </span>
              <p className="text-[#dbe2fd] font-bold text-xl">
                {professionals.length === 0
                  ? 'Aún no hay profesionales'
                  : 'Sin resultados para tu búsqueda'}
              </p>
              <p className="text-[#ab8986] text-sm max-w-md leading-relaxed">
                {professionals.length === 0
                  ? 'Cuando alguien se registre como profesional aparecerá aquí automáticamente.'
                  : 'Prueba con otro término o limpia los filtros activos.'}
              </p>
              {(searchTerm || selectedSpecialties.length > 0) && (
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedSpecialties([]);
                  }}
                  className="mt-2 text-xs font-bold text-[#ff5451] hover:underline"
                >
                  Limpiar filtros
                </button>
              )}
            </div>
          )}

          {/* Grid de tarjetas */}
          {!loading && !error && filtered.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filtered.map((prof, i) => (
                <ProfessionalCard key={prof.id} professional={prof} index={i} />
              ))}
            </div>
          )}
        </section>
      </main>

      {/* ──────────── Footer ──────────── */}
      <footer
        className="border-t border-[#5b403e]/10 py-12 px-8 flex flex-col items-center gap-6 w-full text-xs uppercase tracking-widest mt-20"
        style={{ background: '#0b1326', fontFamily: 'Manrope, sans-serif' }}
      >
        <div className="flex items-center gap-8 flex-wrap justify-center">
          {['Privacidad', 'Términos', 'Soporte', 'API'].map(link => (
            <a
              key={link}
              className="text-[#dbe2fd]/40 hover:text-[#ffb3ad] transition-colors"
              href="#"
            >
              {link}
            </a>
          ))}
        </div>
        <div className="text-lg font-bold text-[#dbe2fd]">Pro-connect</div>
        <p className="text-[#dbe2fd]/40">© 2024 Pro-connect. Todos los derechos reservados.</p>
      </footer>
    </>
  );
}
