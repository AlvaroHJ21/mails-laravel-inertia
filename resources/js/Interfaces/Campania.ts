export interface Campania {
    id: number;
    nombre: string;
    fecha_envio: string;
    medio_envio: number;
    correo_destino: string | null;
    correo_asunto: string | null;
    correo_contenido: string | null;
    whatsapp_destino: string | null;
    whatsapp_contenido: string | null;
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
