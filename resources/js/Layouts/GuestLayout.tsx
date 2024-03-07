import { PropsWithChildren } from "react";

export default function Guest({ children }: PropsWithChildren) {
    return (
        <div className="flex flex-col items-center min-h-screen pt-6 sm:justify-center sm:pt-0 bg-auth-gradient">
            <div className="relative w-full px-6 pt-12 pb-6 bg-white shadow-md sm:max-w-md sm:rounded-lg">
                {children}
            </div>
        </div>
    );
}
