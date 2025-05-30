import type { Snippet } from "svelte";
import type { LabelProps } from "../label/types.js";
import type { Action } from "$utilities/types.js";
import type { Error } from "$utilities/types.js";

export interface LabelledProps {
    /** A unique identifier for the label */
    id: LabelProps['id'];
    /** Text for the label */
    label: string;
    /** Error to display beneath the label */
    error?: Error | boolean;
    /** An action */
    action?: Action;
    /** Additional hint text to display */
    helpText?: Snippet | string;
    /** Content to display inside the connected */
    children?: Snippet;
    /** Visually hide the label */
    labelHidden?: boolean;
    /** Visual required indicator for the label */
    requiredIndicator?: boolean;
    /** Labels signify a disabled control */
    disabled?: boolean;
    /** Labels signify a readOnly control */
    readOnly?: boolean;
}