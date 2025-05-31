import IndexTableComponent from './index-table.svelte';
import RowComponent from './components/row/row.svelte';
import CellComponent from './components/cell/cell.svelte';

type IndexTableCompoundType = typeof IndexTableComponent & {
	Row: typeof RowComponent;
	Cell: typeof CellComponent;
};

const IndexTable = IndexTableComponent as IndexTableCompoundType;
IndexTable.Row = RowComponent;
IndexTable.Cell = CellComponent;

export default IndexTable;