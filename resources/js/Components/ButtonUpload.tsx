import React, { useState } from "react";

interface Props {
    text?: string;

    file?: File | undefined;
    setFile?: (file: File) => void;

    multiple?: boolean;

    files?: FileList | undefined;
    setFiles?: (files: FileList) => void;
}

export default function ButtonUpload(props: Props) {
    const { text, setFile, setFiles, multiple = false } = props;

    const [fileNames, setFileNames] = useState<string[]>([]);

    function handleInputFileChange(event: React.ChangeEvent<HTMLInputElement>) {
        const input = event.target;

        const fileList = input.files;

        if (fileList) {
            setFiles?.(fileList);
            setFileNames(Array.from(fileList).map((file) => file.name));
        }

        const file = input.files?.[0];
        if (file) {
            setFile?.(file);
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
                    multiple={multiple}
                />
            </label>
            <div className="absolute left-0 right-0 flex gap-2 m-auto w-fit">
                {fileNames.map((name, idx) => (
                    <label key={idx} className="text-xs italic text-nowrap">
                        {name}
                    </label>
                ))}
            </div>
        </div>
    );
}
