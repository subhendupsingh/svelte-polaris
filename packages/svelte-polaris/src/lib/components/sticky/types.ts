import type { useStickyManager } from "$utilities/sticky-manager/hooks.js";
import type { Snippet } from "svelte";

export interface State {
    isSticky: boolean;
    style: { [key: string]: string | number | undefined };
}

export type StickyProps = {
    /** Element outlining the fixed position boundaries */
    boundingElement?: HTMLElement | null;
    /** Offset vertical spacing from the top of the scrollable container */
    offset?: boolean;
    /** Should the element remain in a fixed position when the layout is stacked (smaller screens)  */
    disableWhenStacked?: boolean;
    /** Callback run when sticky header is added or removed  */
    onStickyChange?: (isSticky: boolean) => void;
    children: Snippet;
    isSticky?: boolean;
}

export type CombinedProps = StickyProps & {
    stickyManager: ReturnType<typeof useStickyManager>;
};