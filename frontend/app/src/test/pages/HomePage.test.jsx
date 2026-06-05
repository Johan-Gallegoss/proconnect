import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import HomePage from '../../pages/HomePage';

describe('HomePage Simple Test', () => {
  it('renderiza el botón "Buscar Expertos"', () => {
    render(<HomePage onFindExperts={vi.fn()} />);
    expect(screen.getByRole('button', { name: /buscar expertos/i })).toBeInTheDocument();
  });
});
