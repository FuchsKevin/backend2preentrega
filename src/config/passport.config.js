import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { UserRepository } from '../repositories/UserRepository.js';

const userRepository = new UserRepository();

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET || 'secretKey'
};

export const initializePassport = () => {
    passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
        try {
            const user = await userRepository.getUserById(jwt_payload.id);
            if (user) {
                return done(null, user);
            }
            return done(null, false);
        } catch (error) {
            return done(error, false);
        }
    }));
};
