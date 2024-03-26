import { createContext, useEffect, useState } from "react";
import { router } from "@inertiajs/react";

import useData from "@/Hooks/useData";
import { htmlTransformInlineCss } from "@/Utils/htmlTransformInlineCss";
import ButtonUpload from "@/Components/ButtonUpload";
import Button from "@/Components/Button";
import FormSendMedium from "./FormSendMedium";
import FormPartialEmail from "./FormPartialEmail";
import FormPartialWhatsApp from "./FormPartialWhatsApp";
import { Campania } from "@/Interfaces/Campania";

import "@/../css/ckeditor.css";

interface FormDataContext {
    name: string;
    send_date: string;
    send_medium: number;
    email_send: string;
    email_subject: string;
    email_content: string;
    whatsapp_phone_send: string;
    whatsapp_content: string;
}

export const FormContext = createContext<{
    values: FormDataContext;
    handleChange: (data: Partial<FormDataContext>) => void;
    campania?: Campania;
}>({
    values: {
        name: "",
        email_send: "",
        send_date: "",
        send_medium: 0,
        email_subject: "",
        email_content: "",
        whatsapp_phone_send: "",
        whatsapp_content: "",
    },
    handleChange: () => {},
});

interface Props {
    campania?: Campania;
    onClose?: () => void;
}

export default function Form(props: Props) {
    const { campania, onClose } = props;
    const [isSaving, setIsSaving] = useState(false);

    /*
     * Archivo de datos
     */
    const [personsFile, setPersonsFile] = useState<File>();

    /*
     * Listado de archivos adjuntos
     */
    const [attachedFiles, setAttachedFiles] = useState<FileList>();

    /*
     * Hook para manejar los datos del formulario
     */
    const { values, handleChange } = useData<FormDataContext>({
        name: "",
        email_send: "",
        send_date: "",
        send_medium: 0,
        email_subject: "",
        email_content: "",
        whatsapp_phone_send: "",
        whatsapp_content: "",
    });

    const htmlContentPreview =
        values.send_medium == 0
            ? values.email_content
            : values.send_medium == 1
            ? values.whatsapp_content
            : "";

    /*
     * Cargar datos de la campaña
     */
    useEffect(() => {
        if (campania) {
            handleChange({
                name: campania.nombre,
                send_date: campania.fecha_envio,
                send_medium: campania.medio_envio,

                email_send: campania.correo_envio ?? "",
                email_subject: campania.correo_asunto ?? "",
                email_content: campania.correo_contenido ?? "",

                whatsapp_phone_send: campania.whatsapp_envio ?? "",
                whatsapp_content: campania.whatsapp_contenido ?? "",
            });
        }

        return () => {};
    }, [campania]);

    /*
     * Generar HTML y copiar al portapapeles
     */
    async function copyHtml() {
        const resp = await htmlTransformInlineCss(values.email_content ?? "");

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
        // Validar campos
        if (!values.name) {
            window.toast.error("El nombre de la campaña es obligatorio");
            return;
        }
        if (!values.send_date) {
            window.toast.error("La fecha de envío es obligatoria");
            return;
        }
        if (!campania && !personsFile) {
            window.toast.error("El archivo de datos es obligatorio");
            return;
        }
        if (values.send_medium === 0) {
            if (!values.email_send) {
                window.toast.error("El correo de destino es obligatorio");
                return;
            }
            if (!values.email_subject) {
                window.toast.error("El asunto del correo es obligatorio");
                return;
            }
            if (!values.email_content) {
                window.toast.error("El contenido del correo es obligatorio");
                return;
            }
        }
        if (values.send_medium === 1) {
            if (!values.whatsapp_phone_send) {
                window.toast.error("El teléfono de destino es obligatorio");
                return;
            }
            if (!values.whatsapp_content) {
                window.toast.error("El contenido de WhatsApp es obligatorio");
                return;
            }
        }

        if (campania) {
            // Update
            router.post(
                route("campanias.update", { campania: campania.id }),
                {
                    _method: "put",
                    nombre: values.name,
                    fecha_envio: values.send_date,
                    medio_envio: values.send_medium,
                    correo_envio: values.email_send,
                    correo_asunto: values.email_subject,
                    correo_contenido: values.email_content,
                    whatsapp_envio: values.whatsapp_phone_send,
                    whatsapp_contenido: values.whatsapp_content,
                    datos: personsFile,
                    archivos_adjuntos: Array.from(attachedFiles ?? []),
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
                    fecha_envio: values.send_date,
                    medio_envio: values.send_medium,
                    correo_envio: values.email_send,
                    correo_asunto: values.email_subject,
                    correo_contenido: values.email_content,
                    whatsapp_envio: values.whatsapp_phone_send,
                    whatsapp_contenido: values.whatsapp_content,
                    datos: personsFile,
                    archivos_adjuntos: Array.from(attachedFiles ?? []),
                },
                {
                    onStart: () => {
                        setIsSaving(true);
                    },
                    onError: (errors) => {
                        console.log(errors);
                        const error = errors[0];
                        window.toast.error(
                            error ?? "Error al guardar la campaña"
                        );
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
        <FormContext.Provider value={{ values, handleChange, campania }}>
            <div className="h-screen p-8">
                <div className="flex h-full gap-8">
                    <div className="flex flex-col flex-1 overflow-y-auto">
                        <div className="grid grid-cols-2 mb-4 gap-y-2 gap-x-4">
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
                                <span className="label">Listado de datos</span>
                                <ButtonUpload
                                    text={
                                        campania && campania.personas.length > 0
                                            ? "Reemplazar datos"
                                            : "Cargar archivo"
                                    }
                                    file={personsFile}
                                    setFile={setPersonsFile}
                                />
                            </label>
                        </div>

                        <FormSendMedium />

                        <div className="flex-1">
                            {values.send_medium === 0 ? (
                                <FormPartialEmail />
                            ) : values.send_medium === 1 ? (
                                <FormPartialWhatsApp />
                            ) : (
                                <div>🚧 En construcción</div>
                            )}
                        </div>

                        <Button onClick={handleSave} isLoading={isSaving}>
                            Guardar campaña
                        </Button>
                    </div>

                    <div className="relative flex-1 overflow-y-auto rounded-lg shadow-lg">
                        <div className="h-full p-4 bg-gray-200">
                            <div className="h-full p-4 pb-12 overflow-y-auto bg-white rounded-lg">
                                {values.send_medium == 0 && (
                                    <h2 className="mb-2 text-3xl font-bold">
                                        {values.email_subject}
                                    </h2>
                                )}
                                <div
                                    className="ck-content"
                                    dangerouslySetInnerHTML={{
                                        __html: htmlContentPreview,
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
        </FormContext.Provider>
    );
}
