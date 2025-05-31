import type { Snippet } from "svelte";

export interface ItemProps {
    id: string;
    focused: boolean;
    children?: Snippet;
    url?: string;
    accessibilityLabel?: string;
    onClick?(): void;
}