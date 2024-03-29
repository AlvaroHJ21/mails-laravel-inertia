import { FilterGroup } from "@/Interfaces/Filter";

export interface Segmento {
    id: number;
    nombre: string;
    user_id: string;
    created_at: string;
    updated_at: string;
    filtros: FilterGroup[];
    personas: SegmentoPersona[];
}

export interface SegmentoPersona {
    id: number;
    documento: string;
    fh_nacimiento: string;
    sexo: string;
    estado_civil: string;
    ubigeo: string;
    departamento: string;
    provincia: string;
    distrito: string;

    edad_grupo: string;
    generacion: string;

    correo: string;
    var1: string;
    var2: string;
    var3: string;
    segmento_id: string;
    created_at: string;
    updated_at: string;
}
