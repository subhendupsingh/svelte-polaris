import type { PositionedOverlayProps } from "$lib/components/positioned-overlay/types.js";
import type { Snippet } from "svelte";
import type { BorderRadius, Padding, Width } from "../../types.js";

export interface TooltipOverlayProps {
    id: string;
    active: boolean;
    preventInteraction?: PositionedOverlayProps['preventInteraction'];
    preferredPosition?: PositionedOverlayProps['preferredPosition'];
    children?: Snippet;
    activator?: HTMLElement;
    accessibilityLabel?: string;
    width?: Width;
    padding?: Padding;
    borderRadius?: BorderRadius;
    zIndexOverride?: number;
    onClose(): void;
    instant?: boolean;
}