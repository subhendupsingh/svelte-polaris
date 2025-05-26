import type { Action, ActionListSection, BadgeAction, DisableableAction, MenuGroupDescriptor } from "$utilities/types.js";
import type { ButtonProps } from "../button/button.types.js";

export type BulkAction = DisableableAction & BadgeAction;

export type BulkActionListSection = ActionListSection;

export type AriaLive = 'off' | 'polite' | undefined;

export interface BulkActionsProps {
    /** Visually hidden text for screen readers */
    accessibilityLabel?: string;
    /** State of the bulk actions checkbox */
    selected?: boolean;
    /** Text to select all across pages */
    paginatedSelectAllText?: string;
    /** Action for selecting all across pages */
    paginatedSelectAllAction?: Action;
    /** Callback when the select all checkbox is clicked */
    onToggleAll?(): void;
    /** Actions that will be given more prominence */
    promotedActions?: (BulkAction | MenuGroupDescriptor)[];
    /** List of actions */
    actions?: (BulkAction | BulkActionListSection)[];
    /** Disables bulk actions */
    disabled?: boolean;
    /** Callback when more actions button is toggled */
    onMoreActionPopoverToggle?(isOpen: boolean): void;
    /** The size of the buttons to render */
    buttonSize?: Extract<ButtonProps['size'], 'micro' | 'medium'>;
    /** Label for the bulk actions */
    label?: string;
    /** List is in a selectable state. Will only render the bulk actions when `true` */
    selectMode?: boolean;
    /** @deprecated Used for forwarding the ref. Use `ref` prop instead */
    innerRef?: any;
    /** @deprecated Callback when selectable state of list is changed. Unused callback */
    onSelectModeToggle?(selectMode: boolean): void;
    /** @deprecated If the BulkActions is currently sticky in view */
    isSticky?: boolean;
    /** @deprecated The width of the BulkActions */
    width?: number;
}

export interface BulkActionsState {
    visiblePromotedActions: number[];
    hiddenPromotedActions: number[];
    actionsWidths: number[];
    containerWidth: number;
    disclosureWidth: number;
    hasMeasured: boolean;
}