import { SegmentoPersona } from "../types/Segmento";

export interface Filter {
    attr: keyof SegmentoPersona;
    text: string;
    options: {
        text: string;
        value: string;
        active: boolean;
    }[];
}

export interface SelectedFilter {
    name: keyof SegmentoPersona;
    options: {
        text: string;
        value: string | number;
    }[];
    count: number;
}
