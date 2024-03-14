import { PageProps } from "@/types";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Alert from "@/Components/Alert";
import { formatDate } from "@/Utils/formatDate";
import excelSvg from "@/svg/excel.svg";
import enviarSvg from "@/svg/enviar.svg";
import verSvg from "@/svg/ver.svg";
import { useState } from "react";
import eliminarSvg from "@/svg/eliminar.svg";

export default function Programacion(props: PageProps) {
    const { auth } = props;

    const [openModalName, setOpenModalName] = useState("");
    enum ModalName {
        Form = "Form",
    }

    return (
        <AuthenticatedLayout user={auth.user}>
            <h1 className="title">Programación de Cámpañas</h1>

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
                            <th>Documentos adjuntos</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {[].map((campania: any) => (
                            <tr key={campania.id}>
                                <td>{campania.nombre}</td>
                                <td>{formatDate(campania.created_at)}</td>
                                <td>{campania.personas.length}</td>
                                <td>
                                    <a
                                        href={route("perfiles.download", {
                                            perfil: campania,
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
                                                    ModalName.Form
                                                );
                                                // setActivePerfil(campania);
                                            }}
                                        >
                                            <img
                                                src={verSvg}
                                                alt="icono de ver"
                                                width={24}
                                            />
                                        </button>
                                        <button
                                        // onClick={() =>
                                        //     handleDelete(campania)
                                        // }
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
        </AuthenticatedLayout>
    );
}
