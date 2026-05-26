import React from 'react';

/**
 * Modal de autenticación: Login y Registro.
 *
 * Props:
 * @param {'login'|'register'} mode   - Formulario activo
 * @param {Function} onClose          - Cerrar el modal
 * @param {Function} onSwitchToLogin  - Cambiar a Login
 * @param {Function} onSwitchToRegister - Cambiar a Registro
 * @param {Function} onLogin          - Submit del formulario de login
 * @param {Function} onRegister       - Submit del formulario de registro
 *
 * Form state props:
 * @param {string} email, password, confirmPassword, name
 * @param {string} role - 'CLIENT' | 'PROFESSIONAL'
 * @param {string} selectedProfessionId
 * @param {Function} setEmail, setPassword, setConfirmPassword, setName, setRole, setSelectedProfessionId
 */
export default function AuthModal({
  mode,
  onClose,
  onSwitchToLogin,
  onSwitchToRegister,
  onLogin,
  onRegister,
  email, setEmail,
  password, setPassword,
  confirmPassword, setConfirmPassword,
  name, setName,
  role, setRole,
  selectedProfessionId, setSelectedProfessionId,
}) {
  const inputClass =
    'bg-[#0b1326] border border-[#5b403e]/30 text-white p-3 rounded-lg focus:border-[#ff5451] outline-none transition-colors';
  const labelClass =
    'text-xs font-bold text-[#ab8986] uppercase tracking-wider';

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-[#060e20]/85 backdrop-blur-md p-4">
      <div
        className="bg-[#131b2e] border border-[#5b403e]/30 rounded-2xl w-full max-w-md p-8 relative shadow-2xl overflow-y-auto"
        style={{ maxHeight: '90vh' }}
      >
        {/* Botón cerrar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#ab8986] hover:text-white transition-colors"
        >
          <span className="material-symbols-outlined">close</span>
        </button>

        {/* ── Formulario de Login ── */}
        {mode === 'login' && (
          <form onSubmit={onLogin} className="flex flex-col gap-5">
            <h2 className="text-3xl font-black text-white mb-2">Ingresar</h2>

            <div className="flex flex-col gap-1">
              <label className={labelClass}>Email</label>
              <input
                required type="email" value={email}
                onChange={e => setEmail(e.target.value)}
                className={inputClass}
                placeholder="correo@ejemplo.com"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className={labelClass}>Contraseña</label>
              <input
                required type="password" value={password}
                onChange={e => setPassword(e.target.value)}
                className={inputClass}
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              className="bg-[#ff5451] text-white font-bold p-4 rounded-xl mt-4 hover:shadow-[0_0_18px_rgba(255,84,81,0.4)] transition-all"
            >
              Iniciar Sesión
            </button>

            <p
              className="text-xs text-center text-[#ab8986] cursor-pointer hover:text-white transition-colors"
              onClick={onSwitchToRegister}
            >
              ¿No tienes cuenta? <span className="text-[#ffb3ad]">Regístrate</span>
            </p>
          </form>
        )}

        {/* ── Formulario de Registro ── */}
        {mode === 'register' && (
          <form onSubmit={onRegister} className="flex flex-col gap-4">
            <h2 className="text-3xl font-black text-white mb-1">Crear Cuenta</h2>

            <div className="flex flex-col gap-1">
              <label className={labelClass}>Tipo de cuenta</label>
              <select
                value={role} onChange={e => setRole(e.target.value)}
                className={inputClass}
              >
                <option value="CLIENT">Quiero contratar a un experto (Cliente)</option>
                <option value="PROFESSIONAL">Soy un Experto (Profesional)</option>
              </select>
            </div>

            {role === 'PROFESSIONAL' && (
              <div className="flex flex-col gap-1">
                <label className={labelClass}>¿Cuál es tu especialidad?</label>
                <input
                  required type="text"
                  value={selectedProfessionId}
                  onChange={e => setSelectedProfessionId(e.target.value)}
                  className={inputClass}
                  placeholder="Ej: Abogado Penalista, Gasfíter, Arquitecto"
                />
              </div>
            )}

            <div className="flex flex-col gap-1">
              <label className={labelClass}>Nombre Completo</label>
              <input
                required type="text" value={name}
                onChange={e => setName(e.target.value)}
                className={inputClass}
                placeholder="Tu nombre completo"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className={labelClass}>Email</label>
              <input
                required type="email" value={email}
                onChange={e => setEmail(e.target.value)}
                className={inputClass}
                placeholder="correo@ejemplo.com"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className={labelClass}>Contraseña</label>
              <input
                required type="password" value={password}
                onChange={e => setPassword(e.target.value)}
                className={inputClass}
                placeholder="••••••••"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className={labelClass}>Confirmar Contraseña</label>
              <input
                required type="password" value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                className={inputClass}
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              className="bg-gradient-to-r from-[#ffb3ad] to-[#ff5451] text-white font-bold p-4 rounded-xl mt-2 hover:shadow-[0_0_18px_rgba(255,84,81,0.4)] transition-all"
            >
              Completar Registro
            </button>

            <p
              className="text-xs text-center text-[#ab8986] cursor-pointer hover:text-white transition-colors"
              onClick={onSwitchToLogin}
            >
              ¿Ya tienes cuenta? <span className="text-[#ffb3ad]">Ingresa</span>
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
