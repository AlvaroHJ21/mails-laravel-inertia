import Button from "@/Components/Button";
import ButtonUpload from "@/Components/ButtonUpload";
import React from "react";

export default function Form() {
    return (
        <div className="h-screen p-12">
            <div className="flex h-full gap-8">
                {/* Form */}
                <div className="flex-1">
                    <div className="grid grid-cols-2 gap-8 mb-4">
                        {/* Nombre de la campaña */}
                        <label className="field">
                            <span className="text-xl label">
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
                            <span className="text-xl label">
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
                            <span className="text-xl label">
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
                            <span className="text-xl label">
                                Listado de datos
                            </span>
                            <ButtonUpload text="Cargar archivo..." />
                        </label>

                        <label className="field">
                            <span className="text-xl label">
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
                            <span className="text-xl label">Link</span>
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
                            <span className="text-xl label">Subject</span>
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

                        <div className="grid h-40 col-span-2 border place-content-center">
                            <span>Aquí va el editor god</span>
                        </div>
                    </div>

                    <Button>Guardar campaña</Button>
                </div>

                {/* Preview */}
                <div className="relative flex-1">
                    <div className="h-full p-4 bg-gray-200 rounded-lg">
                        <div className="w-full h-full bg-white rounded-lg">
                            Esta es la preview gozu
                        </div>
                    </div>

                    <Button className="absolute left-0 right-0 m-auto bottom-8">
                        Exportar a HTML
                    </Button>
                </div>
            </div>
        </div>
    );
}
