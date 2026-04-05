import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Onboarding from './Onboarding';

describe('Onboarding component', () => {
  it('renders the onboarding screen and shows the continue button', () => {
    const handleComplete = vi.fn();
    render(<Onboarding onComplete={handleComplete} />);

    expect(screen.getByRole('button', { name: /continuar/i })).toBeInTheDocument();
    expect(screen.getByText(/a lição mensal/i)).toBeInTheDocument();
  });
});
