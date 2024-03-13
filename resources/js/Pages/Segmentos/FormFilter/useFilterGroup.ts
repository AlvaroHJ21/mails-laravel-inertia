import { useMemo, useState } from "react";
import { Segmento, SegmentoPersona } from "@/Interfaces/Segmento";
import { Filter } from "@/Interfaces/Filter";

interface Props {
    attr: keyof SegmentoPersona;
    initialFilters: Filter[];
    text: string;
    table?: boolean;
    segmento: Segmento;
}

export interface UseFilterGroup {
    attr: keyof SegmentoPersona;
    text: string;
    table?: boolean;
    allFilter: Filter[];
    activeFilters: Filter[];
    partialCount: number;
    handleToggleActiveFilter: (filter: Filter) => void;
    isActiveFilter: (filter: Filter) => boolean;
    setAllFilter: (filters: Filter[]) => void;
    setActiveFilters: (filters: Filter[]) => void;
    resetFilters: () => void;
}

export default function useFilter(props: Props): UseFilterGroup {
    const { attr, initialFilters, text, table, segmento } = props;

    const [allFilter, setAllFilter] = useState<Filter[]>(initialFilters);
    const [activeFilters, setActiveFilters] = useState<Filter[]>([]);

    const partialCount = useMemo(() => {
        return segmento.personas.filter((p) => {
            return activeFilters.some(
                (f) =>
                    p[attr] &&
                    f.value.toLowerCase() === p[attr].toString().toLowerCase()
            );
        }).length;
    }, [segmento, activeFilters]);

    function handleToggleActiveFilter(filter: Filter) {
        if (activeFilters.some((f) => f.id === filter.id)) {
            setActiveFilters((prev) => prev.filter((f) => f.id !== filter.id));
        } else {
            setActiveFilters((prev) => [...prev, filter]);
        }
    }

    function isActiveFilter(filter: Filter) {
        return activeFilters.some((f) => f.id === filter.id);
    }

    function resetFilters() {
        setActiveFilters([]);
    }

    return {
        attr,
        text,
        table,
        allFilter,
        activeFilters,
        partialCount,
        handleToggleActiveFilter,
        isActiveFilter,
        setAllFilter,
        setActiveFilters,
        resetFilters,
    };
}
