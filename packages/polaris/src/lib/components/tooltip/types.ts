import type { BorderRadiusAliasOrScale, SpaceScale } from "@shopify/polaris-tokens";
import type { TooltipOverlayProps } from "./components/tooltip-overlay/types.js";
import type { Snippet } from "svelte";

export type Width = 'default' | 'wide';
export type Padding = 'default' | Extract<SpaceScale, '400'>;
export type BorderRadius = Extract<BorderRadiusAliasOrScale, '100' | '200'>;

export interface TooltipProps {
    /** The element that will activate to tooltip */
    children?: Snippet;
    /** The content to display within the tooltip */
    content: Snippet | string;
    /** Toggle whether the tooltip is visible */
    active?: boolean;
    /** Delay in milliseconds while hovering over an element before the tooltip is visible */
    hoverDelay?: number;
    /** Dismiss tooltip when not interacting with its children */
    dismissOnMouseOut?: TooltipOverlayProps['preventInteraction'];
    /**
     * The direction the tooltip tries to display
     * @default 'above'
     */
    preferredPosition?: TooltipOverlayProps['preferredPosition'];
    /**
     * The element type to wrap the activator in
     * @default 'span'
     */
    activatorWrapper?: string;
    /** Visually hidden text for screen readers */
    accessibilityLabel?: string;
    /**
     * Width of content
     * @default 'default'
     */
    width?: Width;
    /**
     * Padding of content
     * @default 'default'
     */
    padding?: Padding;
    /**
     * Border radius of the tooltip
     * @default '200'
     */
    borderRadius?: BorderRadius;
    /** Override on the default z-index of 400 */
    zIndexOverride?: number;
    /** Whether to render a dotted underline underneath the tooltip's activator */
    hasUnderline?: boolean;
    /** Whether the tooltip's content remains open after clicking the activator */
    persistOnClick?: boolean;
    /* Callback fired when the tooltip is activated */
    onOpen?(): void;
    /* Callback fired when the tooltip is dismissed */
    onClose?(): void;
  }
  
  export const HOVER_OUT_TIMEOUT = 150;