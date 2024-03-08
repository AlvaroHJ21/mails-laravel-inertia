import { filters } from "@/Data/filters";
import { Filter } from "@/Interfaces/Filter";
import { Segmento } from "@/types/Segmento";
import { router } from "@inertiajs/react";
import { useEffect, useMemo, useState } from "react";

interface Props {
    segmento: Segmento;
}

export default function FormView(props: Props) {
    const { segmento } = props;

    const [allFilters, setAllFilters] = useState(filters);

    const activeFilterOptions = useMemo(() => {
        let filtered: Filter[] = [];

        filtered = allFilters.map((filter) => ({
            attr: filter.attr,
            text: filter.text,
            options: filter.options
                .filter((option) => option.active)
                .map((option) => ({
                    text: option.text,
                    value: option.value,
                    active: true,
                })),
            count: 0,
        }));

        filtered = filtered.filter((filter) => filter.options.length > 0);

        filtered = filtered.map((filter) => ({
            ...filter,
            count: segmento.personas.filter((persona) => {
                const value = persona[filter.attr];
                return filter.options.some((option) => option.value === value);
            }).length,
        }));

        return filtered;
    }, [allFilters]);

    const totalByAllActiveFilters = useMemo(() => {
        let filtered = [];
        filtered = segmento.personas.filter((persona) => {
            return activeFilterOptions.every((filter) => {
                const value = persona[filter.attr];
                return filter.options.some((option) => option.value === value);
            });
        });

        return filtered.length;
    }, [activeFilterOptions]);

    useEffect(() => {
        //marcar como activo los filtros que ya estan seleccionados
        const newFilters = allFilters.map((filter) => {
            const filtros = segmento.filtros.find(
                (f) => f.text === filter.text
            );
            if (filtros) {
                return {
                    ...filter,
                    options: filter.options.map((option) => {
                        const active = filtros.options.some(
                            (o) => o.value === option.value
                        );
                        return {
                            ...option,
                            active,
                        };
                    }),
                };
            }
            return filter;
        });

        console.log(newFilters);

        setAllFilters(newFilters);

        return () => {};
    }, [segmento]);

    function handleToggleActiveOption(
        filterIndex: number,
        optionIndex: number
    ) {
        const newFilters = allFilters.map((filter, i) => {
            if (i === filterIndex) {
                return {
                    ...filter,
                    options: filter.options.map((option, j) => {
                        if (j === optionIndex) {
                            return {
                                ...option,
                                active: !option.active,
                            };
                        }
                        return option;
                    }),
                };
            }
            return filter;
        });

        setAllFilters(newFilters);
    }

    function resetFilters() {
        const newFilters = allFilters.map((filter) => ({
            ...filter,
            options: filter.options.map((option) => ({
                ...option,
                active: false,
            })),
        }));

        setAllFilters(newFilters);
    }

    function handleSave() {
        const filtrosStr = JSON.stringify(activeFilterOptions);

        console.log(activeFilterOptions);

        router.put(route("segmentos.update", { segmento }), {
            filtros: filtrosStr,
        });
    }

    return (
        <div className="p-10 bg-gray-100">
            <h1 className="title">Generación de Segmentos</h1>

            <div className="flex flex-col gap-4 md:flex-row">
                {/* Filtros */}
                <div className="flex-1 p-8 bg-white rounded-lg">
                    <h2 className="text-xl font-bold" hidden>
                        Filtros
                    </h2>
                    <div className="flex flex-wrap gap-8 mb-8">
                        {allFilters.map((filter, filterIdx) => (
                            <div key={filter.text}>
                                <h3 className="mb-2 text-lg font-bold text-celeste-claro">
                                    {filter.text}
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {filter.options.map((option, optionIdx) => (
                                        <button
                                            key={option.value}
                                            onClick={() =>
                                                handleToggleActiveOption(
                                                    filterIdx,
                                                    optionIdx
                                                )
                                            }
                                            className={
                                                "capitalize btn btn-sm btn-outline " +
                                                (option.active ? "active" : "")
                                            }
                                        >
                                            {option.text}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                    <button
                        onClick={resetFilters}
                        className="m-auto text-white btn bg-celeste-claro"
                    >
                        Reestablecer filtros
                    </button>
                </div>

                {/* Preview */}
                <div className="flex flex-col pb-8 md:w-[400px]">
                    <div className="flex-1 p-8 mb-8 text-white rounded-lg bg-azul-marino">
                        <h2 className="text-2xl font-bold text-center">
                            Total de Registros
                        </h2>
                        <p className="mb-4 text-5xl font-bold text-center text-amarillo">
                            {segmento.personas.length}
                        </p>

                        {activeFilterOptions.map((filter, filterIdx) => (
                            <div key={filter.text} className="mb-4">
                                <h3 className="mb-2 text-2xl font-bold text-white">
                                    Filtro {filterIdx + 1}{" "}
                                    <span className="italic text-celeste-claro">
                                        {filter.text}
                                    </span>
                                </h3>
                                <div className="flex flex-wrap gap-2 mb-2">
                                    {filter.options.map((opt) => (
                                        <div
                                            key={opt.text}
                                            className="text-white capitalize border-gray-400 btn btn-sm"
                                        >
                                            {opt.text}
                                        </div>
                                    ))}
                                </div>
                                <div className="text-xs text-amarillo">
                                    <span className="text-xl font-bold">
                                        {filter.count}
                                    </span>{" "}
                                    Registros en total
                                </div>
                            </div>
                        ))}

                        <div className="w-full h-px bg-celeste-claro"></div>
                        <div className="">
                            <div className="flex items-center gap-1 py-4 m-auto max-w-60">
                                Total de registros del segmento creado
                                <div className="text-3xl font-bold text-celeste-claro">
                                    :
                                </div>
                                <div className="text-3xl font-bold text-amarillo">
                                    {totalByAllActiveFilters}
                                </div>
                            </div>
                        </div>
                    </div>

                    <button
                        className="m-auto btn btn-primary"
                        onClick={handleSave}
                    >
                        Generar segmento
                    </button>
                </div>
            </div>
        </div>
    );
}
