const LocalStrategy = require('passport-local').Strategy
const User = require('../models/User')

module.exports = function (passport) {
    passport.use('local-login', new LocalStrategy(
        async (username, password, done) => {
            try {
                // Cerca l'utente per username
                const user = await User.findOne({ username });
                if (!user) {
                    return done(null, false, { message: 'Utente non trovato' });
                }

                // Confronta la password
                const isMatch = await user.comparePassword(password);
                if (!isMatch) {
                    return done(null, false, { message: 'Password errata' });
                }

                return done(null, user);
            } catch (err) {
                return done(err);
            }
        }
    ));

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            const user = await User.findById(id);
            done(null, user);
        } catch (err) {
            done(err);
        }
    });
};