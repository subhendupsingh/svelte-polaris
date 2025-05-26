import { useContext } from "$utilities/contexts.js";
import { STICKY_MANAGER_CONTEXT_KEY } from "./context.js";
import type { StickyManager } from "./sticky-manager.js";

/* export function useStickyManager() {
    const stickyManager = useContext<StickyManager>(STICKY_MANAGER_CONTEXT_KEY);

    if (!stickyManager) {
        throw new Error('No StickyManager was provided.');
    }

    return stickyManager;
} */