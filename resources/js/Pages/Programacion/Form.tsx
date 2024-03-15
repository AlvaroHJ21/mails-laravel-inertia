import Button from "@/Components/Button";
import ButtonUpload from "@/Components/ButtonUpload";
import Editor from "./Editor";

import "./Editor.css";
import { useState } from "react";
import { htmlTransformInlineCss } from "@/Utils/htmlTransformInlineCss";
import useData from "@/Hooks/useData";

export default function Form() {
    const [mailContent, setMailContent] = useState("");

    const { values, handleChange } = useData({ subject: "" });

    async function copyHtml() {
        const resp = await htmlTransformInlineCss(mailContent);

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
                                    name="username"
                                    className="input"
                                    placeholder="Nombre"
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
                                <select className="input">
                                    <option value="">Seleccionar correo</option>
                                    <option value="">correo1@email.com</option>
                                    <option value="">correo2@email.com</option>
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
                                    name="username"
                                    className="input"
                                    placeholder="Nombre"
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
                                <select className="input">
                                    <option value="">Correo electrónico</option>
                                    <option value="">Whatsapp</option>
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
                                    name="username"
                                    className="input"
                                    placeholder="https://..."
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
                                    name="username"
                                    className="input"
                                    placeholder="Escribe el asunto..."
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
                                value={mailContent}
                                onChange={setMailContent}
                            />
                        </div>
                    </div>

                    <Button>Guardar campaña</Button>
                </div>

                {/* Preview */}
                <div className="relative flex-1 overflow-y-auto rounded-lg shadow-lg">
                    <div className="h-full p-4 bg-gray-200">
                        <div className="h-full p-4 overflow-y-auto bg-white rounded-lg">
                            <h2 className="mb-2 text-3xl font-bold">{values.subject}</h2>
                            <div
                                className="ck-content"
                                dangerouslySetInnerHTML={{
                                    __html: mailContent,
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
