export function loadJson<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') {
    return fallback;
  }

  try {
    const item = window.localStorage.getItem(key);
    if (!item) {
      return fallback;
    }
    return JSON.parse(item) as T;
  } catch {
    return fallback;
  }
}

export function saveJson<T>(key: string, value: T): void {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Falha silenciosa para evitar crash em browsers com localStorage restrito.
  }
}
