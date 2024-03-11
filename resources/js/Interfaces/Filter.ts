import { SegmentoPersona } from "./Segmento";

export interface Filter {
    text: string;
    value: string;
}

export interface FilterGroup {
    attr: keyof SegmentoPersona;
    text: string;
    filters: Filter[];
    count: number;
}
