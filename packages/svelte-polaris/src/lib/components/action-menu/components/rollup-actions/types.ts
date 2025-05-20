import type { ActionListItemDescriptor, ActionListSection } from "$utilities/types.js";

export interface RollupActionsProps {
    /** Accessibilty label */
    accessibilityLabel?: string;
    /** Collection of actions for the list */
    items?: ActionListItemDescriptor[];
    /** Collection of sectioned action items */
    sections?: ActionListSection[];
}