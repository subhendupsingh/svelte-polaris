import ListComponent from "./list.svelte";
import ItemComponent from "./components/item/item.svelte";

type ListComponentCompundType = typeof ListComponent & {
	Item: typeof ItemComponent;
};

const List = ListComponent as ListComponentCompundType;
List.Item = ItemComponent;

export default List;