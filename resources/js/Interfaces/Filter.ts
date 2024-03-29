import { SegmentoPersona } from "./Segmento";

export interface Filter {
    id: string | number;
    text: string;
    value: string;
}

export interface FilterGroup {
    attr: keyof SegmentoPersona;
    text: string;
    filters: Filter[];
    table?: boolean;
}
