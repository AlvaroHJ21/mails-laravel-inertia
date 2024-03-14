import { useState } from "react";
import { router } from "@inertiajs/react";

import TextEditable from "@/Components/TextEditable";
import { Segmento } from "@/Interfaces/Segmento";

import { PeruDepartment, PeruDistrict, PeruProvince } from "@/Interfaces/Peru";
import FilterGroups from "./FilterGroups";
import Preview from "./Preview";
import useFormFilter from "./useFormFilter";

interface Props {
    segmento: Segmento;
    onSaved?: () => void;
    departamentos: PeruDepartment[];
    provincias: PeruProvince[];
    distritos: PeruDistrict[];
}

export default function FormFilter(props: Props) {
    const { segmento, departamentos, provincias, distritos, onSaved } = props;

    const [nombre, setNombre] = useState(segmento.nombre);

    const {
        activeFilterGroups,
        allFilterGroups,
        partialCounts,
        totalCount,
        resetFilters,
        isFilterActive,
        toogleFilter,
        toggleSelectAll,
        isGroupAllSelected,
    } = useFormFilter({
        departamentos,
        provincias,
        distritos,
        segmento,
    });

    function handleUpdateName(nombre: string) {
        router.put(route("segmentos.update", { segmento }), {
            nombre,
        });
    }

    return (
        <div className="px-10 py-4 bg-gray-100">
            <h1 className="title">Generación de Segmentos</h1>
            <div className="flex items-center justify-center gap-2 p-2 mb-4 text-white rounded-full bg-azul-marino">
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
                <div className="flex-1 p-8 bg-white rounded-lg max-h-[500px] overflow-y-auto">
                    <FilterGroups
                        filterGroups={allFilterGroups}
                        isFilterActive={isFilterActive}
                        resetFilters={resetFilters}
                        toogleFilter={toogleFilter}
                        toggleSelectAll={toggleSelectAll}
                        isGroupAllSelected={isGroupAllSelected}
                    />
                </div>

                {/* Preview */}
                <div className="flex flex-col pb-8 md:w-[400px] max-h-[500px] overflow-y-auto">
                    <Preview
                        segmento={segmento}
                        activeFilterGroups={activeFilterGroups}
                        partialCounts={partialCounts}
                        totalCount={totalCount}
                        onSaved={onSaved}
                    />
                </div>
            </div>
        </div>
    );
}
