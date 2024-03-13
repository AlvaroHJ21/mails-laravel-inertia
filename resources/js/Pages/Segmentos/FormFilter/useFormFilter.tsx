import { useEffect, useMemo, useState } from "react";

import {
    initialEdadFilters,
    initialEstadoCivilFilters,
    initialGeneracionFilters,
    initialSexoFilters,
} from "@/Data/filters";
import { getTotalByFilterGroups } from "@/Utils/getTotalByFilterGroups";
import { Filter, FilterGroup } from "@/Interfaces/Filter";
import { PeruDepartment, PeruDistrict, PeruProvince } from "@/Interfaces/Peru";
import { Segmento } from "@/Interfaces/Segmento";
import { getUniqueValues } from "@/Utils/getUniqueValues";

interface Props {
    segmento: Segmento;
    departamentos: PeruDepartment[];
    provincias: PeruProvince[];
    distritos: PeruDistrict[];
}

export default function useFormFilterLaFe(props: Props) {
    const { segmento, departamentos, provincias, distritos } = props;

    /*
     * Todos los filtros disponibles
     */
    const [allFilterGroups, setAllFilterGroups] = useState<FilterGroup[]>([]);

    /*
     * Filtros activos
     */
    const [activeFilterGroups, setActiveFilterGroups] = useState<FilterGroup[]>(
        []
    );

    /*
     * Cantidad parcial de personas que cumplen con los filtros activos
     * Primera posicion total usando el primer grupo de filtros activos
     * Segunda posicion total usando el primer y segundo grupo de filtros activos
     * ...
     */
    const partialCounts: number[] = useMemo(() => {
        let filters = [...activeFilterGroups];
        let partialCounts = [];
        for (let i = 0; i < filters.length; i++) {
            partialCounts.push(
                getTotalByFilterGroups(segmento, filters.slice(0, i + 1))
            );
        }
        return partialCounts;
    }, [activeFilterGroups]);

    /*
     * Cantidad total de personas que cumplen con los filtros activos
     */
    const totalCount = useMemo(() => {
        return getTotalByFilterGroups(segmento, activeFilterGroups);
    }, [activeFilterGroups]);

    /*
     * Cargar todos los filtros disponibles
     */
    useEffect(() => {
        setAllFilterGroups([
            {
                attr: "edad_grupo",
                filters: initialEdadFilters,
                text: "Edad",
            },
            {
                attr: "estado_civil",
                filters: initialEstadoCivilFilters,
                text: "Estado Civil",
            },
            {
                attr: "sexo",
                filters: initialSexoFilters,
                text: "Género",
            },
            {
                attr: "generacion",
                filters: initialGeneracionFilters,
                text: "Generación",
            },
            {
                attr: "departamento",
                filters: departamentos.map((d) => ({
                    id: d.id,
                    text: d.name,
                    value: d.name,
                })),
                text: "Departamento",
            },
            {
                attr: "provincia",
                filters: [],
                text: "Provincia",
                table: true,
            },
            {
                attr: "distrito",
                filters: [],
                text: "Distrito",
                table: true,
            },
            {
                attr: "var1",
                filters: getUniqueValues(
                    segmento.personas.map((p) => p.var1)
                ).map((v) => ({
                    id: v,
                    text: v,
                    value: v,
                })),
                text: "Variable 1",
                table: true,
            },
            {
                attr: "var2",
                filters: getUniqueValues(
                    segmento.personas.map((p) => p.var2)
                ).map((v) => ({
                    id: v,
                    text: v,
                    value: v,
                })),
                text: "Variable 2",
                table: true,
            },
            {
                attr: "var3",
                filters: getUniqueValues(
                    segmento.personas.map((p) => p.var3)
                ).map((v) => ({
                    id: v,
                    text: v,
                    value: v,
                })),
                text: "Variable 3",
                table: true,
            },
        ]);
        return () => {};
    }, []);

    /*
     * Cargar todos los filtros seleccionados
     */
    useEffect(() => {
        setActiveFilterGroups(segmento.filtros);
        return () => {};
    }, [segmento]);

    /*
     * Actualizar filtros de provincias en base a los departamentos seleccionados
     */
    useEffect(() => {
        const departamentoGroup = activeFilterGroups.find(
            (g) => g.attr === "departamento"
        );

        if (departamentoGroup) {
            // Obtener ids de departamentos seleccionados
            const departamentoIds = departamentoGroup.filters.map((f) => f.id);

            // Filtrar provincias por departamentos seleccionados
            const provinciasFiltros: Filter[] = provincias
                .filter((p) => departamentoIds.includes(p.department_id))
                .map((p) => ({
                    id: p.id,
                    text: p.name,
                    value: p.name,
                }));

            // Actualizar filtros de provincias
            const provinciasGroup = allFilterGroups.find(
                (g) => g.attr === "provincia"
            );
            if (provinciasGroup) {
                setAllFilterGroups((prev) =>
                    prev.map((g) =>
                        g.attr === "provincia"
                            ? { ...g, filters: provinciasFiltros }
                            : g
                    )
                );
            }

            //Activar todos los filtros de provincias
            const activeProvinciaGroups = activeFilterGroups.find(
                (g) => g.attr === "provincia"
            );
            if (activeProvinciaGroups) {
                setActiveFilterGroups((prev) =>
                    prev.map((g) =>
                        g.attr === "provincia"
                            ? { ...g, filters: provinciasFiltros }
                            : g
                    )
                );
            } else {
                setActiveFilterGroups((prev) => [
                    ...prev,
                    {
                        attr: "provincia",
                        text: "Provincia",
                        filters: provinciasFiltros,
                    },
                ]);
            }
        } else {
            // Si no hay departamentos seleccionados, vaciar provincias
            const provinciasGroup = allFilterGroups.find(
                (g) => g.attr === "provincia"
            );
            if (provinciasGroup) {
                setAllFilterGroups((prev) =>
                    prev.map((g) =>
                        g.attr === "provincia" ? { ...g, filters: [] } : g
                    )
                );
            }
        }

        return () => {};

        // Solo se ejecuta cuando cambia la lista de departamentos activos
    }, [activeFilterGroups.find((g) => g.attr === "departamento")]);

    /*
     * Actualizar filtros de distritos en base a provincias seleccionadas
     */
    useEffect(() => {
        const provinciaGroup = activeFilterGroups.find(
            (g) => g.attr === "provincia"
        );

        if (provinciaGroup) {
            // Obtener ids de provincias seleccionados
            const provinciaIds = provinciaGroup.filters.map((f) => f.id);

            // Filtrar distritos por provincias seleccionados
            const distritoFiltros: Filter[] = distritos
                .filter((d) => provinciaIds.includes(d.province_id))
                .map((d) => ({
                    id: d.id,
                    text: d.name,
                    value: d.name,
                }));

            // Actualizar filtros de distrito
            const distritoGroup = allFilterGroups.find(
                (g) => g.attr === "distrito"
            );
            if (distritoGroup) {
                setAllFilterGroups((prev) =>
                    prev.map((g) =>
                        g.attr === "distrito"
                            ? { ...g, filters: distritoFiltros }
                            : g
                    )
                );
            }
        } else {
            // Si no hay provincias seleccionados, vaciar distritos
            const distritoGroup = allFilterGroups.find(
                (g) => g.attr === "distrito"
            );
            if (distritoGroup) {
                setAllFilterGroups((prev) =>
                    prev.map((g) =>
                        g.attr === "distrito" ? { ...g, filters: [] } : g
                    )
                );
            }
        }

        return () => {};

        // Solo se ejecuta cuando cambia la lista de provincias activas
    }, [activeFilterGroups.find((g) => g.attr === "provincia")]);

    /*
     * Resetear todos los filtros activos
     */
    function resetFilters() {
        setActiveFilterGroups([]);
    }

    /*
     * Funcion para saber si un filtro esta activo
     */
    function isFilterActive(group: FilterGroup, filter: Filter) {
        return activeFilterGroups.some(
            (g) =>
                g.attr === group.attr &&
                g.filters.some((f) => f.id === filter.id)
        );
    }

    /*
     * Funcion para agregar o quitar un filtro
     */
    function toogleFilter(group: FilterGroup, filter: Filter) {
        // Verificar si existe el grupo
        const existsGroup = activeFilterGroups.find(
            (g) => g.attr === group.attr
        );

        if (existsGroup) {
            //Verificar si el filtro existe en el grupo existente

            const existsFilter = existsGroup.filters.find(
                (f) => f.id === filter.id
            );

            const tempGroup = { ...existsGroup };

            if (existsFilter) {
                // Si existe, quitarlo
                tempGroup.filters = tempGroup.filters.filter(
                    (f) => f.id !== filter.id
                );
            } else {
                // Si no existe, agregarlo
                tempGroup.filters = [...tempGroup.filters, { ...filter }];
            }

            // Si el grupo queda vacio, quitarlo
            if (tempGroup.filters.length === 0) {
                setActiveFilterGroups((prev) =>
                    prev.filter((g) => g.attr !== group.attr)
                );
            } else {
                setActiveFilterGroups((prev) =>
                    prev.map((g) => (g.attr === group.attr ? tempGroup : g))
                );
            }
        } else {
            // Si no existe, agregarlo al final
            setActiveFilterGroups((prev) => [
                ...prev,
                { ...group, filters: [filter] },
            ]);
        }
    }

    return {
        allFilterGroups,
        activeFilterGroups,
        partialCounts,
        totalCount,
        resetFilters,
        isFilterActive,
        toogleFilter,
    };
}
