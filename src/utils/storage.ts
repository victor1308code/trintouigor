// Utilitário seguro para localStorage que nunca lança exceção em modo anônimo/privativo
export function safeGetItem(key: string): string | null {
  try {
    if (typeof window === 'undefined' || !window.localStorage) return null;
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

export function safeSetItem(key: string, value: string): void {
  try {
    if (typeof window === 'undefined' || !window.localStorage) return;
    window.localStorage.setItem(key, value);
  } catch {
    // Modo privativo ou quota excedida
  }
}

export function safeRemoveItem(key: string): void {
  try {
    if (typeof window === 'undefined' || !window.localStorage) return;
    window.localStorage.removeItem(key);
  } catch {
    // ignore
  }
}

export function safeGetJson<T>(key: string, fallback: T): T {
  try {
    const raw = safeGetItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function safeSetJson(key: string, value: unknown): void {
  try {
    safeSetItem(key, JSON.stringify(value));
  } catch {
    // ignore
  }
}
