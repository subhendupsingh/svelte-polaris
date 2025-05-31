import type { Target } from "$utilities/types.js";
import type { Snippet } from "svelte";

export interface LinkProps {
    /** ID for the link */
    id?: string;
    /** The url to link to */
    url?: string;
    /** The content to display inside the link */
    children?: Snippet;
    /** Makes the link open in a new tab
     * @deprecated use `target` set to `_blank` instead
     */
    external?: boolean;
    /** Where to display the url */
    target?: Target;
    /** Makes the link color the same as the current text color and adds an underline */
    monochrome?: boolean;
    /** Removes text decoration underline to the link */
    removeUnderline?: boolean;
    /** Callback when a link is clicked */
    onClick?(): void;
    /** Descriptive text to be read to screenreaders */
    accessibilityLabel?: string;
    /** Indicates whether or not the link is the primary navigation link when rendered inside of an `IndexTable.Row` */
    dataPrimaryLink?: boolean;
}
