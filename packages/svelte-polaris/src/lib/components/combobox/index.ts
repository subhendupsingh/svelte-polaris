import ComboboxComponent from "./combobox.svelte";
import TextFieldComponent from "./components/text-field/text-field.svelte";

type ComboboxCompoundComponent = typeof ComboboxComponent & {
    TextField: typeof TextFieldComponent;
};

const Combobox = ComboboxComponent as ComboboxCompoundComponent;
Combobox.TextField = TextFieldComponent;

export default Combobox;