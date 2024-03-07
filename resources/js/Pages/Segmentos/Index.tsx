import { PageProps } from "@/types";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Alert from "@/Components/Alert";
import excelSvg from "@/svg/excel.svg";
import enviarSvg from "@/svg/enviar.svg";
import verSvg from "@/svg/ver.svg";
import editarSvg from "@/svg/editar.svg";
import eliminarSvg from "@/svg/eliminar.svg";
import { useState } from "react";
import { Head } from "@inertiajs/react";
import Modal from "@/Components/Modal";
import Form from "./Form";
import { Segmento } from "@/types/Segmento";
import Preview from "./Preview";

enum ModalName {
    Form = "Form",
    Preview = "Preview",
}

type Props = PageProps & {
    segmentos: Segmento[];
};

export default function SegmentosPage(props: Props) {
    const { auth, segmentos } = props;

    const [openModalName, setOpenModalName] = useState("");
    const [selectedSegmento, setSelectedSegmento] = useState<Segmento>();

    function handleDelete(segmento: any) {}

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Sementación" />

            <h1 className="title">Segmentación</h1>
            <Alert
                text="Nuestro módulo de Generación de segmentos permite diseñar un segmento de clientes de interés en función a variables demográficas e información
interna de los clientes , para ello es necesario subir un listado de Documentos de Identidad (DNI), con un formato prestablecido de un archivo."
            />

            <div className="w-full mb-6 overflow-x-auto bg-white rounded-lg shadow-md">
                <table className="table table-blue">
                    <thead>
                        <tr>
                            <th>Segmento</th>
                            <th>Fecha de creación</th>
                            <th>Cantidad de registros</th>
                            <th>Listado de ingreso</th>
                            <th>Filtros</th>
                            <th>Enviar comunicación</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {segmentos?.map((segmento) => (
                            <tr key={segmento.id}>
                                <td>{segmento.nombre}</td>
                                <td>{segmento.created_at}</td>
                                <td>{segmento.personas.length}</td>
                                <td>
                                    <a
                                        href={route("perfiles.download", {
                                            perfil: segmento,
                                        })}
                                        className="btn btn-sm"
                                    >
                                        <img
                                            src={excelSvg}
                                            alt="icono de excel"
                                            width={24}
                                        />
                                    </a>
                                </td>
                                <td>
                                    <div className="flex flex-col gap-1">
                                        {(
                                            JSON.parse(segmento.filtros) as [
                                                string
                                            ]
                                        ).map((filtro) => (
                                            <div
                                                key={filtro}
                                                className="badge badge-primary"
                                            >
                                                {filtro}
                                            </div>
                                        ))}
                                    </div>
                                </td>
                                <td>
                                    <button>
                                        <img
                                            src={enviarSvg}
                                            alt="icono de ver"
                                            width={24}
                                        />
                                    </button>
                                </td>
                                <td>
                                    <div className="flex w-20 gap-1">
                                        <button
                                            onClick={() => {
                                                setOpenModalName(
                                                    ModalName.Preview
                                                );
                                                setSelectedSegmento(segmento);
                                            }}
                                        >
                                            <img
                                                src={verSvg}
                                                alt="icono de ver"
                                                width={24}
                                            />
                                        </button>
                                        <button>
                                            <img
                                                src={editarSvg}
                                                alt="icono de editar"
                                                width={24}
                                            />
                                        </button>
                                        <button
                                            onClick={() =>
                                                handleDelete(segmento)
                                            }
                                        >
                                            <img
                                                src={eliminarSvg}
                                                alt="icono de eliminar"
                                                width={24}
                                            />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <button
                onClick={() => setOpenModalName(ModalName.Form)}
                className="m-auto btn btn-primary"
            >
                Generar nuevo segmento
            </button>

            <Modal
                show={openModalName == ModalName.Form}
                onClose={() => setOpenModalName("")}
                maxWidth="xs"
            >
                <Form />
            </Modal>

            <Modal
                show={openModalName == ModalName.Preview}
                onClose={() => setOpenModalName("")}
                maxWidth="xl"
            >
                {selectedSegmento && <Preview segmento={selectedSegmento} />}
            </Modal>
        </AuthenticatedLayout>
    );
}
