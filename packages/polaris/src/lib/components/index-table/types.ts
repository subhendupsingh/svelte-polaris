import type { Snippet } from "svelte";
import type { Width } from "../tooltip/types.js";
import type { SpaceScale } from "@shopify/polaris-tokens";
import type { NonEmptyArray } from "$utilities/types.js";
import type { PaginationProps } from "../pagination/types.js";
import type { BulkActionsProps } from "../bulk-actions/types.js";
import type { IndexProviderProps } from "$utilities/index-provider/types.js";

interface IndexTableHeadingBase {
    id?: string;
    /**
     * Adjust horizontal alignment of header content.
     * @default 'start'
     */
    alignment?: 'start' | 'center' | 'end';
    flush?: boolean;
    new?: boolean;
    hidden?: boolean;
    tooltipContent?: Snippet;
    tooltipWidth?: Width;
    tooltipPersistsOnClick?: boolean;
    /**
     * The direction to sort the table rows on first click or keypress of this column heading.
     * When not specified, the value from IndexTable.defaultSortDirection will be used.
     */
    defaultSortDirection?: IndexTableSortDirection;
    /** Horizontal end spacing around title. Accepts a spacing token. */
    paddingBlockEnd?: SpaceScale;
}

interface IndexTableHeadingTitleString extends IndexTableHeadingBase {
    title: string;
    id?: string;
}

interface IndexTableHeadingTitleNode extends IndexTableHeadingBase {
    title: Snippet;
    id: string;
}

export type IndexTableHeading =
    | IndexTableHeadingTitleString
    | IndexTableHeadingTitleNode;

export type IndexTableSortDirection = 'ascending' | 'descending';

type IndexTableSortToggleLabel = {
    [key in IndexTableSortDirection]: string;
};

interface IndexTableSortToggleLabels {
    [key: number]: IndexTableSortToggleLabel;
}

export type IndexTablePaginationProps = Omit<PaginationProps, 'type'>;

export interface IndexTableBaseProps {
    headings: NonEmptyArray<IndexTableHeading>;
    promotedBulkActions?: BulkActionsProps['promotedActions'];
    bulkActions?: BulkActionsProps['actions'];
    children?: Snippet;
    emptyState?: Snippet;
    sort?: Snippet;
    paginatedSelectAllActionText?: string;
    paginatedSelectAllText?: string;
    lastColumnSticky?: boolean;
    selectable?: boolean;
    /** List of booleans, which maps to whether sorting is enabled or not for each column. Defaults to false for all columns.  */
    sortable?: boolean[];
    /**
     * The direction to sort the table rows on first click or keypress of a sortable column heading. Defaults to descending.
     * @default 'descending'
     */
    defaultSortDirection?: IndexTableSortDirection;
    /** The current sorting direction. */
    sortDirection?: IndexTableSortDirection;
    /**
     * The index of the heading that the table rows are sorted by.
     */
    sortColumnIndex?: number;
    /** Callback fired on click or keypress of a sortable column heading. */
    onSort?(headingIndex: number, direction: IndexTableSortDirection): void;
    /** Optional dictionary of sort toggle labels for each sortable column, with ascending and descending label,
     * with the key as the index of the column */
    sortToggleLabels?: IndexTableSortToggleLabels;
    /** Add zebra striping to table rows */
    hasZebraStriping?: boolean;
    /** Properties to enable pagination at the bottom of the table. */
    pagination?: IndexTablePaginationProps;
    isSticky?: boolean;
}

export interface TableHeadingRect {
    offsetWidth: number;
    offsetLeft: number;
}

export const SCROLL_BAR_PADDING = 16;
export const SCROLL_BAR_DEBOUNCE_PERIOD = 300;

export interface IndexTableProps extends IndexTableBaseProps, IndexProviderProps {}