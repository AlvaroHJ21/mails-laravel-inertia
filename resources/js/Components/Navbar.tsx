import Dropdown from "./Dropdown";
import { User } from "@/types";

interface Props {
    user: User;
    sidebarCollapsed: boolean;
    setSidebarCollapsed: (collapsed: boolean) => void;
}

export default function Navbar(props: Props) {
    const { user, sidebarCollapsed, setSidebarCollapsed } = props;

    return (
        <header className="flex px-4 py-3 bg-white shadow-lg">
            <button
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                id="btn-bars"
            >
                <i className="fa fa-bars"></i>
            </button>

            <div className="flex-1"></div>

            <Dropdown>
                <Dropdown.Trigger>
                    <button className="font-normal btn">
                        <i className="fa fa-user"></i>
                        {user.name}
                    </button>
                </Dropdown.Trigger>
                <Dropdown.Content align="right" width="48">
                    <Dropdown.Link href={route("profile.edit")}>
                        Perfil
                    </Dropdown.Link>
                    <Dropdown.Link
                        method="post"
                        as="button"
                        href={route("logout")}
                    >
                        Cerrar sesión
                    </Dropdown.Link>
                </Dropdown.Content>
            </Dropdown>
        </header>
    );
}
