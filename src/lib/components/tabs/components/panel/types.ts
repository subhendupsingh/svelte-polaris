import type { Snippet } from "svelte";

export interface PanelProps {
    hidden?: boolean;
    id: string;
    tabID: string;
    children?: Snippet;
}