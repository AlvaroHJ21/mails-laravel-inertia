export interface Campania {
    id: number;
    nombre: string;
    fecha_envio: string;
    medio_envio: number;
    correo_envio: string | null;
    correo_asunto: string | null;
    correo_contenido: string | null;
    whatsapp_envio: string | null;
    whatsapp_contenido: string | null;
    sms_telefono_envio: string | null;
    sms_contenido: string | null;

    enviado: number;
    codigo_envio: string;
    n_registros: number;
    n_validados: number;
    n_abiertos: number;

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
