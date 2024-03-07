import NavLink, { INavLink } from "./NavLink";

interface Props {
    collapsed: boolean;
}

export default function Sidebar(props: Props) {
    const { collapsed } = props;

    const navLinks: INavLink[] = [
        {
            name: "Perfilamiento",
            description: "Conoce el perfil demográfico de tus clientes.",
            url: route("perfiles.index"),
            active: route().current("perfiles.*"),
        },
        {
            name: "Generador de segmentos",
            description:
                "Diseña tu segmento de clientes en base a variables externas e internas.",
            url: route("segmentos.index"),
            active: route().current("segmentos.*"),
        },
        {
            name: "Programación de campañas",
            description: "Programa una comunicación a tus clientes",
            url: route("programacion.index"),
            active: route().current("programacion.*"),
        },
        {
            name: "Resultados de campañas",
            description:
                "Revisa los principales indicadores de las campañas realizadas.",
            url: route("resultados.index"),
            active: route().current("resultados.*"),
        },
    ];

    return (
        <aside
            className={
                "w-64 h-screen p-8 bg-azul-marino transition-[width,padding] duration-300 " +
                (collapsed ? "collapsed" : "")
            }
        >
            <div className="mb-6">
                <img src="/logo.svg" alt="" width="160" />
            </div>
            <ul className="flex flex-col gap-4">
                {navLinks.map((navLink) => (
                    <li
                        key={navLink.name}
                        className={`nav-item group transition-all ${
                            navLink.active ? "active" : ""
                        }`}
                    >
                        <NavLink navLink={navLink} />
                        <div className="nav-indicator group-hover:bg-amarillo"></div>
                    </li>
                ))}
            </ul>
        </aside>
    );
}
