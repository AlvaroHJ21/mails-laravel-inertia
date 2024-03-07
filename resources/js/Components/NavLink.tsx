import { Link } from "@inertiajs/react";

export interface INavLink {
    name: string;
    description: string;
    url: string;
    active: boolean;
}

type Props = {
    navLink: INavLink;
};

export default function NavLink(props: Props) {
    const { navLink } = props;

    return (
        <Link href={navLink.url}>
            <p className="transition-all nav-item-name group-hover:text-amarillo">
                {navLink.name}
            </p>
            <p className="nav-item-description">{navLink.description}</p>
        </Link>
    );
}
