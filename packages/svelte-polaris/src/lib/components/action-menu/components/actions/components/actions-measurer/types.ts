import type { MenuActionDescriptor, MenuGroupDescriptor } from "$utilities/types.js";

export interface ActionsMeasurements {
    containerWidth: number;
    disclosureWidth: number;
    hiddenActionsWidths: number[];
}

export interface ActionsMeasurerProps {
    /** Collection of page-level secondary actions */
    actions?: MenuActionDescriptor[];
    /** Collection of page-level action groups */
    groups?: MenuGroupDescriptor[];
    handleMeasurement(measurements: ActionsMeasurements): void;
}

export const ACTION_SPACING = 8;