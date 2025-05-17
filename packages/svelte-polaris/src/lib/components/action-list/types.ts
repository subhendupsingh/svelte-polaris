import type { ActionListItemDescriptor, ActionListSection } from "$utilities/types.js";

export interface ActionListProps {
    /** Collection of actions for list */
    items?: readonly ActionListItemDescriptor[];
    /** Collection of sectioned action items */
    sections?: readonly ActionListSection[];
    /** Defines a specific role attribute for each action in the list */
    actionRole?: 'menuitem' | string;
    /** Allow users to filter items in the list. Will only show if more than 8 items in the list. The item content of every items must be a string for this to work */
    allowFiltering?: boolean;
    /** Filter label used as a placeholder in the search field */
    filterLabel?: string;
    /** Callback when any item is clicked or keypressed */
    onActionAnyItem?: ActionListItemDescriptor['onAction'];
}

export type ItemProps = ActionListItemDescriptor;

export interface SectionProps {
    /** Section of action items */
    section: ActionListSection;
    /** Should there be multiple sections */
    hasMultipleSections: boolean;
    /** Defines a specific role attribute for each action in the list */
    actionRole?: 'option' | 'menuitem' | string;
    /** Callback when any item is clicked or keypressed */
    onActionAnyItem?: ActionListItemDescriptor['onAction'];
    /** Whether it is the first in a group of sections */
    isFirst?: boolean;
}

export const FILTER_ACTIONS_THRESHOLD = 8;