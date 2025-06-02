import type { Component, Snippet } from 'svelte';

// Type guard for Snippet
export function isSnippet(value: unknown): value is Snippet {
  return (
    value !== null &&
    typeof value === 'object' &&
    '$$render' in value &&
    typeof (value as any).$$render === 'function'
  );
}

// Type guard for Component
export function isComponent(value: unknown): value is Component {
  return typeof value === 'function' && !isSnippet(value);
}

// Type guard for string
export function isString(value: unknown): value is string {
  return typeof value === 'string';
}

// Type guard for number
export function isNumber(value: unknown): value is number {
  return typeof value === 'number';
}

// Combined type for common prop types
export type PropContent = Snippet | Component | string | number;

// Type guard that narrows to the specific type
export function getPropContentType(value: PropContent): 
  | { type: 'snippet'; value: Snippet }
  | { type: 'component'; value: Component }
  | { type: 'string'; value: string }
  | { type: 'number'; value: number }
  | { type: 'unknown'; value: unknown } {
  
  if (isSnippet(value)) {
    return { type: 'snippet', value };
  }
  if (isComponent(value)) {
    return { type: 'component', value };
  }
  if (isString(value)) {
    return { type: 'string', value };
  }
  if (isNumber(value)) {
    return { type: 'number', value };
  }
  return { type: 'unknown', value };
}