const passport = require("passport");

const jStrategy = require("passport-jwt").Strategy;
const Ejwt = require("passport-jwt").ExtractJwt;

var opts = {
    jwtFromRequest: Ejwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: "secrateKey"
};

const signUpModel = require("../model/authModel");

passport.use(new jStrategy(opts, async function (payload, done) {
    let checkUserData = await signUpModel.findOne({ email: payload.userData.email });
    if (checkUserData) {
        return done(null, checkUserData);
    } else {
        return done(null, false);
    }
}));

passport.serializeUser((user, done) => {
    return done(null, user.id)
});

passport.deserializeUser(async (id, done) => {
    let userData = await signUpModel.findById(id);
    if (userData) {
        return done(null, userData);
    } else {
        return done(null, false);
    }
})