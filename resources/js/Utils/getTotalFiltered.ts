import { Segmento } from "@/Interfaces/Segmento";
import { compareValues } from "./compareValues";

export function getTotalFiltered(segmento: Segmento) {
    const filtersGroups = segmento.filtros;

    let personasFiltered = [...segmento.personas];

    filtersGroups.forEach((group) => {
        if (group.filters.length > 0) {
            personasFiltered = personasFiltered.filter((persona) => {
                return group.filters.some((filter) =>
                    compareValues(filter.value, persona[group.attr])
                );
            });
        }
    });

    return personasFiltered.length;
}
