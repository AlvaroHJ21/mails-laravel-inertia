export interface Perfil {
    id: number;
    nombre: string;
    user_id: string;
    created_at: string;
    updated_at: string;
    personas: PerfilPersona[];
}

export interface PerfilPersona {
    id: number;
    dni: string;
    nombre: string;
    apellido: string;
    fecha_nacimiento: string;
    correo: string;
    var1: string;
    var2: string;
    var3: string;
    perfil_id: string;
    created_at: string;
    updated_at: string;
}
