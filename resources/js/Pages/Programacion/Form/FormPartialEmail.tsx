import { useContext, useState } from "react";

import { FormContext } from "./Form";
import Editor from "@/Components/Editor";
import ButtonUpload from "@/Components/ButtonUpload";

interface Props {
    attachmentFiles: FileList | undefined;
    setAttachmentFiles: (files: FileList) => void;
}

export default function FormPartialEmail(props: Props) {
    const { attachmentFiles, setAttachmentFiles } = props;

    const { values, handleChange } = useContext(FormContext);

    return (
        <div className="grid grid-cols-2 mb-2 gap-y-4 gap-x-4">
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

            <label className="field">
                <span className="label">Archivo Adjunto</span>
                <ButtonUpload
                    text="Cargar archivo adjunto"
                    files={attachmentFiles}
                    setFiles={setAttachmentFiles}
                    multiple
                />
            </label>
        </div>
    );
}
