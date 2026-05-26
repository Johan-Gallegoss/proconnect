import React from 'react';

const AVATAR_PALETTES = [
  { from: '#ff5451', to: '#ff8a88' },
  { from: '#69d8d4', to: '#24a09d' },
  { from: '#ffb3ad', to: '#ff5451' },
  { from: '#24a09d', to: '#0b7571' },
  { from: '#802826', to: '#ff5451' },
  { from: '#2563eb', to: '#69d8d4' },
];

/**
 * Muestra las iniciales del nombre con un degradado único.
 * @param {string} name   - Nombre completo del usuario
 * @param {'sm'|'lg'} size - Tamaño del avatar
 */
export default function AvatarFallback({ name, size = 'lg' }) {
  const initials = name
    ? name.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase()
    : '?';
  const palette = AVATAR_PALETTES[(name?.charCodeAt(0) ?? 0) % AVATAR_PALETTES.length];
  const dim = size === 'lg' ? 'w-20 h-20 text-xl' : 'w-10 h-10 text-sm';

  return (
    <div
      className={`${dim} rounded-full flex items-center justify-center text-white font-black shadow-lg flex-shrink-0`}
      style={{ background: `linear-gradient(135deg, ${palette.from}, ${palette.to})` }}
    >
      {initials}
    </div>
  );
}
