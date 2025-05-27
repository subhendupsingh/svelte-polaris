import type { TabProps } from "../../types.js";

export interface ListProps {
    focusIndex: number;
    disclosureTabs: TabProps[];
    onClick?(id: string): void;
    onKeyPress?(event: KeyboardEvent): void;
}