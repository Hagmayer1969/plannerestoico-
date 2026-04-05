import { describe, expect, it, beforeEach } from 'vitest';
import { loadJson, saveJson } from './localStorage';

describe('localStorage util', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('saves and loads an object as JSON', () => {
    const data = { a: 1, b: 'teste' };
    saveJson('test-key', data);

    expect(window.localStorage.getItem('test-key')).toBe(JSON.stringify(data));
    expect(loadJson('test-key', null)).toEqual(data);
  });

  it('returns fallback when key is missing', () => {
    expect(loadJson('missing-key', { fallback: true })).toEqual({ fallback: true });
  });
});
