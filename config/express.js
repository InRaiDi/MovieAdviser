const express = require('express');
const morgan = require('morgan');
const compress = require('compression');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const session = require('express-session');
const config = require('./config.js');
const passport = require('passport');
const flash = require('connect-flash');


module.exports = function(){

    const app = express();

    require('./passport.js')(passport);
    
    if(process.env.NODE_ENV === 'development'){
        console.log("Running in development environment");
        app.use(morgan('dev'));
    }
    else if(process.env.NODE_ENV==='production'){
        console.log("Running in production enviroment");
        app.use(compress());
    }

    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());
    app.use(methodOverride());

    app.set('views', './app/views');
    app.set('view engine', 'ejs');
    app.engine('html', require('ejs').renderFile);

    app.use(session({
        saveUninitialized:true,
        resave: true,
        secret: config.sessionSecret
    }));

    app.use(passport.initialize());
    app.use(passport.session());

    app.use(flash());
    app.use((req,res,next)=> {
        res.locals.success_msg = req.flash('success_msg');
        res.locals.error_msg = req.flash('error_msg');
        res.locals.error  = req.flash('error');
    next();
    })
    
    app.use(express.static('./public'));

    require('../app/routes/index.server.routes.js')(app);
    require('../app/routes/admin.server.routes.js')(app);
    app.use(function(req,res,next){
        res.status(404).render('404', {title:'not found', userLogged: req.user});
        res.end('Cannot ' + req.method + ' ' + req.url);
     });

    return app;
}