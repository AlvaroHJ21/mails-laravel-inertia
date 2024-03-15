import Button from "@/Components/Button";
import ButtonUpload from "@/Components/ButtonUpload";
import Editor from "./Editor";

import "./Editor.css";
import { useState } from "react";

export default function Form() {
    const [mailContent, setMailContent] = useState("");

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
                        <div
                            className="w-full h-full p-4 bg-white rounded-lg ck-content"
                            dangerouslySetInnerHTML={{ __html: mailContent }}
                        ></div>
                    </div>

                    <div className="absolute left-0 right-0 flex gap-2 m-auto w-fit bottom-8">
                        <Button>Exportar a HTML</Button>
                        <Button
                            onClick={() => {
                                navigator.clipboard.writeText(mailContent);
                                window.toast.success(
                                    "HTML copiado al portapapeles",
                                    {
                                        position: "bottom-center",
                                    }
                                );
                            }}
                            className="bottom-8"
                        >
                            Copiar HTML
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
