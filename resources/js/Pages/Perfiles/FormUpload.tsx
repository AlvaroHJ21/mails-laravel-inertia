import { useState } from "react";
import { router } from "@inertiajs/react";

import excelSvg from "@/svg/excel.svg";
import Button from "@/Components/Button";

interface Props {
    onSended?: () => void;
}

export default function FormUpload(props: Props) {
    const { onSended } = props;

    const [isSending, setIsSending] = useState(false);

    const [fileName, setFileName] = useState("");

    function handleInputFileChange(event: React.ChangeEvent<HTMLInputElement>) {
        const input = event.target;
        const file = input.files?.[0];

        if (file) {
            setFileName(file.name);
        }
    }

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const form = event.currentTarget;
        const formData = new FormData(form);

        router.post(route("perfiles.generate"), formData, {
            onStart() {
                setIsSending(true);
            },
            onSuccess() {
                onSended?.();
                window.toast.success("Perfil generado correctamente");
            },
            onError(errors) {
                window.toast.error(errors[0]);
            },
            onFinish() {
                setIsSending(false);
            },
        });
    }

    return (
        <div className="flex flex-col items-center py-10 text-azul-marino">
            <h1 className="font-bold title">Sube tu información</h1>

            <p className="m-auto mb-3 text-center max-w-80">
                Descarga nuestro formato establecido para colocar tu
                información.
            </p>
            <a
                href={route("perfiles.downloadTemplate")}
                className="mb-4 font-bold btn btn-secondary"
            >
                Descargar formato
                <img src={excelSvg} alt="icono de excel" width={24} />
            </a>

            <form id="form-create" onSubmit={handleSubmit}>
                <div className="flex flex-col items-center">
                    <p className="m-auto mb-3 text-center max-w-60">
                        Sube tu archivo para poder generar el perfil.
                    </p>
                    <div className="relative mb-4">
                        <label className="font-bold btn btn-secondary">
                            Subir archivo
                            <input
                                id="file"
                                type="file"
                                className="input"
                                name="perfilamiento"
                                hidden
                                onChange={handleInputFileChange}
                            />
                        </label>
                        <span className="absolute left-0 text-xs italic">
                            {fileName}
                        </span>
                    </div>

                    <label className="text-center field">
                        Nombre (opcional)
                        <input type="text" name="nombre" className="input" />
                    </label>

                    <Button disabled={fileName == ""} isLoading={isSending}>
                        Generar perfil
                    </Button>
                </div>
            </form>
        </div>
    );
}
