// src/routes/api/sessions.router.js
import { Router } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../../models/User.model.js';
import { hashPassword, comparePassword } from '../../utils/bcrypt.js';
import dotenv from 'dotenv';
import passport from 'passport';

dotenv.config();

const router = Router();

router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
    if (!req.user) {
        return res.status(401).json({ message: 'No autorizado' });
    }
    res.json({ user: req.user });
});

router.post('/register', async (req, res) => {
    const { first_name, last_name, email, age, password } = req.body;
    const hashedPassword = hashPassword(password);
    const user = new User({ first_name, last_name, email, age, password: hashedPassword });
    await user.save();
    res.status(201).send('Usuario registrado');
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !comparePassword(password, user.password)) {
        return res.status(401).send('Credenciales inválidas');
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.cookie('token', token, { httpOnly: true }).send('Login exitoso');
});

export { router as sessionsRouter };
