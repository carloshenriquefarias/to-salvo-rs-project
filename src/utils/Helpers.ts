export function removeSpecialCharacther(str: string) {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
}

export function cleanString(input: string) {
    if (input) {
        return input.replace(/[^a-zA-Z0-9 ]/g, '');
    }
    return "";
}

export function processString(str: string) {
    return removeSpecialCharacther(cleanString(str).toLowerCase());
}