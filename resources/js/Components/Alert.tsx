import { useEffect, useState } from "react";

interface Props {
    text: string;
}

export default function Alert(props: Props) {
    const { text } = props;

    const [open, setOpen] = useState(true);

    useEffect(() => {
        const id = setTimeout(() => {
            setOpen(false);
        }, 3000);

        return () => {
            clearTimeout(id);
        };
    }, []);

    if (!open) return null;

    return (
        <div
            className={
                "mb-6 text-center alert alert-info transition-[height] overflow-hidden"
            }
        >
            <div className="alert-content">
                <p className="max-w-[90%] m-auto">
                    {text}
                    {/* Nuestro módulo de perfilamiento de clientes permite conocer
                    el perfil demográfico de los clientes, para ello es
                    necesario subir un listado de Documentos de Identidad (DNI),
                    con un formato prestablecido de un archivo. */}
                </p>
            </div>
            <div className="indicator"></div>
        </div>
    );
}
