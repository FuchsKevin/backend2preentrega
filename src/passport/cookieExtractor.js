export const cookieExtractor = (req) => {
    let token = null;
    if (req && req.cookies) {
        token = req.cookies['token']; // Asegúrate de que el nombre de la cookie sea 'token'
    }
    return token;
};