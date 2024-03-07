import { PageProps } from "@/types";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

// type PerfilesProps = PageProps & {
// };

export default function SegmentosPage(props: PageProps) {
    const { auth } = props;
    return (
        <AuthenticatedLayout user={auth.user}>
            <h1 className="title">Segmentación</h1>
        </AuthenticatedLayout>
    );
}
