import React, { useState } from 'react';
import './App.css';

import Navbar from './components/Navbar';
import AuthModal from './components/AuthModal';
import HomePage from './pages/HomePage';
import ProfessionalsPage from './pages/ProfessionalsPage';

/**
 * Raíz de la aplicación.
 * Gestiona la navegación entre páginas y el estado global de sesión/auth.
 */
export default function App() {
  // ── Navegación ──────────────────────────────
  const [currentPage, setCurrentPage] = useState('home'); // 'home' | 'professionals'
  const [initialSearch, setInitialSearch] = useState('');

  // ── Sesión ───────────────────────────────────
  const [user, setUser] = useState(null);

  // ── Modal de autenticación ───────────────────
  const [authModal, setAuthModal] = useState(null); // null | 'login' | 'register'

  // Form state del modal
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('CLIENT');
  const [selectedProfessionId, setSelectedProfessionId] = useState('');

  // ── Helpers ──────────────────────────────────
  const openAuthModal = type => {
    setEmail(''); setPassword(''); setConfirmPassword('');
    setName(''); setRole('CLIENT'); setSelectedProfessionId('');
    setAuthModal(type);
  };

  const goToProfessionals = (search = '') => {
    setInitialSearch(search);
    setCurrentPage('professionals');
  };

  // ── Handlers de auth ─────────────────────────
  const handleLogin = async e => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:8080/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      if (res.ok) {
        const data = await res.json();
        setUser(data);
        setAuthModal(null);
        alert(`¡Bienvenido de vuelta, ${data.name}!`);
      } else {
        alert('Credenciales incorrectas.');
      }
    } catch {
      alert('Error conectando con el servidor backend (revisa que esté corriendo).');
    }
  };

  const handleRegister = async e => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Las contraseñas no coinciden.');
      return;
    }
    const payload = { name, email, password, role };
    if (role === 'PROFESSIONAL' && selectedProfessionId) {
      payload.profession = { name: selectedProfessionId };
    }
    try {
      const res = await fetch('http://localhost:8080/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        const data = await res.json();
        setUser(data);
        setAuthModal(null);
        alert(`¡Registro exitoso! Bienvenido ${data.name}.`);
      } else {
        alert('Error al registrar: verifica los datos o el email ya está en uso.');
      }
    } catch {
      alert('Error conectando con el servidor backend.');
    }
  };

  const logout = () => setUser(null);

  // ── Render ───────────────────────────────────
  return (
    <>
      {/* Barra de navegación fija */}
      <Navbar
        currentPage={currentPage}
        user={user}
        onNavigateHome={() => setCurrentPage('home')}
        onNavigatePros={() => goToProfessionals()}
        onLogin={() => openAuthModal('login')}
        onRegister={() => openAuthModal('register')}
        onLogout={logout}
      />

      {/* Páginas */}
      {currentPage === 'home' && (
        <HomePage onFindExperts={goToProfessionals} />
      )}
      {currentPage === 'professionals' && (
        <ProfessionalsPage
          onBack={() => setCurrentPage('home')}
          initialSearch={initialSearch}
        />
      )}

      {/* Modal de login / registro */}
      {authModal && (
        <AuthModal
          mode={authModal}
          onClose={() => setAuthModal(null)}
          onSwitchToLogin={() => openAuthModal('login')}
          onSwitchToRegister={() => openAuthModal('register')}
          onLogin={handleLogin}
          onRegister={handleRegister}
          email={email} setEmail={setEmail}
          password={password} setPassword={setPassword}
          confirmPassword={confirmPassword} setConfirmPassword={setConfirmPassword}
          name={name} setName={setName}
          role={role} setRole={setRole}
          selectedProfessionId={selectedProfessionId} setSelectedProfessionId={setSelectedProfessionId}
        />
      )}
    </>
  );
}
