export function compareValues(
    str1: string | number,
    str2: string | number
): boolean {
    if (
        str1 === null ||
        str2 === null ||
        str1 == undefined ||
        str2 === undefined ||
        str1 === "" ||
        str2 === ""
    ) {
        return false;
    }

    // Convertir ambas cadenas a minúsculas y eliminar tildes
    const normalizedStr1 = str1
        .toString()
        .replace("Ã‘", "Ñ")
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
    const normalizedStr2 = str2
        .toString()
        .replace("Ã‘", "Ñ")
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");

    // Comparar las cadenas normalizadas
    if (normalizedStr1 === normalizedStr2) {
        return true; // Las cadenas son iguales
    } else {
        return false; // Las cadenas son diferentes
    }
}
