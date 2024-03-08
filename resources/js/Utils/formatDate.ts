export function formatDate(date: string | Date) {
    //DD-MM-YY eg: 01-07-22
    const d = new Date(date);
    const day = d.getDate();
    const month = d.getMonth() + 1;
    const year = d.getFullYear();

    return `${day < 10 ? "0" + day : day}-${
        month < 10 ? "0" + month : month
    }-${year.toString().slice(-2)}`;
}
