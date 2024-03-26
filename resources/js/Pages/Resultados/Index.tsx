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
import { Campania } from "@/Interfaces/Campania";
import type { PageProps } from "@/types";
import LoadingModal from "@/Components/LoadingModal";
import LoaderBounced from "@/Icons/LoaderBounced";
import Tooltip from "@/Components/Tooltip";

type Props = PageProps & {
    flash: {
        message: string | null;
    };
};

export default function Resultados(props: Props) {
    const { auth } = props;

    const [selectedYear, setSelectedYear] = useState(2024);
    const [selectedMonth, setSelectedMonth] = useState("Todos");
    const [selectedCampainId, setSelectedCampainId] = useState(0);
    const [test, setTest] = useState(false);
    const [isLoadingCampaigns, setIsLoadingCampaigns] = useState(true);

    const scroll1Ref = useRef<HTMLDivElement>(null);
    const scroll2Ref = useRef<HTMLDivElement>(null);
    const scroll3Ref = useRef<HTMLDivElement>(null);

    const [realCampaigns, setRealCampaigns] = useState<Campania[]>([]);

    const allCampains = test ? campains : realCampaigns;

    useEffect(() => {
        async function getCampaigns() {
            setIsLoadingCampaigns(true);
            const resp = await fetch(route("campanias.update_and_get"));
            const data = await resp.json();
            setRealCampaigns(data);
            setIsLoadingCampaigns(false);
        }

        getCampaigns();

        return () => {};
    }, []);

    /*
     * Filtrar las campañas por el id seleccionado
     */
    const filteredCampains = useMemo(() => {
        // let filteredCampains = [...campains];
        let filteredCampains = [...allCampains];

        filteredCampains = filteredCampains.filter(
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
            filteredCampains = filteredCampains.filter(
                (campain) => campain.id === selectedCampainId
            );
        }

        return filteredCampains;
    }, [selectedYear, selectedCampainId, selectedMonth, allCampains]);

    /*
     * Actualizar el año y mes si se selecciona una campaña
     */
    useEffect(() => {
        const campain = allCampains.find((c) => c.id === selectedCampainId);
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
        const campain = allCampains.find((c) => c.id === selectedCampainId);
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
            const fCampains = filteredCampains.filter(
                (c) =>
                    new Date(c.fecha_envio).getUTCMonth() ===
                    MONTHS.indexOf(month)
            );

            const nTotalRecords = fCampains.reduce(
                (acc, campain) => acc + campain.n_registros,
                0
            );

            const nValidRecords = fCampains.reduce(
                (acc, campain) => acc + campain.n_validados,
                0
            );

            const nOpenedRecords = fCampains.reduce(
                (acc, campain) => acc + campain.n_abiertos,
                0
            );

            return {
                month,
                year: 2023,
                nTotalRecords: nTotalRecords,
                nValidRecords: nValidRecords,
                nOpenedRecords: nOpenedRecords,
                nCampanias: fCampains.length,
            };
        });
        return results;
    }, [filteredCampains, allCampains]);

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
    }, [isLoadingCampaigns]);

    /*
     * Opciones de filtros
     */
    const yearOptions = [2023, 2024, 2025].map((year) => ({
        text: year.toString(),
        value: year,
    }));

    const monthOptions = [
        {
            text: "Todos",
            value: "Todos",
        },
        ...MONTHS.map((month) => ({
            text: month,
            value: month,
        })),
    ];

    const campainOptions = [
        {
            text: "Todas",
            value: 0,
        },
        ...allCampains.map((campain) => ({
            text: "Campaña " + campain.id,
            value: campain.id,
        })),
    ];

    const mediumOptions = ["Email", "SMS", "WhatsApp"].map((medium) => ({
        text: medium,
        value: medium,
    }));

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Resultados" />
            <h1 className="title">Resultados de Campañas</h1>
            <Alert text="En nuestro módulo de resultados de campañas encontrarás los principales indicadores de las campañas realizadas." />
            {/* Filtros */}
            <div className="flex items-center justify-center gap-4 mb-6">
                <FilterSelect
                    label="Año"
                    options={yearOptions}
                    value={selectedYear}
                    onChange={(value) => setSelectedYear(Number(value))}
                />
                <FilterSelect
                    label="Mes"
                    value={selectedMonth}
                    onChange={(value) => setSelectedMonth(value.toString())}
                    options={monthOptions}
                />
                <FilterSelect
                    label="Campaña"
                    value={selectedCampainId}
                    options={campainOptions}
                    onChange={(value) => setSelectedCampainId(Number(value))}
                />
                <FilterSelect
                    label="Medio"
                    value={"Email"}
                    options={mediumOptions}
                />
            </div>
            {/* Resultados */}
            {isLoadingCampaigns ? (
                // <LoadingModal text="Actualizando reporte de campañas" />
                <LoaderBounced />
            ) : (
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

                    <div className="flex items-center gap-2 mb-4">
                        <h2 className="font-bold text-azul-marino">
                            Tasa de entrega
                        </h2>
                        <Tooltip
                            text="Se calcula con"
                            subtext="TOTAL ENTREGADOS / TOTAL"
                        >
                            <div className="grid w-4 h-4 rounded-full bg-azul-marino text-amarillo place-content-center">
                                <i className="text-xs fa fa-question"></i>
                            </div>
                        </Tooltip>
                    </div>
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

                    <div className="flex items-center gap-2 mb-4">
                        <h2 className="font-bold text-azul-marino">
                            Tasa de apertura
                        </h2>
                        <Tooltip
                            text="Se calcula con"
                            subtext="TOTAL ABIERTOS / TOTAL ENTREGADOS"
                        >
                            <div className="grid w-4 h-4 rounded-full bg-azul-marino text-amarillo place-content-center">
                                <i className="text-xs fa fa-question"></i>
                            </div>
                        </Tooltip>
                    </div>
                    <div
                        ref={scroll3Ref}
                        className="w-full pb-2 mb-8 overflow-x-auto"
                    >
                        <div className="flex gap-2">
                            {results.map((item) => {
                                return (
                                    <OpenRateCard
                                        key={item.month}
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
            )}
            <button
                onClick={() => setTest(!test)}
                className="fixed btn btn-secondary btn-sm bottom-4 right-4"
            >
                {test ? (
                    <span>Datos reales</span>
                ) : (
                    <span>
                        <i className="mr-1 fa fa-vial"></i>
                        Datos de prueba
                    </span>
                )}
            </button>
        </AuthenticatedLayout>
    );
}
