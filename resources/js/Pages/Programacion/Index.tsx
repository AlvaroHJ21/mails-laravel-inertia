import { useEffect, useState } from "react";
import { Head, router } from "@inertiajs/react";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Alert from "@/Components/Alert";
import Button from "@/Components/Button";
import Modal from "@/Components/Modal";
import Form from "./Form/Form";

import eliminarSvg from "@/svg/eliminar.svg";
import enviarSvg from "@/svg/enviar.svg";
import excelSvg from "@/svg/excel.svg";
import verSvg from "@/svg/ver.svg";

import { formatDate } from "@/Utils/formatDate";
import { formatTime } from "@/Utils/formatTime";

import { PageProps } from "@/types";
import { Campania } from "@/Interfaces/Campania";
import { useConfirmModal } from "@/Components/ConfirmModal";
import Tooltip from "@/Components/Tooltip";

type modalName = "" | "Form";

type Props = PageProps & {
    campanias: Campania[];
    flash: {
        message: string | null;
    };
};

export default function Programacion(props: Props) {
    const { auth, campanias } = props;

    const [openModalName, setOpenModalName] = useState<modalName>("");
    const [activeCampania, setActiveCampania] = useState<Campania>();

    const confirmModal = useConfirmModal();

    /*
     * Si se recibe un mensaje flash, se abre el modal
     * de form con la última campaña creada
     */
    useEffect(() => {
        if (props.flash.message) {
            setOpenModalName("Form");
            setActiveCampania(campanias[campanias.length - 1]);
        }
        return () => {};
    }, []);

    /*
     * Funcion para eliminar una campaña
     * @param campania
     */
    function handleDelete(campania: Campania) {
        confirmModal.openConfirm({
            title: "Confirmar",
            message: "¿Estás seguro de eliminar esta campaña?",
            buttonText: "Eliminar",
            buttonVariant: "error",
            onConfirm() {
                router.delete(route("campanias.destroy", campania.id));
                confirmModal.cancel();
            },
        });
    }

    /*
     * Funcion para enviar una campaña manualmente
     * @param campania
     */
    function handleSend(campania: Campania): void {
        confirmModal.openConfirm({
            title: "Confirmar",
            message: "¿Estás seguro de enviar esta campaña?",
            buttonText: "Sí, enviar",
            buttonVariant: "primary",
            onConfirm() {
                router.post(
                    route("campanias.send", { campania }),
                    {},
                    {
                        onSuccess(data: any) {
                            console.log(data);
                            window.toast.success(data.props.flash.message);
                        },
                        onError(errors) {
                            console.log(errors);
                        },
                    }
                );
                confirmModal.cancel();
            },
        });
    }

    /*
     * Funcion para sincronizar el reporte de una campaña manualmente
     * @param campania
     */
    function handleSyncReport(campania: Campania): void {
        router.post(
            route("campanias.sync_report", { campania }),
            {},
            {
                onSuccess(data: any) {
                    console.log(data);
                    window.toast.success(data.props.flash.message);
                },
                onError(errors) {
                    console.log(errors);
                },
            }
        );
        confirmModal.cancel();
    }

    function handleShowReport(campania: Campania) {
        router.get(route("campanias.report", { campania: campania.id }));
    }

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Programación de campañas" />

            <h1 className="title">Programación de Campañas</h1>

            <Alert
                text="Nuestro módulo de perfilamiento de clientes permite conocer el perfil demográfico de los clientes, para ello es necesario
subir un listado de Documentos de Identidad (DNI), con un formato prestablecido de un archivo."
            />
            <div className="w-full mb-6 overflow-x-auto bg-white rounded-lg shadow-md">
                <table className="table table-blue">
                    <thead>
                        <tr>
                            <th>Campaña</th>
                            <th>Fecha de creación</th>
                            <th>Fecha de envío</th>
                            <th>Hora de envío</th>
                            <th>Cantidad de registros</th>
                            <th>Listado de ingreso</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {campanias.map((campania) => (
                            <tr key={campania.id}>
                                <td>{campania.nombre}</td>
                                <td>{formatDate(campania.created_at)}</td>
                                <td>{formatDate(campania.fecha_envio)}</td>
                                <td>{formatTime(campania.fecha_envio)}</td>
                                <td>{campania.personas.length}</td>
                                <td>
                                    <a
                                        href={route("campanias.download", {
                                            campania,
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
                                    <div className="flex justify-end w-40 gap-2">
                                        {!campania.enviado ? (
                                            <Tooltip
                                                text="Enviar ahora"
                                                direction="left"
                                            >
                                                <button
                                                    onClick={() =>
                                                        handleSend(campania)
                                                    }
                                                >
                                                    <img
                                                        src={enviarSvg}
                                                        alt="icono de play"
                                                        width={24}
                                                    />
                                                </button>
                                            </Tooltip>
                                        ) : (
                                            <>
                                                <Tooltip
                                                    text="Actualizar reporte de campaña"
                                                    direction="left"
                                                >
                                                    <button
                                                        onClick={() =>
                                                            handleSyncReport(
                                                                campania
                                                            )
                                                        }
                                                        className="rounded-full w-7 h-7 bg-amarillo text-azul-marino"
                                                    >
                                                        <i className="fa fa-refresh"></i>
                                                    </button>
                                                </Tooltip>
                                                <Tooltip
                                                    text="Ver reporte de campaña"
                                                    direction="left"
                                                >
                                                    <button
                                                        onClick={() =>
                                                            handleShowReport(
                                                                campania
                                                            )
                                                        }
                                                        className="rounded-full w-7 h-7 bg-amarillo text-azul-marino"
                                                    >
                                                        <i className="fa fa-bar-chart"></i>
                                                    </button>
                                                </Tooltip>
                                            </>
                                        )}
                                        <Tooltip
                                            text="Ver/Editar campaña"
                                            direction="left"
                                        >
                                            <button
                                                onClick={() => {
                                                    setOpenModalName("Form");
                                                    setActiveCampania(campania);
                                                }}
                                            >
                                                <img
                                                    src={verSvg}
                                                    alt="icono de ver"
                                                    width={24}
                                                    className="w-7"
                                                />
                                            </button>
                                        </Tooltip>
                                        <Tooltip
                                            text="Eliminar campaña"
                                            direction="left"
                                        >
                                            <button
                                                onClick={() =>
                                                    handleDelete(campania)
                                                }
                                            >
                                                <img
                                                    src={eliminarSvg}
                                                    alt="icono de eliminar"
                                                    width={24}
                                                    className="w-7"
                                                />
                                            </button>
                                        </Tooltip>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <Button
                onClick={() => {
                    setOpenModalName("Form");
                    setActiveCampania(undefined);
                }}
                className="m-auto"
            >
                Generar nueva campaña
            </Button>

            <Modal
                show={openModalName === "Form"}
                onClose={() => setOpenModalName("")}
                maxWidth="2xl"
            >
                <Form
                    campania={activeCampania}
                    onClose={() => setOpenModalName("")}
                />
            </Modal>
        </AuthenticatedLayout>
    );
}
