import { useEffect, useState } from "react";
import { router } from "@inertiajs/react";

import useFormFilter from "./useFormFilter";
import TextEditable from "@/Components/TextEditable";
import { Segmento } from "@/Interfaces/Segmento";

interface Props {
    segmento: Segmento;
    onSaved?: () => void;
}

export default function FormView(props: Props) {
    const { segmento, onSaved } = props;

    const [nombre, setNombre] = useState(segmento.nombre);

    const {
        activeFilterOptions,
        allFilters,
        handleToggleActiveOption,
        loadFilters,
        resetFilters,
        totalByAllActiveFilters,
    } = useFormFilter({ segmento });

    useEffect(() => {
        loadFilters();
        return () => {};
    }, [segmento]);

    function handleSave() {
        const filtrosStr = JSON.stringify(activeFilterOptions);

        router.put(
            route("segmentos.update", { segmento }),
            {
                filtros: filtrosStr,
            },
            {
                onSuccess() {
                    onSaved?.();
                },
            }
        );
    }

    function handleUpdateName(nombre: string) {
        router.put(route("segmentos.update", { segmento }), {
            nombre,
        });
    }

    return (
        <div className="p-10 bg-gray-100">
            <h1 className="title">Generación de Segmentos</h1>
            <div className="flex items-center justify-center gap-2 p-4 mb-4 text-white rounded-full bg-azul-marino">
                <TextEditable
                    value={nombre}
                    onClickOutside={(value) => {
                        setNombre(value);
                        if (nombre !== value) handleUpdateName(value);
                    }}
                />
            </div>
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
