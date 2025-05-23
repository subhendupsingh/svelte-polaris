import type { Snippet } from "svelte";

export interface SectionProps {
    divider?: boolean;
    children?: Snippet;
    title: string|Snippet;
}

export const SECTION_CONTEXT_KEY = 'polaris-section-context';