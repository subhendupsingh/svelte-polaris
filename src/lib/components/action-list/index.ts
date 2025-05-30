import ActionListComponent from "./action-list.svelte";
import ActionListItemComponent from "./components/action-list-item/action-list-item.svelte";
import ActionListSectionComponent from "./components/action-list-section/action-list-section.svelte";

type ActionListCompoundType = typeof ActionListComponent & {
	Item: typeof ActionListItemComponent;
	Section: typeof ActionListSectionComponent;
};

const ActionList = ActionListComponent as ActionListCompoundType;

ActionList.Item = ActionListItemComponent;
ActionList.Section = ActionListSectionComponent;

export default ActionList;

