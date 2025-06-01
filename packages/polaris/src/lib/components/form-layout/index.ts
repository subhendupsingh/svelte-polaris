import FormLayoutComponent from "./form-layout.svelte";
import FormLayoutGroupComponent from "./components/group/form-layout-group.svelte";
import FormLayoutItemComponent from "./components/item/form-layout-item.svelte";

type FormLayoutCompoundType = typeof FormLayoutComponent & {
    Group: typeof FormLayoutGroupComponent;
    Item: typeof FormLayoutItemComponent;
}

const FormLayout = FormLayoutComponent as FormLayoutCompoundType;
FormLayout.Group = FormLayoutGroupComponent;
FormLayout.Item = FormLayoutItemComponent;

export default FormLayout;