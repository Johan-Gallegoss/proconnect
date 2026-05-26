import React from 'react';
import AvatarFallback from './AvatarFallback';

/**
 * Barra de navegación fija superior.
 *
 * Props:
 * @param {string}   currentPage     - Página activa ('home' | 'professionals')
 * @param {Object|null} user         - Usuario autenticado o null
 * @param {Function} onNavigateHome  - Navegar al inicio
 * @param {Function} onNavigatePros  - Navegar a expertos
 * @param {Function} onLogin         - Abrir modal de login
 * @param {Function} onRegister      - Abrir modal de registro
 * @param {Function} onLogout        - Cerrar sesión
 */
export default function Navbar({
  currentPage,
  user,
  onNavigateHome,
  onNavigatePros,
  onLogin,
  onRegister,
  onLogout,
}) {
  return (
    <nav className="fixed top-0 z-50 flex justify-between items-center w-full px-8 py-4 bg-[#0b1326]/80 backdrop-blur-xl shadow-[0px_0px_30px_rgba(219,226,253,0.04)]">
      {/* Logo + Links */}
      <div className="flex items-center gap-12">
        <button
          onClick={onNavigateHome}
          className="text-2xl font-black text-[#ff5451] tracking-tighter hover:opacity-80 transition-opacity"
        >
          Pro-connect
        </button>
        <div className="hidden md:flex items-center gap-8">
          <button
            onClick={onNavigatePros}
            className={`font-bold text-sm tracking-tight transition-colors pb-1 ${
              currentPage === 'professionals'
                ? 'text-[#ffb3ad] border-b-2 border-[#ff5451]'
                : 'text-[#dbe2fd]/80 hover:text-[#ff5451]'
            }`}
          >
            Encontrar Expertos
          </button>
          <a
            className="text-[#dbe2fd]/80 hover:text-[#ff5451] transition-colors text-sm font-medium"
            href="#"
          >
            Cómo Funciona
          </a>
        </div>
      </div>

      {/* Acciones de usuario */}
      <div className="flex items-center gap-6">
        {user ? (
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <AvatarFallback name={user.name} size="sm" />
              <span className="text-sm font-bold text-[#ffb3ad] hidden md:block">
                {user.name}
                {user.profession ? ` · ${user.profession.name}` : ''}
              </span>
            </div>
            <button
              onClick={onLogout}
              className="text-xs font-semibold px-4 py-2 bg-[#222a3e] text-white rounded-lg border border-[#5b403e]/30 hover:bg-red-500/20 transition-colors"
            >
              Cerrar Sesión
            </button>
          </div>
        ) : (
          <>
            <button
              onClick={onLogin}
              className="text-[#dbe2fd]/80 hover:text-[#ff5451] font-bold text-sm transition-colors scale-95 active:scale-90"
            >
              Iniciar Sesión
            </button>
            <button
              onClick={onRegister}
              className="bg-[#ff5451] text-white px-6 py-2 rounded-lg font-bold text-sm scale-95 active:scale-90 hover:brightness-110 transition-all"
            >
              Registrarse
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
