import type { ComplexAction, DisableableAction, LoadableAction } from "$utilities/types.js";
import type { Snippet } from "svelte";

export interface PageActionsProps {
    /** The primary action for the page */
    primaryAction?: (DisableableAction & LoadableAction) | Snippet;
    /** The secondary actions for the page */
    secondaryActions?: ComplexAction[] | Snippet;
}