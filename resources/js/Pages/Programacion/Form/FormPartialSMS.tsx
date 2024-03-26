import { useContext } from "react";

import { FormContext } from "./Form";

export default function FormPartialSMS() {
    const { values, handleChange } = useContext(FormContext);

    const phones = [
        "+51 123 456 789",
        "+51 987 654 321",
        "+51 123 456 789",
        "+51 987 654 321",
    ];

    return (
        <div className="flex flex-col gap-2 mb-2">
            <div className="grid grid-cols-2 gap-4">
                <label className="field">
                    <span className="label">Número de envío</span>
                    <div className="input-group">
                        <span className="input-group-icon">
                            <i className="fa fa-phone"></i>
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
                            <option value="">Seleccionar teléfono</option>
                            {phones.map((phone, index) => (
                                <option key={index} value={phone}>
                                    {phone}
                                </option>
                            ))}
                        </select>
                    </div>
                </label>

                <div className="col-span-2">
                    <textarea
                        name=""
                        id=""
                        className="w-full bg-transparent border-gray-300 resize-none input"
                        rows={10}
                    ></textarea>
                </div>
            </div>
        </div>
    );
}
