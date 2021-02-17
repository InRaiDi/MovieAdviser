const express = require('express');
const morgan = require('morgan');
const compress = require('compression');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const session = require('express-session');
const config = require('./config.js');

module.exports = function(){

    const app = express();
    
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

    app.use(express.static('./public'));

    require('../app/routes/index.server.routes.js')(app);

    return app;
}