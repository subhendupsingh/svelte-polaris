import type { PortalsContainerElement } from "$utilities/contexts.js";
import type { Snippet } from "svelte";

export interface PortalsManagerProps {
    children: Snippet;
    container?: PortalsContainerElement;
}