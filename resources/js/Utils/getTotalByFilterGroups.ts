import { FilterGroup } from "@/Interfaces/Filter";
import { Segmento } from "@/Interfaces/Segmento";
import { compareValues } from "./compareValues";

export function getTotalByFilterGroups(
    segmento: Segmento,
    filterGroups: FilterGroup[]
) {
    let personasFiltered = [...segmento.personas];

    filterGroups.forEach((group) => {
        if (group.filters.length > 0) {
            personasFiltered = personasFiltered.filter((persona) => {
                return group.filters.some((filter) =>
                    compareValues(persona[group.attr], filter.value)
                );
            });
        }
    });

    return personasFiltered.length;
}
