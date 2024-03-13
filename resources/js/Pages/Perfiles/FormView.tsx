import TextEditable from "@/Components/TextEditable";
import { Perfil } from "@/Interfaces/Perfil";
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
            <div className="m-auto border w-fit">
                <div>
                    <iframe
                        title="dashboard perfilamiento"
                        width="1350"
                        height="550"
                        src="https://app.powerbi.com/view?r=eyJrIjoiN2MxYjU0ZmItNTg2YS00M2FiLWEyYjUtNjE4NjkzZGMzMmMyIiwidCI6IjBmYjBkZjA5LTc0MGYtNDFmZS1hODNmLTVhOWVjZjcwMmRhYiIsImMiOjR9"
                        frameBorder="0"
                        allowFullScreen
                    ></iframe>
                </div>
            </div>
        </div>
    );
}
