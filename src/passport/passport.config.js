// src/passport/passport.config.js
import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { User } from '../models/User.model.js';
import { configObject } from '../config/config.js';
import dotenv from 'dotenv';

const cookieExtractor = (req) => {
    let token = null;
    if (req && req.cookies) {
        token = req.cookies['jwt']; // Nombre de la cookie donde está el token
    }
    return token;
    
};

const opts = {
    jwtFromRequest: cookieExtractor, // 🔹 Ahora se usa después de su declaración
    secretOrKey: configObject.jwtSecret,
};
const jwtOptions = {
    jwtFromRequest: cookieExtractor, // Usamos el extractor de cookies
    secretOrKey: configObject.jwtSecret
};




passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
    try {
        const user = await User.findById(jwt_payload.id);
        if (user) return done(null, user);
        return done(null, false);
    } catch (error) {
        return done(error, false);
    }
}));

export const initializePassport = () => passport.initialize();

