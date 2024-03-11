import { useMemo, useState } from "react";
import { filters } from "@/Data/filters";
import { Segmento } from "@/Interfaces/Segmento";
import { Filter } from "@/Interfaces/Filter";

interface Props {
    segmento: Segmento;
}

export default function useFormFilter({ segmento }: Props) {
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

    function loadFilters() {
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

        setAllFilters(newFilters);
    }

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

    return {
        allFilters,
        activeFilterOptions,
        totalByAllActiveFilters,
        loadFilters,
        handleToggleActiveOption,
        resetFilters,
    };
}
