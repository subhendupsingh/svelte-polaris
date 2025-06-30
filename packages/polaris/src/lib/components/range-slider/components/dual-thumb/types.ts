import type { DualValue, RangeSliderProps } from "../../types.js";

export interface State {
    value: DualValue;
    trackWidth: number;
    trackLeft: number;
    prevValue?: DualValue;
}

export interface DualThumbProps extends RangeSliderProps {
    value: DualValue;
    id: string;
    min: number;
    max: number;
    step: number;
}

export interface KeyHandlers {
    [key: string]: () => void;
}

export enum Control {
    Lower,
    Upper,
}