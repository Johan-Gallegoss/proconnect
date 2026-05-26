import React, { useState } from 'react';
import './App.css';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [authModal, setAuthModal] = useState(null); // 'login', 'register' o null
  const [user, setUser] = useState(null); // Guarda la sesión del usuario

  // Estados de formularios
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(''); // Nuevo campo
  const [name, setName] = useState('');
  const [role, setRole] = useState('CLIENT'); // Por defecto Cliente

  // Función para abrir el modal limpando siempre los datos previos
  const openAuthModal = (type) => {
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setName('');
    setRole('CLIENT');
    setSelectedProfessionId('');
    setAuthModal(type);
  };

  const [selectedProfessionId, setSelectedProfessionId] = useState('');

    const handleSearch = () => {
      alert(`En el futuro, esto buscará '${searchQuery}' en la base de datos.`);
    };

    const handleLogin = async (e) => {
      e.preventDefault();
      try {
        const response = await fetch('http://localhost:8080/api/users/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password })
        });
        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
          setAuthModal(null);
          alert(`¡Bienvenido de vuelta, ${userData.name}!`);
        } else {
          alert("Credenciales incorrectas.");
        }
      } catch (error) {
        console.error(error);
        alert("Error conectando con el servidor backend (revisa que esté corriendo).");
      }
    };

    const handleRegister = async (e) => {
      e.preventDefault();
      
      // Validación de contraseñas correctas
      if (password !== confirmPassword) {
        alert("Las contraseñas no coinciden. Por favor inténtalo de nuevo.");
        return;
      }

      // Estructuramos el payload incluyendo la profesión si es PROFESSIONAL
      const payload = {
        name,
        email,
        password,
        role
      };

      if (role === 'PROFESSIONAL' && selectedProfessionId) {
        payload.profession = {
          name: selectedProfessionId
        };
      }

      try {
        const response = await fetch('http://localhost:8080/api/users/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
          setAuthModal(null);
          alert(`¡Registro exitoso! Bienvenido ${userData.name}.`);
        } else {
          alert("Error al registrar: verifica los datos o tal vez el email ya esté en uso.");
        }
      } catch (error) {
        console.error(error);
        alert("Error conectando con el servidor backend.");
      }
    };

    const logout = () => {
      setUser(null);
    };

    return (
      <>
        {/* Top Navbar */}
        <nav className="fixed top-0 w-full z-40 bg-[#0b1326]/60 backdrop-blur-[24px] flex justify-between items-center px-12 h-20 shadow-[0px_12px_32px_rgba(6,14,32,0.6)]">
          <div className="flex items-center gap-12">
            <span className="text-2xl font-bold tracking-tighter text-[#dae2fd]">Pro-connect</span>
            <div className="hidden md:flex gap-8 items-center">
              <a className="text-[#38BDF8] font-bold border-b-2 border-[#38BDF8] pb-1 font-manrope tracking-tight text-sm" href="#">Encontrar Expertos</a>
              <a className="text-[#bdc8d1] hover:text-[#8ed5ff] transition-all duration-300 font-manrope tracking-tight font-medium text-sm" href="#">Cómo funciona</a>
            </div>
          </div>
          <div className="flex items-center gap-6">
            {user ? (
              <div className="flex items-center gap-4">
                <span className="text-sm font-bold text-[#8ed5ff]">
                  Hola, {user.name} ({user.role}) 
                  {user.profession ? ` - ${user.profession.name}` : ''}
                </span>
                <button onClick={logout} className="text-xs font-semibold px-4 py-2 bg-surface-container-high text-white rounded-lg border border-outline-variant/30 hover:bg-red-500/20 transition-colors">
                  Cerrar Sesión
                </button>
              </div>
            ) : (
              <>
                <button onClick={() => openAuthModal('login')} className="text-white hover:text-[#8ed5ff] font-bold text-sm transition-all">
                  Ingresar
                </button>
                <button 
                  onClick={() => openAuthModal('register')}
                  className="bg-gradient-to-br from-primary to-primary-container text-on-primary-container font-bold px-6 py-2.5 rounded-lg active:scale-95 duration-150 ease-in-out text-sm">
                  Unirse como Pro/Cliente
                </button>
              </>
            )}
          </div>
        </nav>

        <main className="pt-20 transition-all duration-300">
          {/* Resto de la página principal */}
          <section className="relative min-h-[921px] flex flex-col items-start justify-center px-12 overflow-hidden">
            <div className="absolute top-0 right-0 w-2/3 h-full opacity-20 pointer-events-none">
              <div className="absolute inset-0 bg-gradient-to-l from-primary-container/30 to-transparent blur-[120px] rounded-full -mr-40 mt-20"></div>
            </div>
            <div className="max-w-4xl z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-high border border-outline-variant/20 mb-8">
                <span className="w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_#8ed5ff]"></span>
                <span className="text-[10px] uppercase tracking-[0.1rem] font-bold text-on-surface-variant">El Estándar de Excelencia</span>
              </div>
              <h1 className="text-6xl md:text-8xl font-extrabold tracking-tighter text-on-surface mb-8 leading-[0.9]">
                Precisión <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-container">Profesional</span><br/> a tu alcance.
              </h1>
              <p className="text-xl text-on-surface-variant max-w-2xl mb-12 leading-relaxed">
                Accede a un mercado selecto de profesionales de élite. Desde constructores estructurales hasta abogados corporativos.
              </p>

              <div className="w-full max-w-2xl flex items-center p-2 bg-surface-container-highest rounded-xl shadow-[0px_12px_32px_rgba(6,14,32,0.6)] border border-outline-variant/10">
                <div className="flex-1 flex items-center px-4 gap-3">
                  <span className="material-symbols-outlined text-primary">search</span>
                  <input 
                    className="bg-transparent border-none focus:ring-0 text-on-surface placeholder:text-outline outline-none w-full py-4 font-medium" 
                    placeholder="Busca arquitectos, abogados o gasfíteres..." 
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <button 
                  onClick={handleSearch}
                  className="bg-primary text-on-primary px-8 py-4 rounded-lg font-bold hover:shadow-[0px_4px_12px_rgba(142,213,255,0.4)] transition-all">
                    Buscar Expertos
                </button>
              </div>
            </div>
          </section>
        </main>

        {/* Modal Overlay para Login o Registro */}
        {authModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#060e20]/80 backdrop-blur-sm p-4">
            <div className="bg-surface-container-low border border-outline-variant/30 rounded-2xl w-full max-w-md p-8 relative shadow-2xl">
              {/* Botón de cerrar */}
              <button 
                onClick={() => setAuthModal(null)}
                className="absolute top-4 right-4 text-on-surface-variant hover:text-white"
              >
                <span className="material-symbols-outlined">close</span>
              </button>

              {authModal === 'login' ? (
                // FORMULARIO DE INGRESO
                <form onSubmit={handleLogin} className="flex flex-col gap-5">
                  <h2 className="text-3xl font-black text-white mb-2">Ingresar</h2>
                  
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Email</label>
                    <input required type="email" value={email} onChange={e=>setEmail(e.target.value)} className="bg-surface border border-outline-variant/30 text-white p-3 rounded-lg focus:border-primary outline-none" placeholder="correo@ejemplo.com"/>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Contraseña</label>
                    <input required type="password" value={password} onChange={e=>setPassword(e.target.value)} className="bg-surface border border-outline-variant/30 text-white p-3 rounded-lg focus:border-primary outline-none" placeholder="******"/>
                  </div>

                  <button type="submit" className="bg-primary text-on-primary font-bold p-4 rounded-xl mt-4 hover:shadow-[0_0_15px_rgba(142,213,255,0.3)] transition-all">
                    Iniciar Sesión
                  </button>
                  <p className="text-xs text-center text-outline mt-2 cursor-pointer hover:text-white" onClick={() => openAuthModal('register')}>¿No tienes cuenta? Regístrate</p>
                </form>
              ) : (
                // FORMULARIO DE REGISTRO
                <form onSubmit={handleRegister} className="flex flex-col gap-4">
                  <h2 className="text-3xl font-black text-white mb-1">Crear Cuenta</h2>
                  
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Tipo de cuenta</label>
                    <select value={role} onChange={e=>setRole(e.target.value)} className="bg-surface border border-outline-variant/30 text-white p-3 rounded-lg focus:border-primary outline-none">
                      <option value="CLIENT">Quiero contratar a un experto (Cliente)</option>
                      <option value="PROFESSIONAL">Soy un Experto (Profesional)</option>
                    </select>
                  </div>

                  {/* Campo de texto de profesión que permite al usuario ESCRIBIR libremente */}
                  {role === 'PROFESSIONAL' && (
                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">¿Cuál es tu especialidad (profesión)?</label>
                      <input 
                        required 
                        type="text" 
                        value={selectedProfessionId} // Reutilizamos esta variable de estado para guardar la profesión escrita
                        onChange={e=>setSelectedProfessionId(e.target.value)} 
                        className="bg-surface border border-outline-variant/30 text-white p-3 rounded-lg focus:border-primary outline-none"
                        placeholder="Ej: Abogado Penalista, Gasfíter a domicilio, Arquitecto"
                      />
                    </div>
                  )}

                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Nombre Completo</label>
                    <input required type="text" value={name} onChange={e=>setName(e.target.value)} className="bg-surface border border-outline-variant/30 text-white p-3 rounded-lg focus:border-primary outline-none" placeholder="Tu nombre"/>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Email</label>
                    <input required type="email" value={email} onChange={e=>setEmail(e.target.value)} className="bg-surface border border-outline-variant/30 text-white p-3 rounded-lg focus:border-primary outline-none" placeholder="correo@ejemplo.com"/>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Contraseña</label>
                    <input required type="password" value={password} onChange={e=>setPassword(e.target.value)} className="bg-surface border border-outline-variant/30 text-white p-3 rounded-lg focus:border-primary outline-none" placeholder="******"/>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Confirmar Contraseña</label>
                    <input required type="password" value={confirmPassword} onChange={e=>setConfirmPassword(e.target.value)} className="bg-surface border border-outline-variant/30 text-white p-3 rounded-lg focus:border-primary outline-none" placeholder="Repite tu contraseña"/>
                  </div>

                  <button type="submit" className="bg-gradient-to-r from-primary to-primary-container text-on-primary-container font-bold p-4 rounded-xl mt-2 hover:shadow-[0_0_15px_rgba(142,213,255,0.3)] transition-all">
                    Completar Registro
                  </button>
                  <p className="text-xs text-center text-outline cursor-pointer hover:text-white" onClick={() => openAuthModal('login')}>¿Ya tienes cuenta? Ingresa</p>
                </form>
              )}
          </div>
        </div>
      )}
    </>
  );
}

export default App;
