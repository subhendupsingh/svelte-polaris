import type { Snippet } from "svelte";
import { Popover as PopoverPrimitive } from "bits-ui"

export enum PopoverCloseSource {
    Click,
    EscapeKeypress,
    FocusOut,
    ScrollOut,
}

export type PopoverAutofocusTarget = 'none' | 'first-node' | 'container';


type ContentProps = PopoverPrimitive.ContentProps;


export interface PopoverProps {
    /** The content to display inside the popover */
    children?: Snippet;
    /** The preferred direction to open the popover */
    preferredPosition?: ContentProps['side'];
    /** The preferred alignment of the popover relative to its activator */
    preferredAlignment?: ContentProps['align'];
    /** Show or hide the Popover */
    active?: boolean;
    /** The element to activate the Popover.
     * If using a button, use the default or tertiary variant
     * which will show an active state when popover is active
     */
    activator?: Snippet<[{ props: PopoverPrimitive.TriggerProps}]>
    /**
     * Use the activator's input element to calculate the Popover position
     * @default true
     */
    preferInputActivator?: boolean;
    /**
     * The element type to wrap the activator with
     * @default 'div'
     */
    activatorWrapper?: string;
    /** Override on the default z-index of 400 */
    zIndexOverride?: number;
    /** Prevents focusing the activator or the next focusable element when the popover is deactivated */
    preventFocusOnClose?: boolean;
    /** Automatically add wrap content in a section */
    sectioned?: boolean;
    /** Allow popover to stretch to the full width of its activator */
    fullWidth?: boolean;
    /** Allow popover to stretch to fit content vertically */
    fullHeight?: boolean;
    /** Allow popover content to determine the overlay width and height */
    fluidContent?: boolean;
    /** Remains in a fixed position */
    fixed?: boolean;
    /** Allow the popover overlay to be hidden when printing */
    hideOnPrint?: boolean;
    /** Callback when popover is closed */
    onClose?(): void;
    /**
     * The preferred auto focus target defaulting to the popover container
     * @default 'container'
     */
    autofocusTarget?: boolean;
    /** Prevents closing the popover when other overlays are clicked */
    preventCloseOnChildOverlayClick?: boolean;
    /**
     * Prevents page scrolling when the end of the scrollable Popover overlay content is reached - applied to Pane subcomponent
     * @default false
     */
    captureOverscroll?: boolean;
    preventInteraction?: boolean;
    classNames?: string;
    sideOffset?: ContentProps['sideOffset'];
}