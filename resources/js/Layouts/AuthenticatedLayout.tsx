import { useState, ReactNode } from "react";
import { User } from "@/types";
import Sidebar from "@/Components/Sidebar";
import Navbar from "@/Components/Navbar";
import { Toaster } from "react-hot-toast";

type Props = {
    user: User;
    children: ReactNode;
};

export default function Authenticated(props: Props) {
    const { user, children } = props;

    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="flex">
                <Sidebar collapsed={sidebarCollapsed} />
                <div className="flex-1 h-screen overflow-y-auto bg-main-gradient">
                    <Navbar
                        user={user}
                        setSidebarCollapsed={setSidebarCollapsed}
                        sidebarCollapsed={sidebarCollapsed}
                    />
                    <main className="container py-8">{children}</main>
                </div>
            </div>

            <Toaster />
        </div>
    );
}
