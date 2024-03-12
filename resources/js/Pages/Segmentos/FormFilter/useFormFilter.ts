import { useMemo, useState } from "react";
import { filtersGroups } from "@/Data/filters";
import { Segmento } from "@/Interfaces/Segmento";
import { FilterGroup, Filter } from "@/Interfaces/Filter";
import { PeruDepartment, PeruDistrict, PeruProvince } from "@/Interfaces/Peru";

interface Props {
    segmento: Segmento;
    departamentos: PeruDepartment[];
    provincias: PeruProvince[];
    distritos: PeruDistrict[];
}

export default function useFormFilter(props: Props) {
    const { segmento, departamentos, provincias, distritos } = props;

    const [allfiltersGroups, setAllfiltersGroups] = useState(filtersGroups);

    const [activeFilterGroups, setActiveFilterGroups] = useState<FilterGroup[]>(
        []
    );

    const totalByAllActiveFilters = useMemo(() => {
        let filtered = [];
        filtered = segmento.personas.filter((persona) => {
            return activeFilterGroups.every((group) => {
                const value = persona[group.attr];
                return group.filters.some(
                    (filter) =>
                        filter.value.toLowerCase() ===
                        value.toString().toLowerCase()
                );
            });
        });
        return filtered.length;
    }, [activeFilterGroups]);

    function handleToggleActiveFilter(group: FilterGroup, filter: Filter) {
        const filterGroup = activeFilterGroups.find(
            (g) => g.attr === group.attr
        );

        if (filterGroup) {
            /**
             * Si el filtro que se esta seleccionando es el unico que esta seleccionado
             * en el grupo actual, entonces se elimina el grupo completo
             */
            if (
                filterGroup.filters.length == 1 &&
                filterGroup.filters[0].value === filter.value
            ) {
                setActiveFilterGroups(
                    activeFilterGroups.filter((g) => g.attr !== group.attr)
                );
                return;
            }

            let currentFilters = [...filterGroup.filters];
            const exists = currentFilters.find((o) => o.value === filter.value);

            /**
             * Si el filtro ya esta seleccionado, entonces se elimina
             */
            if (exists) {
                currentFilters = currentFilters.filter(
                    (o) => o.value !== filter.value
                );
            } else {
                currentFilters = [...currentFilters, filter];
            }

            const newFilterGroup = {
                ...filterGroup,
                filters: currentFilters,
            };

            let newFilterGroups = activeFilterGroups.map((g) => {
                if (g.attr === group.attr) {
                    return newFilterGroup;
                }
                return g;
            });

            /**
             * Actualizar el contador de cada grupo de filtros
             */
            newFilterGroups = updateCounts(newFilterGroups);
            setActiveFilterGroups(newFilterGroups);
        } else {
            const newFilterGroup = {
                attr: group.attr,
                text: group.text,
                filters: [filter],
                count: 0,
            };

            let newFilterGroups = [...activeFilterGroups, newFilterGroup];

            /**
             * Actualizar el contador de cada grupo de filtros
             */
            newFilterGroups = updateCounts(newFilterGroups);
            setActiveFilterGroups(newFilterGroups);
        }
    }

    function updateCounts(filterGroup: FilterGroup[]) {
        return filterGroup.map((group) => {
            return {
                ...group,
                count: segmento.personas.filter((persona) => {
                    return group.filters.some((filter) => {
                        return (
                            persona[group.attr].toString().toLowerCase() ===
                            filter.value.toLowerCase()
                        );
                    });
                }).length,
            };
        });
    }

    function isFilterActive(filterGroup: FilterGroup, filter: Filter) {
        return activeFilterGroups.some((f) => {
            if (f.attr === filterGroup.attr) {
                return f.filters.some((o) => o.value === filter.value);
            }
            return false;
        });
    }

    function loadFilterGroups() {
        setActiveFilterGroups(segmento.filtros);
    }

    function resetFilters() {
        setActiveFilterGroups([]);
    }

    function updateAllFilters() {
        console.log(departamentos);
        /**
         * Generamos el grupo de filtros para el departamento
         */
        const departmentGroup: FilterGroup = {
            attr: "departamento",
            count: 0,
            filters: departamentos.map((d) => {
                return {
                    id: d.id,
                    text: d.name,
                    value: d.name,
                };
            }),
            text: "Departamento",
        };

        /**
         * Obtenemos los departamentos seleccionados
         */
        const selectedDepartmentGroups = activeFilterGroups.find(
            (group) => group.attr === "departamento"
        );
        const selectedDepartmentsId = selectedDepartmentGroups
            ? selectedDepartmentGroups.filters.map((filter) => filter.id)
            : [];

        /**
         * Generamos el grupo de filtros para la provincia, solo si hay departamentos seleccionados
         */
        const provinceGroup: FilterGroup = {
            attr: "provincia",
            count: 0,
            filters: provincias
                .filter((provincia) =>
                    selectedDepartmentsId.includes(provincia.department_id)
                )
                .map((p) => {
                    return {
                        id: p.id,
                        text: p.name,
                        value: p.name,
                    };
                }),
            text: "Provincia",
            table: true,
        };

        /**
         * Obtenemos las provincias seleccionadas
         */
        const selectedProvinceGroups = activeFilterGroups.find(
            (group) => group.attr === "provincia"
        );
        const selectedProvincesId = selectedProvinceGroups
            ? selectedProvinceGroups.filters.map((filter) => filter.id)
            : [];

        /**
         * Generamos el grupo de filtros para el distrito, solo si hay provincias seleccionadas
         * y departamentos seleccionados
         * */
        const districtGroup: FilterGroup = {
            attr: "distrito",
            count: 0,
            filters: distritos
                .filter((distrito) =>
                    selectedProvincesId.includes(distrito.province_id)
                )
                .map((d) => {
                    return {
                        id: d.id,
                        text: d.name,
                        value: d.name,
                    };
                }),
            text: "Distrito",
            table: true,
        };

        const existsDepartment = allfiltersGroups.some(
            (group) => group.attr === "departamento"
        );
        const existsProvince = allfiltersGroups.some(
            (group) => group.attr === "provincia"
        );
        const existsDistrict = allfiltersGroups.some(
            (group) => group.attr === "distrito"
        );

        let newFilterGroups = [...allfiltersGroups];

        if (!existsDepartment) {
            newFilterGroups.push(departmentGroup);
        }
        if (!existsProvince) {
            newFilterGroups.push(provinceGroup);
        }
        if (!existsDistrict) {
            newFilterGroups.push(districtGroup);
        }

        newFilterGroups = newFilterGroups.map((group) => {
            if (group.attr === "departamento") {
                return departmentGroup;
            }
            if (group.attr === "provincia") {
                return provinceGroup;
            }
            if (group.attr === "distrito") {
                return districtGroup;
            }
            return group;
        });

        setAllfiltersGroups(newFilterGroups);
    }

    return {
        allfiltersGroups,
        activeFilterGroups,
        handleToggleActiveFilter,
        isFilterActive,
        loadFilterGroups,
        resetFilters,
        totalByAllActiveFilters,
        updateAllFilters,
    };
}
