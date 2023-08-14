export function timeFormater(assemblyDate: string) {

    const date = new Date(assemblyDate);

    const formatter = new Intl.DateTimeFormat('ru-RU', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long',
        hour: 'numeric',
        minute: 'numeric',
        timeZone: 'Europe/Moscow'
    });

    return formatter.format(date);
}