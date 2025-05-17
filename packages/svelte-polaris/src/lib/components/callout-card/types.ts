import type { IconableAction } from "$utilities/types.js";
import type { Snippet } from "svelte";
import type { ButtonProps } from "../button/button.types.js";

export interface CalloutCardProps {
    /** The content to display inside the callout card. */
    children?: Snippet;
    /** The title of the card */
    title: string;
    /** URL to the card illustration */
    illustration: string;
    /** Primary action for the card */
    primaryAction: IconableAction;
    /** Secondary action for the card */
    secondaryAction?: IconableAction & Pick<ButtonProps, 'variant'>;
    /** Callback when banner is dismissed */
    onDismiss?(): void;
}