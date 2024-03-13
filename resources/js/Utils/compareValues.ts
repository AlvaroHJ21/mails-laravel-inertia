function compareValues(str1: string, str2: string) {
    if (str1 === null || str2 === null) {
        return false;
    }

    // Convertir ambas cadenas a minúsculas y eliminar tildes
    const normalizedStr1 = str1
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
    const normalizedStr2 = str2
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
