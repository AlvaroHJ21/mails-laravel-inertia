export function getUniqueValues(values: string[]): string[] {
    const valuesUniques = values.filter(
        (valor, indice, arreglo) =>
            arreglo.indexOf(valor) === indice && valor !== null
    );

    return valuesUniques;
}
