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
import useFilter from "./useFilterGroup";

interface Props {
    segmento: Segmento;
    departamentos: PeruDepartment[];
    provincias: PeruProvince[];
    distritos: PeruDistrict[];
}

export default function useFormFilter(props: Props) {
    const { segmento, departamentos, provincias, distritos } = props;

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
        text: "Género",
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
        text: "Generaciones",
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
        text: "Departamentos",
        segmento,
    });

    // Provincia
    const provinciaFilters = useFilter({
        attr: "provincia",
        initialFilters: [],
        text: "Provincias",
        table: true,
        segmento,
    });

    // Distrito
    const distritoFilters = useFilter({
        attr: "distrito",
        initialFilters: [],
        text: "Distritos",
        table: true,
        segmento,
    });

    //Var1
    const var1Filters = useFilter({
        attr: "var1",
        initialFilters: [],
        text: "Variable 1",
        table: true,
        segmento,
    });

    //Var2
    const var2Filters = useFilter({
        attr: "var2",
        initialFilters: [],
        text: "Variable 2",
        table: true,
        segmento,
    });

    //Var3
    const var3Filters = useFilter({
        attr: "var3",
        initialFilters: [],
        text: "Variable 3",
        table: true,
        segmento,
    });

    /**
     * Cargamos los filtros de var1, var2 y var3
     */
    useEffect(() => {
        const var1ValuesUniques = segmento.personas
            .map((persona) => persona.var1)
            .filter(
                (valor, indice, arreglo) =>
                    arreglo.indexOf(valor) === indice && valor !== null
            );
        var1Filters.setAllFilter(
            var1ValuesUniques.map((v) => ({
                id: v,
                text: v,
                value: v,
            }))
        );

        const var2ValuesUniques = segmento.personas
            .map((persona) => persona.var2)
            .filter(
                (valor, indice, arreglo) =>
                    arreglo.indexOf(valor) === indice && valor !== null
            );
        var2Filters.setAllFilter(
            var2ValuesUniques.map((v) => ({
                id: v,
                text: v,
                value: v,
            }))
        );

        const var3ValuesUniques = segmento.personas
            .map((persona) => persona.var3)
            .filter(
                (valor, indice, arreglo) =>
                    arreglo.indexOf(valor) === indice && valor !== null
            );
        var3Filters.setAllFilter(
            var3ValuesUniques.map((v) => ({
                id: v,
                text: v,
                value: v,
            }))
        );

        return () => {};
    }, []);

    /**
     * Calculamos el total de personas que cumplen con todos los filtros
     */
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
                        persona.estado_civil &&
                        filter.value.toLowerCase() ===
                            persona.estado_civil.toLowerCase()
                )
            );
        }

        if (generacionFilters.activeFilters.length > 0) {
            filtered = filtered.filter((persona) =>
                generacionFilters.activeFilters.some(
                    (filter) =>
                        persona.generacion &&
                        filter.value.toLowerCase() ===
                            persona.generacion.toLowerCase()
                )
            );
        }

        if (departamentoFilters.activeFilters.length > 0) {
            filtered = filtered.filter((persona) =>
                departamentoFilters.activeFilters.some(
                    (filter) =>
                        persona.departamento &&
                        filter.value.toLowerCase() ===
                            persona.departamento.toLowerCase()
                )
            );
        }

        if (provinciaFilters.activeFilters.length > 0) {
            filtered = filtered.filter((persona) =>
                provinciaFilters.activeFilters.some(
                    (filter) =>
                        persona.provincia &&
                        filter.value.toLowerCase() ===
                            persona.provincia.toLowerCase()
                )
            );
        }

        if (distritoFilters.activeFilters.length > 0) {
            filtered = filtered.filter((persona) =>
                distritoFilters.activeFilters.some(
                    (filter) =>
                        persona.distrito &&
                        filter.value.toLowerCase() ===
                            persona.distrito.toLowerCase()
                )
            );
        }

        if (var1Filters.activeFilters.length > 0) {
            filtered = filtered.filter((persona) =>
                var1Filters.activeFilters.some(
                    (filter) =>
                        persona.var1 &&
                        filter.value.toLowerCase() ===
                            persona.var1.toLowerCase()
                )
            );
        }

        if (var2Filters.activeFilters.length > 0) {
            filtered = filtered.filter((persona) =>
                var2Filters.activeFilters.some(
                    (filter) =>
                        persona.var2 &&
                        filter.value.toLowerCase() ===
                            persona.var2.toLowerCase()
                )
            );
        }

        if (var3Filters.activeFilters.length > 0) {
            filtered = filtered.filter((persona) =>
                var3Filters.activeFilters.some(
                    (filter) =>
                        persona.var3 &&
                        filter.value.toLowerCase() ===
                            persona.var3.toLowerCase()
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
        distritoFilters.activeFilters,
        var1Filters.activeFilters,
        var2Filters.activeFilters,
        var3Filters.activeFilters,
    ]);

    /**
     * Sí hay filtros de departamento seleccionados, entonces
     * cargamos los filtros de provincia
     */
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

    /**
     * Sí hay filtros de provincia seleccionados, entonces
     * cargamos los filtros de distrito
     */
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

    /**
     * Sí no hay filtros de departamento seleccionados,
     * entonces borramos los filtros de provincia y distrito
     */
    useEffect(() => {
        if (departamentoFilters.activeFilters.length === 0) {
            provinciaFilters.resetFilters();
            distritoFilters.resetFilters();
        }

        return () => {};
    }, [departamentoFilters.activeFilters]);

    /**
     * funcion para cargar los filtros de los grupos
     * de filtros guardados en el segmento
     */
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

            if (f.attr === "var1") {
                var1Filters.setActiveFilters(f.filters);
            }

            if (f.attr === "var2") {
                var2Filters.setActiveFilters(f.filters);
            }

            if (f.attr === "var3") {
                var3Filters.setActiveFilters(f.filters);
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
            var1Filters,
            var2Filters,
            var3Filters,
        ],
    };
}
