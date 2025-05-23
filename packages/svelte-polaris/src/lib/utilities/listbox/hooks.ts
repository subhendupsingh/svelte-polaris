import { useContext } from "$utilities/contexts.js";
import { LISTBOX_CONTEXT_KEY, type ListboxContextType } from "./types.js";

export function useListbox() {
    const listbox = useContext<ListboxContextType>(LISTBOX_CONTEXT_KEY);

    if (!listbox) {
        throw new Error(
            'No Listbox was provided. Listbox components must be wrapped in a Listbox',
        );
    }

    return listbox;
}