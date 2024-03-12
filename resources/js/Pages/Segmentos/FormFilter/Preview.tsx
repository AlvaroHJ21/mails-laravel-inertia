import { Segmento } from "@/Interfaces/Segmento";
import { router } from "@inertiajs/react";
import { UseFilter } from "./useFilter";
import { FilterGroup } from "@/Interfaces/Filter";

interface Props {
    segmento: Segmento;
    filters: UseFilter[];
    totalByAllActiveFilters: number;
    onSaved?: () => void;
}

export default function Preview(props: Props) {
    const { segmento, filters, totalByAllActiveFilters, onSaved } = props;

    function handleSave() {
        const filterGroups: FilterGroup[] = filters.map((f) => ({
            attr: f.attr,
            count: f.partialCount,
            filters: f.activeFilters.map((filter) => ({
                id: filter.id,
                value: filter.value,
                text: filter.text,
            })),
            text: f.text,
            table: f.table,
        }));

        const filtrosStr = JSON.stringify(filterGroups);

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

    return (
        <div>
            <div className="flex-1 p-8 mb-8 text-white rounded-lg bg-azul-marino">
                <h2 className="text-xl font-bold text-center">
                    Total de Registros
                </h2>
                <p className="mb-4 text-4xl font-bold text-center text-amarillo">
                    {segmento.personas.length}
                </p>

                {filters
                    .filter((g) => g.activeFilters.length > 0)
                    .map((groups, filterIdx) => (
                        <div key={groups.text} className="mb-4">
                            <h3 className="mb-2 text-xl font-bold text-white">
                                Filtro {filterIdx + 1}{" "}
                                <span className="italic text-celeste-claro">
                                    {groups.text}
                                </span>
                            </h3>
                            <div className="flex flex-wrap gap-2 mb-2">
                                {groups.activeFilters.map((filter) => (
                                    <div
                                        key={filter.text}
                                        className="py-0 text-white capitalize border-gray-400 btn btn-sm"
                                    >
                                        {filter.text}
                                    </div>
                                ))}
                            </div>
                            <div className="text-xs text-amarillo">
                                <span className="text-xl font-bold">
                                    {groups.partialCount}
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

            <button className="m-auto btn btn-primary" onClick={handleSave}>
                Generar segmento
            </button>
        </div>
    );
}
