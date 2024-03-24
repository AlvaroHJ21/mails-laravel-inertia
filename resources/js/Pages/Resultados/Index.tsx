import { useEffect, useMemo, useRef, useState } from "react";
import { Head } from "@inertiajs/react";

import { MONTHS, campains } from "./data";
import { calculatePercent } from "@/Utils/calculatePercent";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Alert from "@/Components/Alert";
import FilterSelect from "./FilterSelect";
import MainResultCard from "./MainResultCard";
import OpenRateCard from "./OpenRateCard";
import SuccessRateCard from "./SuccessRateCard";
import { CampaniaMonthResult } from "@/Interfaces/CampaniaMonthResult";
import type { PageProps } from "@/types";

export default function Resultados(props: PageProps) {
    const { auth } = props;

    const [selectedYear, setSelectedYear] = useState(2023);
    const [selectedMonth, setSelectedMonth] = useState("Todos");
    const [selectedCampainId, setSelectedCampainId] = useState(0);

    const scroll1Ref = useRef<HTMLDivElement>(null);
    const scroll2Ref = useRef<HTMLDivElement>(null);
    const scroll3Ref = useRef<HTMLDivElement>(null);

    /*
     * Filtrar las campañas por el id seleccionado
     */
    const filteredCampains = useMemo(() => {
        let filteredCampains = [...campains];

        filteredCampains = campains.filter(
            (campain) =>
                new Date(campain.fecha_envio).getUTCFullYear() === selectedYear
        );

        filteredCampains = filteredCampains.filter(
            (campain) =>
                selectedMonth === "Todos" ||
                MONTHS[new Date(campain.fecha_envio).getUTCMonth()] ===
                    selectedMonth
        );

        if (selectedCampainId !== 0) {
            filteredCampains = campains.filter(
                (campain) => campain.id === selectedCampainId
            );
        }

        return filteredCampains;
    }, [selectedYear, selectedCampainId, selectedMonth]);

    /*
     * Actualizar el año y mes si se selecciona una campaña
     */
    useEffect(() => {
        const campain = campains.find((c) => c.id === selectedCampainId);
        if (campain) {
            const year = new Date(campain.fecha_envio).getUTCFullYear();
            if (year !== selectedYear) {
                setSelectedYear(year);
            }
            const month = MONTHS[new Date(campain.fecha_envio).getUTCMonth()];
            if (month !== selectedMonth) {
                setSelectedMonth(month);
            }
        }
        return () => {};
    }, [selectedCampainId]);

    /*
     * Actualizar la campaña seleccionada si se cambia de año o mes
     * pero solo si la campaña seleccionada no es de ese mes o año
     */
    useEffect(() => {
        const campain = campains.find((c) => c.id === selectedCampainId);
        if (campain) {
            const month = MONTHS[new Date(campain.fecha_envio).getUTCMonth()];
            if (month !== selectedMonth) {
                setSelectedCampainId(0);
            }
            const year = new Date(campain.fecha_envio).getUTCFullYear();
            if (year !== selectedYear) {
                setSelectedCampainId(0);
            }
        }
        return () => {};
    }, [selectedYear, selectedMonth]);

    /*
     * Resultados de las campañas filtradas
     * Arreglo por los 12 meses del año
     */
    const results = useMemo(() => {
        const results: CampaniaMonthResult[] = MONTHS.map((month) => {
            const campains = filteredCampains.filter(
                (c) =>
                    new Date(c.fecha_envio).getUTCMonth() ===
                    MONTHS.indexOf(month)
            );

            const nTotalRecords = campains.reduce(
                (acc, campain) => acc + campain.n_registros,
                0
            );

            const nValidRecords = campains.reduce(
                (acc, campain) => acc + campain.n_validados,
                0
            );

            const nOpenedRecords = campains.reduce(
                (acc, campain) => acc + campain.n_abiertos,
                0
            );

            return {
                month,
                year: 2023,
                nTotalRecords: nTotalRecords,
                nValidRecords: nValidRecords,
                nOpenedRecords: nOpenedRecords,
                nCampanias: campains.length,
            };
        });
        return results;
    }, [filteredCampains]);

    /*
     * Sincronizacion de scroll horizontal
     */
    useEffect(() => {
        function handleScroll() {
            const scrollLeft = scroll1Ref.current?.scrollLeft ?? 0;
            if (scroll2Ref.current) {
                scroll2Ref.current.scrollLeft = scrollLeft;
            }
            if (scroll3Ref.current) {
                scroll3Ref.current.scrollLeft = scrollLeft;
            }
        }

        scroll1Ref.current?.addEventListener("scroll", handleScroll);

        return () => {
            scroll1Ref.current?.removeEventListener("scroll", handleScroll);
        };
    }, []);

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
                    value={selectedYear}
                    onChange={(value) => setSelectedYear(Number(value))}
                />
                <FilterSelect
                    label="Mes"
                    value={selectedMonth}
                    onChange={(value) => setSelectedMonth(value.toString())}
                    options={["Todos", ...MONTHS.map((month) => month)]}
                />
                <FilterSelect
                    label="Campaña"
                    value={selectedCampainId}
                    options={[0, ...campains.map((campain) => campain.id)]}
                    onChange={(value) => setSelectedCampainId(Number(value))}
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
                <div
                    ref={scroll1Ref}
                    className="w-full pb-2 mb-8 overflow-x-auto"
                >
                    <div className="flex gap-2">
                        {results.map((item) => {
                            return (
                                <MainResultCard
                                    key={item.month}
                                    result={item}
                                />
                            );
                        })}
                    </div>
                </div>

                <h2 className="mb-4 font-bold text-azul-marino">
                    Tasa de éxito de envío
                </h2>
                <div
                    ref={scroll2Ref}
                    className="w-full pb-2 mb-8 overflow-x-auto"
                >
                    <div className="flex gap-2">
                        {results.map((item) => {
                            return (
                                <SuccessRateCard
                                    key={item.month}
                                    value={calculatePercent(
                                        item.nValidRecords,
                                        item.nTotalRecords
                                    )}
                                />
                            );
                        })}
                    </div>
                </div>

                <h2 className="mb-4 font-bold text-azul-marino">
                    Tasa de apertura
                </h2>
                <div
                    ref={scroll3Ref}
                    className="w-full pb-2 mb-8 overflow-x-auto"
                >
                    <div className="flex gap-2">
                        {results.map((item) => {
                            return (
                                <OpenRateCard
                                    key={item.month + item.year}
                                    value={calculatePercent(
                                        item.nOpenedRecords,
                                        item.nValidRecords
                                    )}
                                />
                            );
                        })}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
