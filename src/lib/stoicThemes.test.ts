import { describe, expect, it } from 'vitest';
import { getMonthlyTheme, getPreferredLocale } from './stoicThemes';

describe('stoicThemes utilities', () => {
  it('returns the correct locale mapping', () => {
    expect(getPreferredLocale('en-GB')).toBe('en-US');
    expect(getPreferredLocale('es-ES')).toBe('es-ES');
    expect(getPreferredLocale('pt-BR')).toBe('pt-BR');
    expect(getPreferredLocale('fr-FR')).toBe('pt-BR');
  });

  it('returns the theme of the given month in the correct language', () => {
    const january = getMonthlyTheme(new Date(2026, 0, 15), 'pt-BR');
    expect(january.title).toBe('Memento Mori');
    expect(january.quote).toContain('Você ainda tem tempo');

    const april = getMonthlyTheme(new Date(2026, 3, 10), 'en-US');
    expect(april.title).toBe('Dicotomia do Controle');
    expect(april.quote).toContain('There are things within our control');
  });
});
