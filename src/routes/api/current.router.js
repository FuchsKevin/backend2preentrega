import { Router } from 'express';
import passport from 'passport';
import { UserDTO } from '../../dto/UserDTO.js';

const router = Router();

router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    if (!req.user) {
        return res.status(401).json({ message: 'No autorizado' });
    }

    const userDTO = new UserDTO(req.user);
    res.json(userDTO);
});

export { router as currentRouter };
