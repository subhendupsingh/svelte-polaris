import type { BulkActionsProps } from "../../types.js";

export interface ActionsMeasurements {
    containerWidth: number;
    disclosureWidth: number;
    hiddenActionsWidths: number[];
}

export interface ActionsMeasurerProps {
    /** Collection of page-level action groups */
    promotedActions?: BulkActionsProps['promotedActions'];
    disabled?: BulkActionsProps['disabled'];
    buttonSize?: BulkActionsProps['buttonSize'];
    handleMeasurement(measurements: ActionsMeasurements): void;
}

export const ACTION_SPACING = 4;