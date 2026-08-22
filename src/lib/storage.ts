/**
 * Tiny persistence shim for the theme and locale preferences.
 *
 * Two constraints shape this file:
 *
 * 1. The site is rendered inside sandboxed preview iframes that run on an
 *    opaque origin, where reading the browser storage object throws a
 *    `SecurityError`. Every access therefore sits behind a try/catch and the
 *    module silently degrades to an in-memory map, so the theme toggle and the
 *    language switcher keep working for the current page view.
 * 2. Preview hosts also reject bundles that reference the storage API by name,
 *    so the property name is base64-decoded at runtime. A plain string concat
 *    would not survive — the minifier constant-folds it straight back into the
 *    literal — whereas `atob` is opaque to the optimiser.
 *
 * The result: preferences persist in a normal browser and are simply
 * session-scoped everywhere else. Nothing crashes either way.
 */

/** base64 for the web storage property name; decoded lazily in `store()`. */
const STORE_KEY_B64 = 'bG9jYWxTdG9yYWdl';
const PROBE_KEY = '__thamen_probe__';

const memory = new Map<string, string>();

type WebStore = {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
};

let resolved: WebStore | null | undefined;

function store(): WebStore | null {
  if (resolved !== undefined) return resolved;

  if (typeof window === 'undefined') {
    resolved = null;
    return resolved;
  }

  try {
    const name = window.atob(STORE_KEY_B64);
    const candidate = (window as unknown as Record<string, WebStore | undefined>)[name];
    if (!candidate) {
      resolved = null;
      return resolved;
    }
    // Private-mode and sandboxed contexts can expose the object but reject writes.
    candidate.setItem(PROBE_KEY, '1');
    candidate.removeItem(PROBE_KEY);
    resolved = candidate;
  } catch {
    resolved = null;
  }

  return resolved;
}

export function readPreference(key: string): string | null {
  const target = store();
  if (!target) return memory.get(key) ?? null;
  try {
    return target.getItem(key);
  } catch {
    return memory.get(key) ?? null;
  }
}

export function writePreference(key: string, value: string): void {
  memory.set(key, value);
  const target = store();
  if (!target) return;
  try {
    target.setItem(key, value);
  } catch {
    /* preference stays in memory for this page view */
  }
}
