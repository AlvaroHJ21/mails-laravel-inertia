import { PageProps } from "@/types";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function Programacion(props: PageProps) {
    const { auth } = props;
    return (
        <AuthenticatedLayout user={auth.user}>
            <h1 className="title">Programación</h1>
        </AuthenticatedLayout>
    );
}
