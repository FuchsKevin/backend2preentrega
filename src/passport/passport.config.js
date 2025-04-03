// src/passport/passport.config.js
import passport from 'passport';
import { Strategy as JwtStrategy } from 'passport-jwt';
import { configObject } from '../config/config.js';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import UserRepository from '../repositories/UserRepository.js'; // ✅ CORRECTO



dotenv.config();

const userRepository = new UserRepository();

const cookieExtractor = (req) => {
    let token = null;
    if (req && req.cookies) {
        token = req.cookies['jwt']; // Nombre de la cookie donde está el token
    }
    return token;
};

const opts = {
    jwtFromRequest: cookieExtractor,
    secretOrKey: configObject.jwtSecret,
};

passport.use(
    new JwtStrategy(opts, async (jwt_payload, done) => {
        try {
            const user = await userRepository.getUserById(jwt_payload.id);
            if (user) return done(null, user);
            return done(null, false);
        } catch (error) {
            return done(error, false);
        }
    })
);

export const initializePassport = () => passport.initialize();
