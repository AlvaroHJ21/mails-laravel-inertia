export function formatTime(date: string | Date) {
    //HH:MM eg: 13:30
    const d = new Date(date);
    const hours = d.getHours();
    const minutes = d.getMinutes();

    return `${hours < 10 ? "0" + hours : hours}:${
        minutes < 10 ? "0" + minutes : minutes
    }`;
}
