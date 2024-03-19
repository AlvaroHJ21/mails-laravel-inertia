import { useContext } from "react";
import Editor from "@/Components/Editor";
import { FormContext } from "./Form";

export default function FormPartialWhatsApp() {
    const { values, handleChange } = useContext(FormContext);

    return (
        <div className="grid grid-cols-2 mb-2 gap-y-4 gap-x-4">
            <label className="field">
                <span className="label">Número de envío</span>
                <div className="input-group">
                    <span className="input-group-icon">
                        <i className="fa fa-phone"></i>
                    </span>
                    <select
                        className="input"
                        name="email_send"
                        value={values.whatsapp_phone_send}
                        onChange={(e) =>
                            handleChange({
                                whatsapp_phone_send: e.target.value,
                            })
                        }
                    >
                        <option value="">Seleccionar número</option>
                        <option value="+51 123 456 789">+51 123 456 789</option>
                        <option value="+51 987 654 321">+51 987 654 321</option>
                    </select>
                </div>
            </label>

            <div className="col-span-2">
                <Editor
                    value={values.whatsapp_content}
                    onChange={(content) =>
                        handleChange({ whatsapp_content: content })
                    }
                    isSmall
                />
            </div>
        </div>
    );
}
