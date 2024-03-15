import { useEffect } from "react";
import { router } from "@inertiajs/react";

import useData from "@/Hooks/useData";
import Button from "@/Components/Button";
import ButtonUpload from "@/Components/ButtonUpload";
import { htmlTransformInlineCss } from "@/Utils/htmlTransformInlineCss";
import Editor from "./Editor";
import { Campania } from "@/Interfaces/Campania";

import "./Editor.css";

interface Props {
    campania?: Campania;
    onClose?: () => void;
}

export default function Form(props: Props) {
    const { campania, onClose } = props;

    const { values, handleChange } = useData({
        name: "",
        email_send: "",
        send_date: "",
        send_medium: 0,
        link: "",
        subject: "",
        content: "",
    });

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
            router.put(
                route("campanias.update", { campania: campania.id }),
                {
                    nombre: values.name,
                    correo_envio: values.email_send,
                    fecha_envio: values.send_date,
                    medio_envio: values.send_medium,
                    link: values.link,
                    asunto: values.subject,
                    contenido: values.content,
                },
                {
                    onError: (errors) => {
                        console.log(errors);
                        window.toast.error("Error al actualizar la campaña");
                    },
                    onSuccess: () => {
                        window.toast.success("Campaña actualizada");
                        onClose && onClose();
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
                },
                {
                    onError: (errors) => {
                        console.log(errors);
                        window.toast.error("Error al guardar la campaña");
                    },
                    onSuccess: () => {
                        window.toast.success("Campaña creada");
                        onClose && onClose();
                    },
                }
            );
        }
    }

    return (
        <div className="h-screen p-12">
            <div className="flex h-full gap-8">
                {/* Form */}
                <div className="flex-1 overflow-y-auto">
                    <div className="grid grid-cols-2 mb-4 gap-y-4 gap-x-8">
                        {/* Nombre de la campaña */}
                        <label className="field">
                            <span className="text-lg label">
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
                            <span className="text-lg label">
                                Correo de envío
                            </span>
                            <div className="input-group">
                                <span className="input-group-icon">
                                    <i className="fa fa-envelope"></i>
                                </span>
                                <select
                                    className="input"
                                    name="email_send"
                                    value={values.email_send}
                                    onChange={(e) =>
                                        handleChange({
                                            email_send: e.target.value,
                                        })
                                    }
                                >
                                    <option value="">Seleccionar correo</option>
                                    <option value="correo1@email.com">
                                        correo1@email.com
                                    </option>
                                    <option value="correo1@email.com">
                                        correo2@email.com
                                    </option>
                                </select>
                            </div>
                        </label>
                        <label className="field">
                            <span className="text-lg label">
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
                            <span className="text-lg label">
                                Listado de datos
                            </span>
                            <ButtonUpload text="Cargar archivo..." />
                        </label>

                        <label className="field">
                            <span className="text-lg label">
                                Medio de envío
                            </span>
                            <div className="input-group">
                                <span className="input-group-icon">
                                    <i className="fa fa-paper-plane"></i>
                                </span>
                                <select
                                    className="input"
                                    name="send_medium"
                                    value={values.send_medium}
                                    onChange={(e) =>
                                        handleChange({
                                            send_medium: +e.target.value,
                                        })
                                    }
                                >
                                    <option value="0">
                                        Correo electrónico
                                    </option>
                                    <option value="1">Whatsapp</option>
                                </select>
                            </div>
                        </label>
                        <label className="field">
                            <span className="text-lg label">Link</span>
                            <div className="input-group">
                                <span className="input-group-icon">
                                    <i className="fa fa-link"></i>
                                </span>
                                <input
                                    type="text"
                                    className="input"
                                    placeholder="https://..."
                                    name="link"
                                    value={values.link}
                                    onChange={(e) =>
                                        handleChange({
                                            link: e.target.value,
                                        })
                                    }
                                />
                            </div>
                        </label>
                        <label className="field">
                            <span className="text-lg label">Subject</span>
                            <div className="input-group">
                                <span className="input-group-icon">
                                    <i className="fa fa-paperclip"></i>
                                </span>
                                <input
                                    type="text"
                                    className="input"
                                    placeholder="Escribe el asunto..."
                                    name="subject"
                                    value={values.subject}
                                    onChange={(e) =>
                                        handleChange({
                                            subject: e.target.value,
                                        })
                                    }
                                />
                            </div>
                        </label>

                        <div className="grid col-span-2 place-content-center">
                            <Editor
                                value={values.content}
                                onChange={(content) =>
                                    handleChange({ content })
                                }
                            />
                        </div>
                    </div>

                    <Button onClick={handleSave}>Guardar campaña</Button>
                </div>

                {/* Preview */}
                <div className="relative flex-1 overflow-y-auto rounded-lg shadow-lg">
                    <div className="h-full p-4 bg-gray-200">
                        <div className="h-full p-4 overflow-y-auto bg-white rounded-lg">
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
