const authorizeRole = (requiredRole) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ message: 'No autorizado' });
        }

        if (req.user.role !== requiredRole) {
            return res.status(403).json({ message: 'Acceso denegado' });
        }

        next();
    };
};

export default authorizeRole;
