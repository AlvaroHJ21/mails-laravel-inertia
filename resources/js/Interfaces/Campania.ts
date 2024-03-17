export interface Campania {
    id: number;
    nombre: string;
    correo_envio: string;
    fecha_envio: string;
    medio_envio: number;
    link: string;
    asunto: string;
    contenido: string;
    personas: CampaniaPersona[];
    created_at: string;
    updated_at: string;
}

export interface CampaniaPersona {
    id: number;
    documento: string;
    correo: string;
    campania_id: number;
}
