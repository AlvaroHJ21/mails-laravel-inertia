import React, { useState } from "react";

interface Props {
    children: React.ReactNode;
    text: string;
    subtext?: string;
    direction?: "right" | "left";
}

export default function Tooltip(props: Props) {
    const { children, text, subtext, direction = "right" } = props;
    const [show, setShow] = useState(false);

    return (
        <div
            className="relative inline-block"
            onMouseOver={() => setShow(true)}
            onMouseLeave={() => setShow(false)}
        >
            {children}
            {show && (
                <div
                    className={
                        "absolute z-10 p-2 text-sm bg-white rounded-md shadow-sm bottom-full  text-azul-marino min-w-40 " +
                        (direction === "right" ? "left-full" : "right-full")
                    }
                >
                    {text}
                    {subtext && (
                        <div className="mt-1 text-xs text-gray-700 whitespace-nowrap">
                            {subtext}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
