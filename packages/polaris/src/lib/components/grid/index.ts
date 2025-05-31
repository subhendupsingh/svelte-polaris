import GridComponent from "./grid.svelte";
import GridCellComponent from "./components/grid-cell/grid-cell.svelte";

type GridCompoundComponent = typeof GridComponent & {
    Cell: typeof GridCellComponent;
};

const Grid = GridComponent as GridCompoundComponent;
Grid.Cell = GridCellComponent;
export default Grid;