import type { ComplexAction, DisableableAction } from '$utilities/types.js';
import type { Snippet } from 'svelte';

export interface LegacyCardProps {
    /** Title content for the card */
    title?: string;
    /** Inner content of the card */
    children?: Snippet;
    /** A less prominent card */
    subdued?: boolean;
    /** Auto wrap content in section */
    sectioned?: boolean;
    /** Card header actions */
    actions?: DisableableAction[];
    /** Primary action in the card footer */
    primaryFooterAction?: ComplexAction;
    /** Secondary actions in the card footer */
    secondaryFooterActions?: ComplexAction[];
    /** The content of the disclosure button rendered when there is more than one secondary footer action */
    secondaryFooterActionsDisclosureText?: string;
    /** Alignment of the footer actions on the card, defaults to right */
    footerActionAlignment?: 'right' | 'left';
    /** Allow the card to be hidden when printing */
    hideOnPrint?: boolean;
}