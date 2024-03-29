import { useState } from "react";

import { formatDate } from "@/Utils/formatDate";
import { Head, router } from "@inertiajs/react";

import Alert from "@/Components/Alert";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import FormUpload from "./FormUpload";
import FormView from "./FormFilter/Index";
import Modal from "@/Components/Modal";

import eliminarSvg from "@/svg/eliminar.svg";
import enviarSvg from "@/svg/enviar.svg";
import excelSvg from "@/svg/excel.svg";
import verSvg from "@/svg/ver.svg";

import { PageProps } from "@/types";
import { Segmento } from "@/Interfaces/Segmento";
import { PeruDepartment, PeruDistrict, PeruProvince } from "@/Interfaces/Peru";
import { getTotalFiltered } from "@/Utils/getTotalFiltered";
import getAllDocumentsFiltered from "@/Utils/getAllDocumentsFiltered";
import { useConfirmModal } from "@/Components/ConfirmModal";

enum ModalName {
    Form = "Form",
    Preview = "Preview",
}

type Props = PageProps & {
    segmentos: Segmento[];
    departamentos: PeruDepartment[];
    provincias: PeruProvince[];
    distritos: PeruDistrict[];
};

export default function SegmentosPage(props: Props) {
    const { auth, segmentos } = props;

    const [openModalName, setOpenModalName] = useState("");
    const [selectedSegmento, setSelectedSegmento] = useState<Segmento>();

    const confirmModal = useConfirmModal();

    /*
     * Función para eliminar un segmento
     * @param segmento
     */
    function handleDelete(segmento: Segmento) {
        confirmModal.openConfirm({
            title: "Confirmar",
            message: "¿Estás seguro de eliminar este segmento?",
            buttonText: "Eliminar",
            buttonVariant: "error",
            onConfirm() {
                router.delete(route("segmentos.destroy", { segmento }));
                confirmModal.cancel();
            },
        });
    }

    /*
     * Función para crear una campaña a partir de un segmento
     * @param segmento
     */
    function handleCreateCampania(segmento: Segmento) {
        confirmModal.openConfirm({
            title: "Confirmar",
            message:
                "¿Estás seguro de crear una campaña a partir de los datos de este segmento?",
            buttonText: "Sí, crear",
            buttonVariant: "primary",
            onConfirm() {
                router.post(
                    route("campanias.store_by_segmento", { segmento }),
                    {},
                    {}
                );
                confirmModal.cancel();
            },
        });
    }

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
                            <th>Programar campaña</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {segmentos?.map((segmento) => (
                            <tr key={segmento.id}>
                                <td>{segmento.nombre}</td>
                                <td>{formatDate(segmento.created_at)}</td>
                                <td>{getTotalFiltered(segmento)}</td>
                                <td>
                                    <a
                                        href={route("segmentos.download", {
                                            segmento: segmento,
                                            documentos:
                                                getAllDocumentsFiltered(
                                                    segmento
                                                ),
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
                                    <div className="flex flex-wrap gap-1">
                                        {segmento.filtros.map((option) =>
                                            option.filters.map((option) => (
                                                <span
                                                    key={option.text}
                                                    className="badge"
                                                >
                                                    {option.text}
                                                </span>
                                            ))
                                        )}
                                    </div>
                                </td>
                                <td>
                                    <button
                                        onClick={() =>
                                            handleCreateCampania(segmento)
                                        }
                                    >
                                        <img
                                            src={enviarSvg}
                                            alt="icono de play"
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
                <FormUpload
                    onSended={(segmento) => {
                        setOpenModalName(ModalName.Preview);
                        setSelectedSegmento(segmento);
                    }}
                />
            </Modal>

            <Modal
                show={openModalName == ModalName.Preview}
                onClose={() => setOpenModalName("")}
                maxWidth="xl"
            >
                {selectedSegmento && (
                    <FormView
                        segmento={selectedSegmento}
                        onSaved={() => setOpenModalName("")}
                        departamentos={props.departamentos}
                        distritos={props.distritos}
                        provincias={props.provincias}
                    />
                )}
            </Modal>
        </AuthenticatedLayout>
    );
}
