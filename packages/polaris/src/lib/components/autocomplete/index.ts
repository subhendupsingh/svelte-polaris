import Combobox from "../combobox/index.js";
import AutocompleteComponent from "./autocomplete.svelte";

type AutoCompleteCompoundComponent = typeof AutocompleteComponent & {
    TextField: typeof Combobox.TextField;
};

const AutoComplete = AutocompleteComponent as AutoCompleteCompoundComponent;
AutoComplete.TextField = Combobox.TextField;

export default AutoComplete;