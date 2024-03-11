import { useMemo, useState } from "react";
import { Segmento } from "@/Interfaces/Segmento";
import { FilterGroup, Filter } from "@/Interfaces/Filter";

interface Props {
    segmento: Segmento;
}

export default function useFormFilter({ segmento }: Props) {
    const [activeFilterGroups, setActiveFilterGroups] = useState<FilterGroup[]>(
        []
    );

    const totalByAllActiveFilters = useMemo(() => {
        let filtered = [];
        filtered = segmento.personas.filter((persona) => {
            return activeFilterGroups.every((group) => {
                const value = persona[group.attr];
                return group.filters.some((filter) => filter.value === value);
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
                        return persona[group.attr] === filter.value;
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

    return {
        activeFilterGroups,
        handleToggleActiveFilter,
        isFilterActive,
        loadFilterGroups,
        resetFilters,
        totalByAllActiveFilters,
    };
}
