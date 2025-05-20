import type { MenuActionDescriptor, MenuGroupDescriptor } from "$utilities/types.js";

export interface Props {
    /** Collection of page-level secondary actions */
    actions?: MenuActionDescriptor[];
    /** Collection of page-level action groups */
    groups?: MenuGroupDescriptor[];
    /** Callback that returns true when secondary actions are rolled up into action groups, and false when not */
    onActionRollup?(hasRolledUp: boolean): void;
}

export interface ActionsState {
    visibleActions: number[];
    hiddenActions: number[];
    visibleGroups: number[];
    hiddenGroups: number[];
    actionsWidths: number[];
    containerWidth: number;
    disclosureWidth: number;
    hasMeasured: boolean;
}