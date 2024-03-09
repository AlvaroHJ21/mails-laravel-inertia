import React, { useEffect, useRef, useState } from "react";

interface Props {
    value: string;
    className?: string;
    onClickOutside?(value: string): void;
    textArea?: boolean;
    placeholder?: string;
}

export default function TextEditable(props: Props) {
    const {
        value,
        onClickOutside,
        className,
        textArea = false,
        placeholder,
    } = props;

    const [editValue, setEditValue] = useState(false);
    const [editableValue, setEditableValue] = useState("");
    const textEditable = useRef<HTMLInputElement>(null);

    useEffect(() => {
        function handleClick(e: MouseEvent) {
            if (editValue && textEditable.current) {
                const target = e.target as HTMLElement;

                if (target.classList.contains("preview")) return;

                if (textEditable.current.contains(target)) return;

                setEditValue(false);
                onClickOutside?.(editableValue);
            }
        }

        document.addEventListener("mousedown", handleClick);
        return () => {
            document.removeEventListener("mousedown", handleClick);
        };
    }, [editValue, editableValue]);

    function handleActiveEditTitle() {
        setEditableValue(value);
        setEditValue(true);
    }

    const Input = textArea ? "textarea" : "input";

    return (
        <div ref={textEditable} className="text-sm">
            {editValue && (
                <Input
                    type="text"
                    value={editableValue}
                    onChange={(e) => setEditableValue(e.target.value)}
                    className={"px-2 py-1 w-full bg-transparent " + className}
                    autoFocus
                    placeholder={placeholder}
                />
            )}
            {!editValue && (
                <div
                    className="flex items-center gap-2 preview"
                    onClick={handleActiveEditTitle}
                >
                    <h2 className={"min-h-4 " + className}>
                        {value.length === 0 ? (
                            <span className="text-gray-500">{placeholder}</span>
                        ) : (
                            value
                        )}
                    </h2>
                    <i className="fa fa-edit text-amarillo"></i>
                </div>
            )}
        </div>
    );
}
