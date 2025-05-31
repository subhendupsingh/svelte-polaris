import type { Snippet } from "svelte";
import type { HeaderProps } from "./components/page-header/types.js";

// Type definitions for page
export interface PageProps extends HeaderProps {
    /** The contents of the page */
    children?: Snippet;
    /** Remove the normal max-width on the page */
    fullWidth?: boolean;
    /** Decreases the maximum layout width. Intended for single-column layouts */
    narrowWidth?: boolean;
}