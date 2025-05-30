import type { Rect } from "$utilities/geometry.js";
import type { PreferredAlignment, PreferredPosition } from "$utilities/math.js";
import type { Snippet } from "svelte";

export type Positioning = 'above' | 'below' | 'cover';

export interface OverlayDetails {
    left?: number;
    right?: number;
    desiredHeight: number;
    positioning: Positioning;
    measuring: boolean;
    activatorRect: Rect;
    chevronOffset: number;
}

export interface PositionedOverlayProps {
    active: boolean;
    activator: HTMLElement;
    preferInputActivator?: boolean;
    preferredPosition?: PreferredPosition;
    preferredAlignment?: PreferredAlignment;
    fullWidth?: boolean;
    fixed?: boolean;
    preventInteraction?: boolean;
    classNames?: string;
    zIndexOverride?: number;
    children?: Snippet;
    onScrollOut?(): void;
    overlayRef?: HTMLDivElement,
    overlayDetails: OverlayDetails,
    forceUpdatePosition?: () => void
}

export interface State {
    measuring: boolean;
    activatorRect: Rect;
    left?: number;
    right?: number;
    top: number;
    height: number;
    width: number | null;
    positioning: Positioning;
    zIndex: number | null;
    outsideScrollableContainer: boolean;
    lockPosition: boolean;
    chevronOffset: number;
}

export const OBSERVER_CONFIG = {
    childList: true,
    subtree: true,
    characterData: true,
    attributeFilter: ['style'],
};