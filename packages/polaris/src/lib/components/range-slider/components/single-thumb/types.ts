import type { RangeSliderProps } from "../../types.js";

export interface SingleThumbProps extends RangeSliderProps {
    value: number;
    id: string;
    min: number;
    max: number;
    step: number;
}