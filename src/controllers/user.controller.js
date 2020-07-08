const userCtrl = {}

const passport = require('passport')

const User = require('../models/User.Model')

userCtrl.renderSignupForm = (req, res) => {
    res.render('app/signup')
}

userCtrl.signup = async (req, res) => {
    const errors =[]
    const {name, email, password, confirm_password} = req.body
    if (password != confirm_password) {
        errors.push({'text': 'Password do not Match'})
    }
    if (password.length < 4) {
        errors.push({'text': 'Password must be at least charaters'})
    }
    if (errors.length > 0) {
        res.render('app/signup', {
            errors,
            name,
            email,
            password,
            confirm_password
        })
    }else{
        const emailUser = await User.findOne({email: email})
        if(emailUser){
            req.flash('error_msg','The email is already in use.')
            res.redirect('/app/signup')
        } else {
            const newUser = new User ({name, email, password})
            newUser.password = await newUser.encryptPassword(password)
            await newUser.save()
            req.flash('success_msg','You are registered')
            res.redirect('/app/signin')
        }
    }
}

userCtrl.renderSigninForm = (req, res) => {
    res.render('app/signin')
}

userCtrl.signin = passport.authenticate('local',{
    failureRedirect: '/app/signin',
    successRedirect: '/notes',
    failureFlash: true
})

userCtrl.logout = (req, res) => {
    req.logout();
    req.flash('success_msg','You are Logged out now')
    res.redirect('/app/signin')
}

module.exports = userCtrl;