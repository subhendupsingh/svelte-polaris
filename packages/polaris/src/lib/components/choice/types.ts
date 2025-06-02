import type { ResponsiveProp } from "$utilities/css.js";
import type { SvelteNode } from "$utilities/types.js";
import type { SpaceScale } from "@shopify/polaris-tokens";
import type { Snippet } from "svelte";

type Spacing = ResponsiveProp<SpaceScale>;

export interface ChoiceBleedProps {
    /** Spacing around children. Accepts a spacing token or an object of spacing tokens for different screen sizes.
     * @example
     * bleed='4'
     * bleed={{xs: '2', sm: '3', md: '4', lg: '5', xl: '6'}}
     */
    bleed?: Spacing;
    /** Vertical start spacing around children. Accepts a spacing token or an object of spacing tokens for different screen sizes.
     * @example
     * bleedBlockStart='4'
     * bleedBlockStart={{xs: '2', sm: '3', md: '4', lg: '5', xl: '6'}}
     */
    bleedBlockStart?: Spacing;
    /** Vertical end spacing around children. Accepts a spacing token or an object of spacing tokens for different screen sizes.
     * @example
     * bleedBlockEnd='4'
     * bleedBlockEnd={{xs: '2', sm: '3', md: '4', lg: '5', xl: '6'}}
     */
    bleedBlockEnd?: Spacing;
    /** Horizontal start spacing around children. Accepts a spacing token or an object of spacing tokens for different screen sizes.
     * @example
     * bleedInlineStart='4'
     * bleedInlineStart={{xs: '2', sm: '3', md: '4', lg: '5', xl: '6'}}
     */
    bleedInlineStart?: Spacing;
    /** Horizontal end spacing around children. Accepts a spacing token or an object of spacing tokens for different screen sizes.
     * @example
     * bleedInlineEnd='4'
     * bleedInlineEnd={{xs: '2', sm: '3', md: '4', lg: '5', xl: '6'}}
     */
    bleedInlineEnd?: Spacing;
}

export interface ChoiceProps extends ChoiceBleedProps {
    /** A unique identifier for the choice */
    id: string;
    /**	Label for the choice */
    label: SvelteNode;
    /** Whether the associated form control is disabled */
    disabled?: boolean;
    /** Visually hide the label */
    labelHidden?: boolean;
    /**  Content to display inside the choice */
    children?: Snippet;
    /** Callback when clicked */
    onClick?(): void;
    /** Added to the label element */
    labelClassName?: string;
    /** Grow to fill the space. Equivalent to width: 100%; height: 100% */
    fill?: ResponsiveProp<boolean>;
    /** Display an error message */
    error?: Error | boolean;
    /** Additional text to aide in use. Will add a wrapping <div> */
    helpText?: string;
    /** Indicates the tone of the choice */
    tone?: 'magic';
}

export function helpTextID(id: string) {
    return `${id}HelpText`;
}