import TextEditable from "@/Components/TextEditable";
import { Perfil } from "@/types/Perfil";
import { router } from "@inertiajs/react";
import { useState } from "react";

interface Props {
    perfil: Perfil;
}

export default function FormView(props: Props) {
    const { perfil } = props;

    const [nombre, setNombre] = useState(perfil.nombre);

    function handleUpdateName(nombre: string) {
        router.put(route("perfiles.update", { perfil }), {
            nombre,
        });
    }

    return (
        <div>
            <div className="flex items-center justify-center gap-2 p-4 text-white bg-azul-marino">
                <TextEditable
                    value={nombre}
                    onClickOutside={(value) => {
                        setNombre(value);
                        if (nombre !== value) handleUpdateName(value);
                    }}
                />
            </div>
            <img src="/dashboard.png" alt="" />
        </div>
    );
}
