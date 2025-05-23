import type { PositionedOverlayProps } from "$lib/components/positioned-overlay/types.js";
import type { Snippet } from "svelte";

export enum PopoverCloseSource {
    Click,
    EscapeKeypress,
    FocusOut,
    ScrollOut,
}

export type PopoverAutofocusTarget = 'none' | 'first-node' | 'container';

export enum TransitionStatus {
    Entering = 'entering',
    Entered = 'entered',
    Exiting = 'exiting',
    Exited = 'exited',
}

export interface PopoverOverlayProps {
    children?: Snippet;
    fullWidth?: boolean;
    fullHeight?: boolean;
    fluidContent?: boolean;
    preferredPosition?: PositionedOverlayProps['preferredPosition'];
    preferredAlignment?: PositionedOverlayProps['preferredAlignment'];
    active: boolean;
    id: string;
    zIndexOverride?: number;
    activator: HTMLElement;
    preferInputActivator?: PositionedOverlayProps['preferInputActivator'];
    sectioned?: boolean;
    fixed?: boolean;
    hideOnPrint?: boolean;
    onClose(source: PopoverCloseSource): void;
    autofocusTarget?: PopoverAutofocusTarget;
    preventCloseOnChildOverlayClick?: boolean;
    captureOverscroll?: boolean;
    forceUpdatePosition?: () => void;
    overlayRef?: HTMLDivElement;
}

export interface State {
    transitionStatus: TransitionStatus;
    window?: Window | null;
}

export function nodeContainsDescendant(
    rootNode: HTMLElement,
    descendant: HTMLElement,
): boolean {
    if (rootNode === descendant) {
        return true;
    }

    let parent = descendant.parentNode;

    while (parent != null) {
        if (parent === rootNode) {
            return true;
        }
        parent = parent.parentNode;
    }

    return false;
}

export type PortalsContainerElement = HTMLDivElement | null;