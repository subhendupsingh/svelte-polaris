import type { Snippet } from "svelte";

interface Item {
    /** Title of the item */
    term: string | Snippet;
    /**  Item content */
    description: string | Snippet;
}

export interface DescriptionListProps {
    /** Collection of items for list */
    items: Item[];
    /** Determines the spacing between list items */
    gap?: 'tight' | 'loose';
}