import type { ActionListSection, MenuGroupDescriptor } from "$utilities/types.js";

export interface MenuGroupProps extends MenuGroupDescriptor {
    /** Visually hidden menu description for screen readers */
    accessibilityLabel?: string;
    /** Whether or not the menu is open */
    active?: boolean;
    /** Callback when the menu is clicked */
    onClick?(openActions: () => void): void;
    /** Callback for opening the MenuGroup by title */
    onOpen(title: string): void;
    /** Callback for closing the MenuGroup by title */
    onClose(title: string): void;
    /** Collection of sectioned action items */
    sections?: readonly ActionListSection[];
}