import type { Component, Snippet } from "svelte";

export function isInterface<T extends object>(
    x: T | Component | Snippet<any> | string | number | boolean | null | undefined
): x is T {
    // Check if x is an object, not null.
    // Functions are objects in JS, but `typeof x === 'function'` would be true for them.
    // This check correctly identifies plain objects.
    if (typeof x === 'object' && x !== null) {
        return true; // It's a non-null object, so it matches `T extends object`.
    }
    return false;
}