import type { ActionListItemDescriptor, ComplexAction } from "$utilities/types.js";
import type { Snippet } from "svelte";

// Type definitions for media-card
export type Size = 'small' | 'medium';

export interface MediaCardProps {
    /** The visual media to display in the card */
    children: Snippet;
    /** Heading content */
    title: Snippet | string;
    /** Body content */
    description: string;
    /** Main call to action, rendered as a basic button */
    primaryAction?: ComplexAction;
    /** Secondary call to action, rendered as a plain button */
    secondaryAction?: ComplexAction;
    /** Action list items to render in ellipsis popover */
    popoverActions?: ActionListItemDescriptor[];
    /** Whether or not card content should be laid out vertically
     * @default false
     */
    portrait?: boolean;
    /** Size of the visual media in the card
     * @default 'medium'
     */
    size?: Size;
    /** Callback when MediaCard is dismissed */
    onDismiss?: () => void;
}