import { useEffect, useState } from "react";
import { router } from "@inertiajs/react";

import useData from "@/Hooks/useData";
import Button from "@/Components/Button";
import ButtonUpload from "@/Components/ButtonUpload";
import { htmlTransformInlineCss } from "@/Utils/htmlTransformInlineCss";
import { Campania } from "@/Interfaces/Campania";

import "./Editor.css";
import FormPartialEmail from "./FormPartialEmail";
import FormSendMedium from "./FormSendMedium";

interface Props {
    campania?: Campania;
    onClose?: () => void;
}

export default function Form(props: Props) {
    const { campania, onClose } = props;

    const [isSaving, setIsSaving] = useState(false);

    const { values, handleChange } = useData({
        name: "",
        email_send: "",
        send_date: "",
        send_medium: 0,
        link: "",
        subject: "",
        content: "",
    });

    const [personsFile, setPersonsFile] = useState<File>();

    /*
     * Cargar datos de la campaña
     */
    useEffect(() => {
        if (campania) {
            handleChange({
                name: campania.nombre,
                email_send: campania.correo_envio,
                send_date: campania.fecha_envio,
                send_medium: campania.medio_envio,
                link: campania.link,
                subject: campania.asunto,
                content: campania.contenido,
            });
        }

        return () => {};
    }, [campania]);

    /*
     * Generar HTML y copiar al portapapeles
     */
    async function copyHtml() {
        const resp = await htmlTransformInlineCss(values.content);

        if (resp.ok) {
            navigator.clipboard.writeText(resp.html);
            window.toast.success("HTML generado y copiado al portapapeles", {
                position: "bottom-center",
            });
        } else {
            window.toast.error("Error al generar el HTML", {
                position: "bottom-center",
            });
        }
    }

    /*
     * Crear o actualizar una campaña
     */
    async function handleSave() {
        if (campania) {
            // Update
            router.post(
                route("campanias.update", { campania: campania.id }),
                {
                    _method: "put",
                    nombre: values.name,
                    correo_envio: values.email_send,
                    fecha_envio: values.send_date,
                    medio_envio: values.send_medium,
                    link: values.link,
                    asunto: values.subject,
                    contenido: values.content,
                    personas: personsFile,
                },
                {
                    onStart: () => {
                        setIsSaving(true);
                    },
                    onError: (errors) => {
                        console.log(errors);
                        window.toast.error("Error al actualizar la campaña");
                    },
                    onSuccess: () => {
                        window.toast.success("Campaña actualizada");
                        onClose && onClose();
                    },
                    onFinish: () => {
                        setIsSaving(false);
                    },
                }
            );
        } else {
            // Create
            router.post(
                route("campanias.store"),
                {
                    nombre: values.name,
                    correo_envio: values.email_send,
                    fecha_envio: values.send_date,
                    medio_envio: values.send_medium,
                    link: values.link,
                    asunto: values.subject,
                    contenido: values.content,
                    personas: personsFile,
                },
                {
                    onStart: () => {
                        setIsSaving(true);
                    },
                    onError: (errors) => {
                        console.log(errors);
                        window.toast.error("Error al guardar la campaña");
                    },
                    onSuccess: () => {
                        window.toast.success("Campaña creada");
                        onClose && onClose();
                    },
                    onFinish: () => {
                        setIsSaving(false);
                    },
                }
            );
        }
    }

    return (
        <div className="h-screen p-8">
            <div className="flex h-full gap-8">
                <div className="flex flex-col flex-1 overflow-y-auto">

                    <div className="grid grid-cols-2 mb-2 gap-y-2 gap-x-4">
                        <label className="field">
                            <span className="label">
                                Nombre de la campaña
                            </span>
                            <div className="input-group">
                                <span className="input-group-icon">
                                    <i className="fa fa-user"></i>
                                </span>
                                <input
                                    type="text"
                                    className="input"
                                    placeholder="Nombre"
                                    name="name"
                                    value={values.name}
                                    onChange={(e) =>
                                        handleChange({
                                            name: e.target.value,
                                        })
                                    }
                                />
                            </div>
                        </label>

                        <label className="field">
                            <span className="label">
                                Fecha y hora del envío
                            </span>
                            <div className="input-group">
                                <span className="input-group-icon">
                                    <i className="fa fa-calendar"></i>
                                </span>
                                <input
                                    type="datetime-local"
                                    className="input"
                                    placeholder="Nombre"
                                    name="send_date"
                                    value={values.send_date}
                                    onChange={(e) =>
                                        handleChange({
                                            send_date: e.target.value,
                                        })
                                    }
                                />
                            </div>
                        </label>

                        <label className="field">
                            <span className="label">
                                Listado de datos
                            </span>
                            <ButtonUpload
                                text="Cargar archivo..."
                                file={personsFile}
                                setFile={setPersonsFile}
                            />
                        </label>
                    </div>

                    <FormSendMedium
                        value={values.send_medium}
                        setValue={(value) =>
                            handleChange({ send_medium: value })
                        }
                    />

                    <div className="flex-1">
                        {values.send_medium === 0 ? (
                            <FormPartialEmail
                                values={values}
                                handleChange={handleChange}
                            />
                        ) : values.send_medium === 1 ? (
                            <div>Whatssapp</div>
                        ) : (
                            <div>SMS</div>
                        )}
                    </div>

                    <Button onClick={handleSave} isLoading={isSaving}>
                        Guardar campaña
                    </Button>
                </div>

                <div className="relative flex-1 overflow-y-auto rounded-lg shadow-lg">
                    <div className="h-full p-4 bg-gray-200">
                        <div className="h-full p-4 pb-12 overflow-y-auto bg-white rounded-lg">
                            <h2 className="mb-2 text-3xl font-bold">
                                {values.subject}
                            </h2>
                            <div
                                className="ck-content"
                                dangerouslySetInnerHTML={{
                                    __html: values.content,
                                }}
                            ></div>
                        </div>
                    </div>

                    <div className="absolute left-0 right-0 flex gap-2 m-auto w-fit bottom-8">
                        <Button>Exportar a HTML</Button>
                        <Button onClick={copyHtml} className="bottom-8">
                            Genererar / Copiar HTML
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
