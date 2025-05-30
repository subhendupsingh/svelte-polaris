import type { ComplexAction } from '$utilities/types.js';
import type { Snippet } from 'svelte';

export interface LegacyCardSectionProps {
    title?: string;
    children?: Snippet;
    subdued?: boolean;
    flush?: boolean;
    fullWidth?: boolean;
    /** Allow the card to be hidden when printing */
    hideOnPrint?: boolean;
    actions?: ComplexAction[];
}