import type { DestructableAction, DisableableAction, LoadableAction, IconableAction, TooltipAction, MenuActionDescriptor, MenuGroupDescriptor } from "$utilities/types.js";
import type { Component, Snippet } from "svelte";
import type { TitleProps } from "./components/page-title/types.js";
import type { PaginationProps } from "$lib/components/pagination/types.js";
import type { BreadcrumbsProps } from "$lib/components/breadcrumbs/types.js";

export interface PrimaryAction
    extends DestructableAction,
    DisableableAction,
    LoadableAction,
    IconableAction,
    TooltipAction {
    /** Provides extra visual weight and identifies the primary action in a set of buttons */
    primary?: boolean;
}

export interface HeaderProps extends TitleProps {
    /** Visually hide the title */
    titleHidden?: boolean;
    /** A label to use for the page when the page is ready, used by screen readers. Will override the title prop if present */
    pageReadyAccessibilityLabel?: string;
    /** Enables filtering action list items */
    filterActions?: boolean;
    /** Primary page-level action */
    primaryAction?: PrimaryAction | Snippet;
    /** Page-level pagination */
    pagination?: PaginationProps;
    /**
     * @deprecated A back action link
     * Use `breadcrumbs` prop instead as documented [here](https://shopify.dev/docs/api/app-bridge/previous-versions/actions/titlebar#using-titlebar-with-polaris)
     */
    backAction?: BreadcrumbsProps['backAction'];
    /** Collection of secondary page-level actions */
    secondaryActions?: MenuActionDescriptor[] | Snippet;
    /** Collection of page-level groups of secondary actions */
    actionGroups?: MenuGroupDescriptor[];
    // Additional meta data
    additionalMetadata?: Snippet | string;
    /** Callback that returns true when secondary actions are rolled up into action groups, and false when not */
    onActionRollup?(hasRolledUp: boolean): void;
}

export const SHORT_TITLE = 20;
export const REALLY_SHORT_TITLE = 8;
export const LONG_TITLE = 34;

export function isSvelteConstruct(value: unknown): value is Component | Snippet<any> {
    // Svelte Components and Snippets are functions when passed as props
    return typeof value === 'function';
}