import type { Snippet } from "svelte";
import type { PaginationProps } from "../pagination/types.js";
import type { BulkActionsProps } from "../bulk-actions/types.js";
import type { ResourceListSelectedItems, SvelteNode } from "$utilities/types.js";
import type { SelectOption } from "../select/types.js";

export const SMALL_SPINNER_HEIGHT = 28;
export const LARGE_SPINNER_HEIGHT = 45;

export interface ResourceListItemData {
    [data: string]: any;
}

export type ResourceListPaginationProps = Omit<PaginationProps, 'type'>;

export interface ResourceListProps<
    TItemType extends ResourceListItemData = ResourceListItemData,
> {
    /** Item data; each item is passed to renderItem */
    items: TItemType[];
    filterControl?: Snippet;
    /** Whether to remove all padding around the filter controls. Should be true if using Filters, and false if using LegacyFilters.  */
    flushFilters?: boolean;
    /** The markup to display when no resources exist yet. Renders when set and items is empty. */
    emptyState?: Snippet;
    /** The markup to display when no results are returned on search or filter of the list. Renders when `filterControl` is set, items are empty, and `emptyState` is not set.
     * @default EmptySearchResult
     */
    emptySearchState?: Snippet;
    /** Name of the resource, such as customers or products */
    resourceName?: {
        singular: string;
        plural: string;
    };
    /** Up to 2 bulk actions that will be given more prominence */
    promotedBulkActions?: BulkActionsProps['promotedActions'];
    /** Actions available on the currently selected items */
    bulkActions?: BulkActionsProps['actions'];
    /** Collection of IDs for the currently selected items */
    selectedItems?: ResourceListSelectedItems;
    /** Whether or not the list has filter(s) applied */
    isFiltered?: boolean;
    /** Renders a Select All button at the top of the list and checkboxes in front of each list item. For use when bulkActions aren't provided. **/
    selectable?: boolean;
    /** Whether or not there are more items than currently set on the items prop. Determines whether or not to set the paginatedSelectAllAction and paginatedSelectAllText props on the BulkActions component. */
    hasMoreItems?: boolean;
    /** Overlays item list with a spinner while a background action is being performed */
    loading?: boolean;
    /** Boolean to show or hide the header */
    showHeader?: boolean;
    /** Total number of resources */
    totalItemsCount?: number;
    /** Current value of the sort control */
    sortValue?: string;
    /** Collection of sort options to choose from */
    sortOptions?: SelectOption[];
    /** ReactNode to display instead of the sort control */
    alternateTool?: SvelteNode;
    /** Custom header text displayed above the list instead of the resource count. */
    headerContent?: string;
    /** Callback when sort option is changed */
    onSortChange?(selected: string, id: string): void;
    /** Callback when selection is changed */
    onSelectionChange?(selectedItems: ResourceListSelectedItems): void;
    /** Function to render each list item, must return a ResourceItem component */
    renderItem: Snippet<[ResourceListItemData]>;
    /** Function to customize the unique ID for each item */
    idForItem?(item: TItemType, index: number): string;
    /** Function to resolve the ids of items */
    resolveItemId?(item: TItemType): string;
    /** Properties to enable pagination at the bottom of the list. */
    pagination?: ResourceListPaginationProps;
}