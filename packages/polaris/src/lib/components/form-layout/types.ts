import type { Snippet } from "svelte";
import FormLayoutGroupComponent from "./components/group/form-layout-group.svelte";
import FormLayoutItemComponent from "./components/item/form-layout-item.svelte";
import FormLayoutComponent from "./form-layout.svelte";

export interface FormLayoutProps {
    /** The content to display inside the layout. */
    children?: Snippet;
}

export interface GroupProps {
    children?: Snippet;
    condensed?: boolean;
    title?: string;
    helpText?: string | Snippet;
}

export interface ItemProps {
    children?: Snippet;
    condensed?: boolean;
}

/* export const FormLayout = {
    Group: FormLayoutGroup,
    Item: FormLayoutItem
} */

type FormLayoutCompoundComponent = typeof FormLayoutComponent & {
    Group: typeof FormLayoutGroupComponent;
    Item: typeof FormLayoutItemComponent;
};

const FormLayout = FormLayoutComponent as FormLayoutCompoundComponent;
FormLayout.Group = FormLayoutGroupComponent;
FormLayout.Item = FormLayoutItemComponent;

export default FormLayout;