import { useEffect, useMemo, useState } from "react";
import {
    filtersGroups,
    initialEdadFilters,
    initialEstadoCivilFilters,
    initialGeneracionFilters,
    initialSexoFilters,
} from "@/Data/filters";
import { Segmento } from "@/Interfaces/Segmento";
import { Filter } from "@/Interfaces/Filter";
import { PeruDepartment, PeruDistrict, PeruProvince } from "@/Interfaces/Peru";
import useFilter from "./useFilter";

interface Props {
    segmento: Segmento;
    departamentos: PeruDepartment[];
    provincias: PeruProvince[];
    distritos: PeruDistrict[];
}

export default function useFormFilter(props: Props) {
    const { segmento, departamentos, provincias, distritos } = props;

    const [allfiltersGroups, setAllfiltersGroups] = useState(filtersGroups);

    // Edad
    const edadFilters = useFilter({
        attr: "edad_grupo",
        initialFilters: initialEdadFilters,
        text: "Edad",
        segmento,
    });

    // Sexo
    const sexoFilters = useFilter({
        attr: "sexo",
        initialFilters: initialSexoFilters,
        text: "Sexo",
        segmento,
    });

    // Estado Civil
    const estadoCivilFilters = useFilter({
        attr: "estado_civil",
        initialFilters: initialEstadoCivilFilters,
        text: "Estado Civil",
        segmento,
    });

    // Generación
    const generacionFilters = useFilter({
        attr: "generacion",
        initialFilters: initialGeneracionFilters,
        text: "Generación",
        segmento,
    });

    // Departamento
    const departamentoFilters = useFilter({
        attr: "departamento",
        initialFilters: departamentos.map((d) => {
            return {
                id: d.id,
                text: d.name,
                value: d.name,
            };
        }),
        text: "Departamento",
        segmento,
    });

    // Provincia
    const provinciaFilters = useFilter({
        attr: "provincia",
        initialFilters: [],
        text: "Provincia",
        table: true,
        segmento,
    });

    // Distrito
    const distritoFilters = useFilter({
        attr: "distrito",
        initialFilters: [],
        text: "Distrito",
        table: true,
        segmento,
    });

    const totalByAllActiveFilters = useMemo(() => {
        let filtered = [...segmento.personas];

        if (edadFilters.activeFilters.length > 0) {
            filtered = filtered.filter((persona) =>
                edadFilters.activeFilters.some(
                    (filter) =>
                        filter.value.toLowerCase() ===
                        persona.edad_grupo.toLowerCase()
                )
            );
        }

        if (sexoFilters.activeFilters.length > 0) {
            filtered = filtered.filter((persona) =>
                sexoFilters.activeFilters.some(
                    (filter) =>
                        filter.value.toLowerCase() ===
                        persona.sexo.toLowerCase()
                )
            );
        }

        if (estadoCivilFilters.activeFilters.length > 0) {
            filtered = filtered.filter((persona) =>
                estadoCivilFilters.activeFilters.some(
                    (filter) =>
                        filter.value.toLowerCase() ===
                        persona.estado_civil.toLowerCase()
                )
            );
        }

        if (generacionFilters.activeFilters.length > 0) {
            filtered = filtered.filter((persona) =>
                generacionFilters.activeFilters.some(
                    (filter) =>
                        filter.value.toLowerCase() ===
                        persona.generacion.toLowerCase()
                )
            );
        }

        if (departamentoFilters.activeFilters.length > 0) {
            filtered = filtered.filter((persona) =>
                departamentoFilters.activeFilters.some(
                    (filter) =>
                        filter.value.toLowerCase() ===
                        persona.departamento.toLowerCase()
                )
            );
        }

        if (provinciaFilters.activeFilters.length > 0) {
            filtered = filtered.filter((persona) =>
                provinciaFilters.activeFilters.some(
                    (filter) =>
                        filter.value.toLowerCase() ===
                        persona.provincia.toLowerCase()
                )
            );
        }

        if (distritoFilters.activeFilters.length > 0) {
            filtered = filtered.filter((persona) =>
                distritoFilters.activeFilters.some(
                    (filter) =>
                        filter.value.toLowerCase() ===
                        persona.distrito.toLowerCase()
                )
            );
        }

        return filtered.length;
    }, [
        edadFilters.activeFilters,
        sexoFilters.activeFilters,
        estadoCivilFilters.activeFilters,
        generacionFilters.activeFilters,
        departamentoFilters.activeFilters,
        provinciaFilters.activeFilters,
    ]);

    useEffect(() => {
        const departamentosSelectedIds = departamentoFilters.activeFilters.map(
            (f) => f.id
        );

        let filters: Filter[] = provincias
            .filter((provincia) =>
                departamentosSelectedIds.includes(provincia.department_id)
            )
            .map((p) => {
                return {
                    id: p.id,
                    text: p.name,
                    value: p.name,
                };
            });

        provinciaFilters.setAllFilter(filters);

        return () => {};
    }, [departamentoFilters.activeFilters]);

    useEffect(() => {
        const provinciasSelectedIds = provinciaFilters.activeFilters.map(
            (f) => f.id
        );

        let filters: Filter[] = distritos
            .filter((distrito) =>
                provinciasSelectedIds.includes(distrito.province_id)
            )
            .map((p) => {
                return {
                    id: p.id,
                    text: p.name,
                    value: p.name,
                };
            });

        distritoFilters.setAllFilter(filters);

        return () => {};
    }, [provinciaFilters.activeFilters]);

    function loadFilterGroups() {
        segmento.filtros.forEach((f) => {
            if (f.attr === "edad_grupo") {
                edadFilters.setActiveFilters(f.filters);
            }

            if (f.attr === "sexo") {
                sexoFilters.setActiveFilters(f.filters);
            }

            if (f.attr === "estado_civil") {
                estadoCivilFilters.setActiveFilters(f.filters);
            }

            if (f.attr === "generacion") {
                generacionFilters.setActiveFilters(f.filters);
            }

            if (f.attr === "departamento") {
                departamentoFilters.setActiveFilters(f.filters);
            }

            if (f.attr === "provincia") {
                provinciaFilters.setActiveFilters(f.filters);
            }

            if (f.attr === "distrito") {
                distritoFilters.setActiveFilters(f.filters);
            }
        });
    }

    function resetFilters() {
        edadFilters.resetFilters();
        sexoFilters.resetFilters();
        estadoCivilFilters.resetFilters();
        generacionFilters.resetFilters();
        departamentoFilters.resetFilters();
        provinciaFilters.resetFilters();
        distritoFilters.resetFilters();
    }

    return {
        allfiltersGroups,
        loadFilterGroups,
        resetFilters,
        totalByAllActiveFilters,
        filters: [
            edadFilters,
            sexoFilters,
            estadoCivilFilters,
            generacionFilters,
            departamentoFilters,
            provinciaFilters,
            distritoFilters,
        ],
    };
}
