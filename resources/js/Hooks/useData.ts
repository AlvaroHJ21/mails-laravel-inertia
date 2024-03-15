import { useState } from "react";

export default function useData<T>(initialData: T) {
    const [values, setValues] = useState<T>(initialData);

    function handleChange(data: Partial<T>) {
        setValues((prev) => ({
            ...prev,
            ...data,
        }));
    }

    return { values, handleChange };
}
