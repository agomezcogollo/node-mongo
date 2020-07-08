const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const morgan = require('morgan');
const Handlebars = require('handlebars');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const bodyParser   = require('body-parser');

//Inicializacion
const app = express();
require('./config/passport')

//Configuracion
app.set('port', process.env.PORT || 4000)
app.set('views', path.join(__dirname, 'views') )
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join( app.get('views'), 'layouts' ),
    partialsDir: path.join( app.get('views'), 'partials' ),
    extname: '.hbs',
    handlebars: allowInsecurePrototypeAccess(Handlebars)
}))
app.set('view engine','.hbs')

//Middlewares
app.use(morgan('dev'))
app.use( express.urlencoded({extended: false}) )
app.use(bodyParser.urlencoded({extended: false}));
app.use(methodOverride('_method'))
app.use(session({
    secret: 'secretsession',
    resave: true,
    saveUninitialized: true,
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

//Variables Globales
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg')
    res.locals.error_msg = req.flash('error_msg')
    res.locals.error = req.flash('error')
    res.locals.user = req.user || null
    next()
})

//Rutas
app.use(require('./routes/index.routes'))
app.use(require('./routes/notes.routes'))
app.use(require('./routes/user.routes'))

//Archivos Estaticos
app.use(express.static(path.join(__dirname, 'public')))

//Export
module.exports = app;