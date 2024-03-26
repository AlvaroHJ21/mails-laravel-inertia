import { useContext } from "react";

import { FormContext } from "./Form";
import Editor from "@/Components/Editor";

export default function FormPartialEmail() {
    const { values, handleChange } = useContext(FormContext);

    return (
        <div className="flex flex-col gap-2 mb-2">
            <div className="grid grid-cols-2 gap-4">
                <label className="field">
                    <span className="label">Correo de envío</span>
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
                            <option value="fpinedot1953@intico.com.pe">
                                fpinedot1953@intico.com.pe
                            </option>
                            <option value="correo2@email.com">
                                correo2@email.com
                            </option>
                        </select>
                    </div>
                </label>

                <label className="field">
                    <span className="label">Subject</span>
                    <div className="input-group">
                        <span className="input-group-icon">
                            <i className="fa fa-paperclip"></i>
                        </span>
                        <input
                            type="text"
                            className="input"
                            placeholder="Escribe el asunto..."
                            name="subject"
                            value={values.email_subject}
                            onChange={(e) =>
                                handleChange({
                                    email_subject: e.target.value,
                                })
                            }
                        />
                    </div>
                </label>

                <div className="col-span-2">
                    <Editor
                        value={values.email_content}
                        onChange={(content) =>
                            handleChange({ email_content: content })
                        }
                    />
                </div>
            </div>

            {/* <div className="grid grid-cols-2">
                <label className="mb-2 field">
                    <span className="label">Archivos Adjuntos</span>
                    <ButtonUpload
                        text={
                            campania?.archivos_adjuntos &&
                            campania.archivos_adjuntos?.length > 0
                                ? `Reemplazar adjuntos`
                                : "Cargar archivo adjunto"
                        }
                        files={attachedFiles}
                        setFiles={setAttachedFiles}
                        multiple
                    />
                </label>
            </div> */}
        </div>
    );
}
