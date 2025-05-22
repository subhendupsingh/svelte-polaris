import { useContext } from "$utilities/contexts.js";
import { StickyManagerContextKey } from "./context.js";

export function useStickyManager() {
    const stickyManager = useContext(StickyManagerContextKey);

    if (!stickyManager) {
        throw new Error('No StickyManager was provided.');
    }

    return stickyManager;
}