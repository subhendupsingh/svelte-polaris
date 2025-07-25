import { SelectionType, type HandleBulkSelectionOptions, type HandleSelectionChange } from "$utilities/index-provider/types.js";
import type { Range } from "./use-index-resource-state.svelte.js";

export class HandleBulkSelection {
    private readonly onSelectionChange: HandleSelectionChange;
    lastSelected = $state<number | null>(null);

    constructor(options: HandleBulkSelectionOptions) {
        if (!options || typeof options.onSelectionChange !== 'function') {
            throw new Error("BulkSelectionHandler: 'onSelectionChange' callback option is required and must be a function.");
        }
        this.onSelectionChange = options.onSelectionChange;
    }


    public handleSelectionChange =(selectionType: SelectionType, toggleType: boolean, selection?: string | Range, sortOrder?: number): void => {
        const prevSelected = this.lastSelected;
        
        if (selectionType === SelectionType.Multi && typeof sortOrder === 'number') {
            this.lastSelected = sortOrder;
        }

        if (
            selectionType === SelectionType.Single ||
            (selectionType === SelectionType.Multi &&
                (typeof prevSelected !== 'number' || typeof sortOrder !== 'number'))
        ) {
            this.onSelectionChange(SelectionType.Single, toggleType, selection);
        } else if (selectionType === SelectionType.Multi) {
            const min = Math.min(prevSelected as number, sortOrder as number);
            const max = Math.max(prevSelected as number, sortOrder as number);
            this.onSelectionChange(selectionType, toggleType, [min, max]);
        } else if (
            selectionType === SelectionType.Page ||
            selectionType === SelectionType.All
        ) {
            this.onSelectionChange(selectionType, toggleType);
        } else if (selectionType === SelectionType.Range) {
            this.onSelectionChange(SelectionType.Range, toggleType, selection);
        }
    }
}