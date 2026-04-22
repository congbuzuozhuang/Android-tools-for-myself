const PREFIX = 'android-tools:';

export function loadFromStorage<T>(key: string, defaultValue: T): T {
  try {
    const item = localStorage.getItem(PREFIX + key);
    return item ? JSON.parse(item) : defaultValue;
  } catch {
    return defaultValue;
  }
}

export function saveToStorage(key: string, value: unknown): void {
  try {
    localStorage.setItem(PREFIX + key, JSON.stringify(value));
  } catch (e) {
    console.error('Failed to save to storage:', e);
  }
}

export function saveToolConfig(toolId: string, config: Record<string, unknown>): void {
  saveToStorage(`tool:${toolId}:config`, config);
}

export function loadToolConfig(toolId: string): Record<string, unknown> {
  return loadFromStorage(`tool:${toolId}:config`, {});
}

export function clearToolConfig(toolId: string): void {
  localStorage.removeItem(PREFIX + `tool:${toolId}:config`);
}