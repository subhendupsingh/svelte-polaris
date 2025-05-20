import ButtonGroupItemComponent from "./components/item/button-group-item.svelte";
import ButtonGroupComponent from "./button-group.svelte";

type ButtonGroupCompoundType = typeof ButtonGroupComponent & {
    Item: typeof ButtonGroupItemComponent;
};

const ButtonGroup = ButtonGroupComponent as ButtonGroupCompoundType;
ButtonGroup.Item = ButtonGroupItemComponent;

export default ButtonGroup;
