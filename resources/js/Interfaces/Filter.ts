import { SegmentoPersona } from "../types/Segmento";

export interface Filter {
    attr: keyof SegmentoPersona;
    text: string;
    options: {
        text: string;
        value: string;
        active: boolean;
    }[];
    count: number;
}
