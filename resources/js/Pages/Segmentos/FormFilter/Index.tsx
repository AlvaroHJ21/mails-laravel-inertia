import { useEffect, useState } from "react";
import { router } from "@inertiajs/react";

import TextEditable from "@/Components/TextEditable";
import { Segmento } from "@/Interfaces/Segmento";

import { PeruDepartment, PeruDistrict, PeruProvince } from "@/Interfaces/Peru";
import useFormFilter from "./useFormFilter";
import FilterGroups from "./FilterGroups";
import Preview from "./Preview";

interface Props {
    segmento: Segmento;
    onSaved?: () => void;
    departamentos: PeruDepartment[];
    provincias: PeruProvince[];
    distritos: PeruDistrict[];
}

export default function FormFilter(props: Props) {
    const { segmento, onSaved } = props;

    const [nombre, setNombre] = useState(segmento.nombre);

    const {
        // activeFilterGroups,
        loadFilterGroups,
        resetFilters,
        totalByAllActiveFilters,
        // updateAllFilters,
        filters,
    } = useFormFilter({
        segmento,
        departamentos: props.departamentos,
        provincias: props.provincias,
        distritos: props.distritos,
    });

    useEffect(() => {
        loadFilterGroups();
        return () => {};
    }, [segmento]);

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
                    <FilterGroups
                        filterGroups={filters}
                        resetFilters={resetFilters}
                    />
                </div>

                {/* Preview */}
                <div className="flex flex-col pb-8 md:w-[400px]">
                    <Preview
                        segmento={segmento}
                        filters={filters}
                        totalByAllActiveFilters={totalByAllActiveFilters}
                        onSaved={onSaved}
                    />
                </div>
            </div>
        </div>
    );
}
