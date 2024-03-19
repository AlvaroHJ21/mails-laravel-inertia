import { useContext } from "react";
import { FormContext } from "./Form";

export default function FormSendMedium() {
    const { values, handleChange } = useContext(FormContext);
    const value = values.send_medium;
    const setValue = (value: number) => handleChange({ send_medium: value });
    return (
        <>
            <label className="font-bold text-azul-marino">Medio de envío</label>
            <div className="flex items-center gap-4 px-1 mb-4">
                <label>
                    <input
                        type="radio"
                        name="medio_envio"
                        value={0}
                        checked={value === 0}
                        onChange={(e) => setValue(+e.target.value)}
                    />
                    <span className="ml-2">Correo electrónico</span>
                </label>
                <label>
                    <input
                        type="radio"
                        name="medio_envio"
                        value={1}
                        checked={value === 1}
                        onChange={(e) => setValue(+e.target.value)}
                    />
                    <span className="ml-2">Whatsapp</span>
                </label>
                <label>
                    <input
                        type="radio"
                        name="medio_envio"
                        value={2}
                        checked={value === 2}
                        onChange={(e) => setValue(+e.target.value)}
                    />
                    <span className="ml-2">SMS</span>
                </label>
            </div>
        </>
    );
}
