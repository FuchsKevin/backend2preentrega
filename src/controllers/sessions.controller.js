// src/controllers/sessions.controller.js
import { UserRepository } from '../repositories/UserRepository.js';
import { UserDTO } from '../dto/user.dto.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const userRepository = new UserRepository();

export const registerUser = async (req, res) => {
    const { first_name, last_name, email, age, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = await userRepository.createUser({ first_name, last_name, email, age, password: hashedPassword });
    res.status(201).json({ user: new UserDTO(newUser) });
};

export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    const user = await userRepository.getUserByEmail(email);
    if (!user || !bcrypt.compareSync(password, user.password)) {
        return res.status(401).json({ message: 'Credenciales inválidas' });
    }
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.cookie('token', token, { httpOnly: true }).json({ message: 'Login exitoso' });
};
