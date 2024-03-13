import { Segmento } from "@/Interfaces/Segmento";

export function getTotalFiltered(segmento: Segmento) {
    const filtersGroups = segmento.filtros;

    let personasFiltered = [...segmento.personas];

    filtersGroups.forEach((group) => {
        if (group.filters.length > 0) {
            personasFiltered = personasFiltered.filter((persona) => {
                return group.filters.some(
                    (filter) =>
                        persona[group.attr] &&
                        filter.value.toLowerCase() ===
                            persona[group.attr].toString().toLowerCase()
                );
            });
        }
    });

    return personasFiltered.length;
}
