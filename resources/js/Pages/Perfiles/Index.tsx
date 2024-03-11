import { Head, router } from "@inertiajs/react";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Modal from "@/Components/Modal";
import { PageProps } from "@/types";
import { Perfil } from "@/types/Perfil";

import FormUpload from "./FormUpload";
import FormView from "./FormView";
import { useState } from "react";
import Alert from "@/Components/Alert";

import editarSvg from "@/svg/editar.svg";
import eliminarSvg from "@/svg/eliminar.svg";
import verSvg from "@/svg/ver.svg";
import enviarSvg from "@/svg/enviar.svg";
import excelSvg from "@/svg/excel.svg";
import { formatDate } from "@/Utils/formatDate";
import TextEditable from "@/Components/TextEditable";

enum ModalName {
    Form = "Form",
    View = "Dashboard",
}

type PerfilesProps = PageProps & {
    perfiles: Perfil[];
};

export default function Perfiles(props: PerfilesProps) {
    const { auth, perfiles } = props;

    const [openModalName, setOpenModalName] = useState("");
    const [activePerfil, setActivePerfil] = useState<Perfil>();
    const [name, setName] = useState("Hola");

    function handleDelete(perfil: Perfil) {
        if (confirm("¿Estás seguro de eliminar este perfil?")) {
            router.delete(route("perfiles.destroy", { perfil }));
        }
    }

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Perfiles" />

            <h1 className="title">Perfilamiento de clientes</h1>
            <Alert
                text="Nuestro módulo de perfilamiento de clientes permite conocer
                    el perfil demográfico de los clientes, para ello es
                    necesario subir un listado de Documentos de Identidad (DNI),
                    con un formato prestablecido de un archivo."
            />
            <div className="w-full mb-6 overflow-x-auto bg-white rounded-lg shadow-md">
                <table className="table table-blue">
                    <thead>
                        <tr>
                            <th>Perfil</th>
                            <th>Fecha de creación</th>
                            <th>Cantidad de registros</th>
                            <th>Listado de ingreso</th>
                            <th>Información del cliente</th>
                            <th>Programar campaña</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {perfiles.map((perfil) => (
                            <tr key={perfil.id}>
                                <td>{perfil.nombre}</td>
                                <td>{formatDate(perfil.created_at)}</td>
                                <td>{perfil.personas.length}</td>
                                <td>
                                    <a
                                        href={route("perfiles.download", {
                                            perfil,
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
                                    <div>V1: Segmento de valor</div>
                                    <div>V2: Segmento transaccional</div>
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
                                                    ModalName.View
                                                );
                                                setActivePerfil(perfil);
                                            }}
                                        >
                                            <img
                                                src={verSvg}
                                                alt="icono de ver"
                                                width={24}
                                            />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(perfil)}
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
                Generar nuevo perfil
            </button>

            <Modal
                show={openModalName == ModalName.Form}
                onClose={() => setOpenModalName("")}
                maxWidth="xs"
            >
                <FormUpload onSended={() => setOpenModalName(ModalName.View)} />
            </Modal>
            <Modal
                show={openModalName == ModalName.View}
                onClose={() => setOpenModalName("")}
            >
                {activePerfil && <FormView perfil={activePerfil} />}
            </Modal>
        </AuthenticatedLayout>
    );
}
