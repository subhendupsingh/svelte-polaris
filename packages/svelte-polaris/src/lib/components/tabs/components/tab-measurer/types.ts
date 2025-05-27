import type { Snippet } from "svelte";
import type { TabMeasurements, TabProps } from "../../types.js";

export interface TabMeasurerProps {
    tabToFocus: number;
    siblingTabHasFocus: boolean;
    activator: Snippet;
    selected: number;
    tabs: Omit<TabProps, 'onToggleModal' | 'onTogglePopover'>[];
    handleMeasurement(measurements: TabMeasurements): void;
}