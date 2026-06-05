import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Navbar from '../../components/Navbar';

describe('Navbar Simple Test', () => {
  it('muestra los botones Iniciar Sesión y Registrarse si no hay usuario', () => {
    const defaultProps = {
      currentPage: 'home',
      user: null,
      onNavigateHome: vi.fn(),
      onNavigatePros: vi.fn(),
      onLogin: vi.fn(),
      onRegister: vi.fn(),
      onLogout: vi.fn(),
    };
    render(<Navbar {...defaultProps} />);
    expect(screen.getByRole('button', { name: /iniciar sesión/i })).toBeInTheDocument();
  });
});
