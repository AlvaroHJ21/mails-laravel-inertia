import { useState, PropsWithChildren, ReactNode } from "react";
import ApplicationLogo from "@/Components/ApplicationLogo";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import { Link } from "@inertiajs/react";
import { User } from "@/types";
import Sidebar from "@/Components/Sidebar";
import Navbar from "@/Components/Navbar";

export default function Authenticated({
    user,
    children,
}: PropsWithChildren<{ user: User; header?: ReactNode }>) {
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
                    <main className="container py-4">{children}</main>
                </div>
            </div>
        </div>
    );
}