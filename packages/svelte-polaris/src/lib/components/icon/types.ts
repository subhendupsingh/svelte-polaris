import type { IconSource } from "$utilities/types.js";

type Tone =
    | 'base'
    | 'inherit'
    | 'subdued'
    | 'caution'
    | 'warning'
    | 'critical'
    | 'interactive'
    | 'info'
    | 'success'
    | 'primary'
    | 'emphasis'
    | 'magic'
    | 'textCaution'
    | 'textWarning'
    | 'textCritical'
    | 'textInfo'
    | 'textSuccess'
    | 'textPrimary'
    | 'textMagic';

export interface IconProps {
    /** The SVG contents to display in the icon (icons should fit in a 20 × 20 pixel viewBox) */
    source: IconSource;
    /** Set the color for the SVG fill */
    tone?: Tone;
    /** Descriptive text to be read to screenreaders */
    accessibilityLabel?: string;
}