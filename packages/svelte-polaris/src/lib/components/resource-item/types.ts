import type { Component, Snippet } from "svelte";
import type { AvatarProps } from "../avatar/types.js";
import type { ThumbnailProps } from "../thumbnail/types.js";
import type { DisableableAction, ResourceListContextType } from "$utilities/types.js";
import type { BreakpointsDirectionAlias } from "$lib/use/use-breakpoints.svelte.js";

export type Alignment = 'leading' | 'trailing' | 'center' | 'fill' | 'baseline';

export interface BaseProps {
    /** Whether or not interaction is disabled */
    disabled?: boolean;
    /** Visually hidden text for screen readers used for item link */
    accessibilityLabel?: string;
    /** Individual item name used by various text labels */
    name?: string;
    /** Id of the element the item onClick controls */
    ariaControls?: string;
    /** Tells screen reader the controlled element is expanded */
    ariaExpanded?: boolean;
    /** Unique identifier for the item */
    id: string;
    /** Content for the media area at the left of the item, usually an Avatar or Thumbnail */
    media?: Component<AvatarProps | ThumbnailProps>;
    /** Makes the shortcut actions always visible */
    persistActions?: boolean;
    /** 1 or 2 shortcut actions; must be available on the page linked to by url */
    shortcutActions?: DisableableAction[];
    /** The order the item is rendered */
    sortOrder?: number;
    /** URL for the resource’s details page (required unless onClick is provided) */
    url?: string;
    /** Allows url to open in a new tab */
    external?: boolean;
    /** Callback when clicked (required if url is omitted) */
    onClick?(id?: string): void;
    /** Content for the details area */
    children?: Snippet;
    /** Adjust vertical alignment of elements */
    verticalAlignment?: Alignment;
    /** Prefetched url attribute to bind to the main element being returned */
    dataHref?: string;
    /** Callback when mouse cursor is on item */
    onMouseOver?: () => void;
    /** Callback when mouse cursor leaves item */
    onMouseOut?: () => void;
}

export interface PropsWithUrl extends BaseProps {
    url: string;
    onClick?(id?: string): void;
}

export interface PropsWithClick extends BaseProps {
    url?: string;
    onClick(id?: string): void;
}

export type ResourceItemProps = PropsWithUrl | PropsWithClick;

export type BreakpointsMatches = {
    [DirectionAlias in BreakpointsDirectionAlias]: boolean;
};

export interface PropsFromWrapper {
    breakpoints?: BreakpointsMatches;
    context: ResourceListContextType;
}

export interface State {
    actionsMenuVisible: boolean;
    focused: boolean;
    focusedInner: boolean;
    selected: boolean;
}

export type CombinedProps = PropsFromWrapper & (PropsWithUrl | PropsWithClick);