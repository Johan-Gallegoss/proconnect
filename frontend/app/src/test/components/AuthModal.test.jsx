import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import AuthModal from '../../components/AuthModal';

describe('AuthModal Simple Test', () => {
  it('muestra el campo Nombre Completo en el registro', () => {
    const props = {
      mode: 'register',
      onClose: vi.fn(),
      onSwitchToLogin: vi.fn(),
      onSwitchToRegister: vi.fn(),
      onLogin: vi.fn(),
      onRegister: vi.fn(),
      email: '', setEmail: vi.fn(),
      password: '', setPassword: vi.fn(),
      confirmPassword: '', setConfirmPassword: vi.fn(),
      name: '', setName: vi.fn(),
      role: 'CLIENT', setRole: vi.fn(),
      selectedProfessionId: '', setSelectedProfessionId: vi.fn(),
    };
    render(<AuthModal {...props} />);
    expect(screen.getByPlaceholderText(/tu nombre completo/i)).toBeInTheDocument();
  });
});
