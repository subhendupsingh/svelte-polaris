import type { Snippet } from "svelte";

type Element =
    | 'dt'
    | 'dd'
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'p'
    | 'span'
    | 'strong'
    | 'legend';

type Variant =
    | 'headingXs'
    | 'headingSm'
    | 'headingMd'
    | 'headingLg'
    | 'headingXl'
    | 'heading2xl'
    | 'heading3xl'
    | 'bodyXs'
    | 'bodySm'
    | 'bodyMd'
    | 'bodyLg';

type Alignment = 'start' | 'center' | 'end' | 'justify';

type FontWeight = 'regular' | 'medium' | 'semibold' | 'bold';

type Tone =
    | 'base'
    | 'disabled'
    | 'inherit'
    | 'success'
    | 'critical'
    | 'caution'
    | 'subdued'
    | 'text-inverse'
    | 'text-inverse-secondary'
    | 'magic'
    | 'magic-subdued';

type TextDecorationLine = 'line-through';

const deprecatedVariants: { [V in Variant]?: Variant } = {
    heading3xl: 'heading2xl',
};
export interface TextProps {
    /** Adjust horizontal alignment of text */
    alignment?: Alignment;
    /** The element type */
    as: Element;
    /** Prevent text from overflowing */
    breakWord?: boolean;
    /** Text to display */
    children: Snippet;
    /** Adjust tone of text */
    tone?: Tone;
    /** Adjust weight of text */
    fontWeight?: FontWeight;
    /** HTML id attribute */
    id?: string;
    /** Use a numeric font variant with monospace appearance */
    numeric?: boolean;
    /** Truncate text overflow with ellipsis */
    truncate?: boolean;
    /** Typographic style of text */
    variant?: Variant;
    /** Visually hide the text */
    visuallyHidden?: boolean;
    /** Add a line-through to the text */
    textDecorationLine?: TextDecorationLine;
}