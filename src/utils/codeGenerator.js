export function generateUniqueCode() {
    return 'TICKET-' + Math.random().toString(36).substr(2, 9).toUpperCase();
}
