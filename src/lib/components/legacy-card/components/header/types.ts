import type { DisableableAction } from '$utilities/types.js';
import type { Snippet } from 'svelte';

export interface LegacyCardHeaderProps {
    title?: string;
    actions?: DisableableAction[];
    children?: Snippet;
}