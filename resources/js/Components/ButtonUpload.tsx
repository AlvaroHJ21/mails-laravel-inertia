import React, { useState } from "react";

interface Props {
    text?: string;
    file: File | undefined;
    setFile: (file: File) => void;
}

export default function ButtonUpload(props: Props) {
    const { text, setFile } = props;

    const [fileName, setFileName] = useState("");

    function handleInputFileChange(event: React.ChangeEvent<HTMLInputElement>) {
        const input = event.target;
        const file = input.files?.[0];

        if (file) {
            setFileName(file.name);
            setFile(file);
        }
    }

    return (
        <div className="relative">
            <label className="w-full font-bold btn btn-secondary">
                {text ?? "Subir archivo"}
                <input
                    id="file"
                    type="file"
                    className=""
                    name="perfilamiento"
                    hidden
                    onChange={handleInputFileChange}
                />
            </label>
            <div className="absolute left-0 right-0 m-auto -mt-2 w-fit">
                <label className="text-xs italic text-nowrap">{fileName}</label>
            </div>
        </div>
    );
}
