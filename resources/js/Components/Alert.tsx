import { Timer } from "@/Utils/timer";
import { useEffect, useRef, useState } from "react";

interface Props {
    text: string;
}

export default function Alert(props: Props) {
    const { text } = props;

    const [open, setOpen] = useState(true);

    const timeoutRef = useRef<NodeJS.Timeout>();

    const timerRef = useRef<Timer>();

    useEffect(() => {
        timerRef.current = new Timer(() => {
            setOpen(false);
        }, 3000);
        // timeoutRef.current = setTimeout(() => {
        //     setOpen(false);
        // }, 3000);

        return () => {
            // clearTimeout(timeoutRef.current);
            timerRef.current?.pause();
        };
    }, []);

    if (!open) return null;

    function handleStop() {
        // clearTimeout(timeoutRef.current);
        timerRef.current?.pause();
    }
    function handleReanude() {
        timerRef.current?.resume();
        // timeoutRef.current = setTimeout(() => {
        //     setOpen(false);
        // }, 1000);
    }

    return (
        <div
            onMouseEnter={handleStop}
            onMouseLeave={handleReanude}
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
