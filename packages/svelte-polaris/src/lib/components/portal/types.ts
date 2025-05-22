import type { Snippet } from "svelte";

export interface PortalProps {
    children?: Snippet;
    idPrefix?: string;
    onPortalCreated?(): void;
}