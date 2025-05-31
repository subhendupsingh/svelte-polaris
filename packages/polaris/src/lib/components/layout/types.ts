import type { Snippet } from "svelte";

export interface AnnotatedSectionProps {
    children?: Snippet;
    title?: Snippet | string;
    description?: Snippet | string;
    id?: string;
}

export interface SectionProps {
    children?: Snippet;
    variant?: 'oneHalf' | 'oneThird' | 'fullWidth';
}

export interface LayoutProps {
    /** Automatically adds sections to layout. */
    sectioned?: boolean;
    /** The content to display inside the layout. */
    children?: Snippet;
}
