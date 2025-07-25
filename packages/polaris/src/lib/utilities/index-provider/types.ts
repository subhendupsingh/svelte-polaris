import type { Snippet } from "svelte";
import type { Range } from "../../use/use-index-resource-state.svelte.js";

export type IndexSelectedItems = string[] | 'All';

export const SELECT_ALL_ITEMS = 'All';

export enum SelectionType {
    All = 'all',
    Page = 'page',
    Multi = 'multi',
    Single = 'single',
    Range = 'range',
}

export interface IndexProviderProps {
    children?: Snippet;
    selectable?: boolean;
    itemCount: number;
    selectedItemsCount?: typeof SELECT_ALL_ITEMS | number;
    resourceName?: {
        singular: string;
        plural: string;
    };
    loading?: boolean;
    hasMoreItems?: boolean;
    condensed?: boolean;
    onSelectionChange?(
        selectionType: SelectionType,
        toggleType: boolean,
        selection?: string | Range,
        position?: number,
    ): void;
    paginatedSelectAllText?: string;
}

export type HandleSelectionChange = (
    selectionType: SelectionType,
    toggleType: boolean,
    selection?: string | Range,
    sortOrder?: number,
) => void;

export interface BulkSelectionDataOptions {
    selectedItemsCount: number | typeof SELECT_ALL_ITEMS;
    itemCount: number;
    hasMoreItems?: boolean;
    resourceName?: {
        singular: string;
        plural: string;
    };
    defaultPaginatedSelectAllText?: string;
}

export interface HandleBulkSelectionOptions {
    onSelectionChange?(
        selectionType: SelectionType,
        toggleType: boolean,
        selection?: string | Range,
    ): void;
}