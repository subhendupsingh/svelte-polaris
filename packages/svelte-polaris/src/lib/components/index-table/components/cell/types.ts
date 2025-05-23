import type { Snippet } from "svelte";

export interface CellProps {
    /** The table cell element to render. Render the cell as a `th` if it serves as a subheading
     * @default 'td'
     */
    as?: 'th' | 'td';
    /** The unique ID to set on the cell element */
    id?: string;
    /** The cell contents */
    children?: Snippet;
    /** Custom class name to apply to the cell element */
    className?: string;
    /** Whether the cell padding should be removed
     * @default false
     */
    flush?: boolean;
    /** For subheader cells -- The number of the columns that the cell element should extend to */
    colSpan?: HTMLTableCellElement['colSpan'];
    /**  For subheader cells -- Indicates the cells that the `th` element relates to */
    scope?: "col" | "colgroup" | "row" | "rowgroup" | null | undefined;
    /** A space-separated list of the `th` cell IDs that describe or apply to it. Use for cells within a row that relate to a subheader cell in addition to their column header. */
    headers?: HTMLTableCellElement['headers'];
}