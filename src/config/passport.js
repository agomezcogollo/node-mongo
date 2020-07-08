const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy

const User = require('../models/User.Model')

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, async (email, password, done) => {

    //Macth Email's User
    const user = await User.findOne({email})
    if (!user) {
        return done(null,false,{'message':'Not User Found'})
    } else {
        // Macth Password's user
        const macth = await user.macthPassword(password)
        if (macth) {
            return done(null,user)
        } else {
            return done(null,false,{'message':'Incorrect Password'})
        }
    }

}));

passport.serializeUser((user,done) => {
    done(null,user.id)
});

passport.deserializeUser((id,done) => {
    User.findById(id, (err,user) => {
        done(err,user)
    });
});

