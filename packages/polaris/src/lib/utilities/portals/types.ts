import type { PortalsContainerElement } from "$utilities/contexts.js";

export interface PortalsManager {
    container: PortalsContainerElement;
}

export const PORTALS_MANAGER_CONTEXT_KEY = 'PortalsManager';