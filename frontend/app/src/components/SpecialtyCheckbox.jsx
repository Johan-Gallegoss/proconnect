import React from 'react';

/**
 * Checkbox estilizado para el filtro de especialidades.
 * @param {string}  label    - Texto de la opción
 * @param {boolean} checked  - Estado seleccionado
 * @param {Function} onChange - Callback al hacer click
 */
export default function SpecialtyCheckbox({ label, checked, onChange }) {
  return (
    <div
      onClick={onChange}
      className={`flex items-center gap-3 p-3 rounded-lg transition-colors cursor-pointer group ${
        checked
          ? 'bg-[#ff5451]/10 border-l-4 border-[#ff5451]'
          : 'bg-[#131b2e] hover:bg-[#222a3e]'
      }`}
    >
      <div
        className={`w-4 h-4 rounded-sm flex items-center justify-center flex-shrink-0 transition-colors ${
          checked
            ? 'bg-[#ff5451]'
            : 'border border-[#5b403e] group-hover:border-[#ffb3ad]'
        }`}
      >
        {checked && (
          <span className="material-symbols-outlined text-white" style={{ fontSize: '12px' }}>
            check
          </span>
        )}
      </div>
      <span
        className={`text-sm transition-colors ${
          checked
            ? 'font-medium text-[#ffb3ad]'
            : 'opacity-80 group-hover:opacity-100 text-[#dbe2fd]'
        }`}
      >
        {label}
      </span>
    </div>
  );
}
