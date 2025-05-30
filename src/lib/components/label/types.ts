import type { Snippet } from "svelte";

export interface LabelProps {
    /** Label content */
    children?: Snippet;
    /** A unique identifier for the label */
    id: string;
    /** Visually hide the label */
    hidden?: boolean;
    /** Visual required indicator for the label */
    requiredIndicator?: boolean;
}

export function labelID(id: string) {
    return `${id}Label`;
}