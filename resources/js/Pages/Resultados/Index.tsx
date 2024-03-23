import { Head } from "@inertiajs/react";

import { data } from "./data";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Alert from "@/Components/Alert";
import FilterSelect from "./FilterSelect";
import MainResultCard from "./MainResultCard";
import OpenRateCard from "./OpenRateCard";
import SuccessRateCard from "./SuccessRateCard";
import type { PageProps } from "@/types";
import { useState } from "react";

export default function Resultados(props: PageProps) {
    const { auth } = props;

    const [month, setMonth] = useState("Todos");

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Resultados" />
            <h1 className="title">Resultados de Campañas</h1>
            <Alert text="En nuestro módulo de resultados de campañas encontrarás los principales indicadores de las campañas realizadas." />
            {/* Filtros */}
            <div className="flex justify-center gap-4 mb-6">
                <FilterSelect
                    label="Año"
                    options={[2023, 2024, 2025]}
                    value={"Todos"}
                />
                <FilterSelect
                    label="Mes"
                    value={month}
                    onChange={(value) => setMonth(value.toString())}
                    options={[
                        "Todos",
                        "Enero",
                        "Febrero",
                        "Marzo",
                        "Abril",
                        "Mayo",
                        "Junio",
                        "Julio",
                        "Agosto",
                        "Septiembre",
                        "Octubre",
                        "Noviembre",
                        "Diciembre",
                    ]}
                />
                <FilterSelect
                    label="Campaña"
                    value={"Todos"}
                    options={[
                        "Todos",
                        "Campaña 1",
                        "Campaña 2",
                        "Campaña 3",
                        "Campaña 4",
                        "Campaña 5",
                        "Campaña 6",
                        "Campaña 7",
                        "Campaña 8",
                        "Campaña 9",
                        "Campaña 10",
                    ]}
                />
                <FilterSelect
                    label="Medio"
                    value={"Email"}
                    options={["Email", "SMS", "WhatsApp"]}
                />
            </div>
            {/* Resultados */}
            <div className="bg-[#e3f3fb] p-8 rounded-md">
                <h2 className="mb-4 font-bold text-azul-marino">
                    Campañas generadas
                </h2>
                <div className="w-full pb-2 mb-8 overflow-x-auto">
                    <div className="flex gap-2">
                        {data.map((item) => {
                            const show =
                                month === "Todos" || month === item.month;
                            return (
                                <MainResultCard
                                    key={item.month + item.year}
                                    result={item}
                                    show={show}
                                />
                            );
                        })}
                    </div>
                </div>

                <h2 className="mb-4 font-bold text-azul-marino">
                    Tasa de éxito de envío
                </h2>
                <div className="w-full pb-2 mb-8 overflow-x-auto">
                    <div className="flex gap-2">
                        {data.map((item) => {
                            const show =
                                month === "Todos" || month === item.month;
                            return (
                                <SuccessRateCard
                                    key={item.month + item.year}
                                    value={
                                        (item.nValidRecords /
                                            item.nTotalRecords) *
                                        100
                                    }
                                    show={show}
                                />
                            );
                        })}
                    </div>
                </div>

                <h2 className="mb-4 font-bold text-azul-marino">
                    Tasa de apertura
                </h2>
                <div className="w-full pb-2 mb-8 overflow-x-auto">
                    <div className="flex gap-2">
                        {data.map((item) => {
                            const show =
                                month === "Todos" || month === item.month;
                            return (
                                <OpenRateCard
                                    key={item.month + item.year}
                                    value={
                                        (item.nOpenedRecords /
                                            item.nTotalRecords) *
                                        100
                                    }
                                    show={show}
                                />
                            );
                        })}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
