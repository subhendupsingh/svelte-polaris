import { useContext } from "$utilities/contexts.js";
import { COMBOBOX_LIST_BOX_CONTEXT_KEY, COMBOBOX_TEXT_FIELD_CONTEXT_KEY, type ComboboxListboxType, type ComboboxTextFieldType } from "./types.js";

export function useComboboxTextField(): ComboboxTextFieldType {
    const context = useContext<ComboboxTextFieldType>(COMBOBOX_TEXT_FIELD_CONTEXT_KEY);
    if (!context) {
        throw new Error(
            'No Combobox was provided. Your component must be wrapped in a <Combobox> component.',
        );
    }
    return context;
}

export function useComboboxListbox() {
    const context = useContext<ComboboxListboxType>(COMBOBOX_LIST_BOX_CONTEXT_KEY);
    return context;
}