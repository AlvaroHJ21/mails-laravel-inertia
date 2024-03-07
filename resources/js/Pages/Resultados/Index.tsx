import { PageProps } from "@/types";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function Resultados(props: PageProps) {
    const { auth } = props;
    return (
        <AuthenticatedLayout user={auth.user}>
            <h1 className="title">Resultados</h1>
        </AuthenticatedLayout>
    );
}
