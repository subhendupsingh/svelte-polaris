import { useContext } from "$utilities/contexts.js";
import { SECTION_CONTEXT_KEY } from "./types.js";

export function useSection() {
    const context = useContext<string|null>(SECTION_CONTEXT_KEY);
    return context;
}