import type { MenuActionDescriptor, MenuGroupDescriptor } from "$utilities/types.js";

// Type definitions for action-menu
export interface ActionMenuProps {
    /** Collection of page-level secondary actions */
    actions?: MenuActionDescriptor[];
    /** Collection of page-level action groups */
    groups?: MenuGroupDescriptor[];
    /** Roll up all actions into a Popover > ActionList */
    rollup?: boolean;
    /** Label for rolled up actions activator */
    rollupActionsLabel?: string;
    /** Callback that returns true when secondary actions are rolled up into action groups, and false when not */
    onActionRollup?(hasRolledUp: boolean): void;
}

export function hasGroupsWithActions(groups: ActionMenuProps['groups'] = []) {
    return groups.length === 0
        ? false
        : groups.some((group) => group.actions.length > 0);
}