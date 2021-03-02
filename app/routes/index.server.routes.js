//this function handles routing of requests
module.exports = function (app) {
   var index = require('../controllers/index.server.controller');
   var user = require('../controllers/user.server.controller');
   app.get('/', function(req,res){
    res.render('homepage', {title:'Movies Website'});
   });
   app.get('/movie-details', function(req,res){
    res.render('movie-details', {title:'Movie Details'});
   });
   
   app.get('/registration', function(req,res){
      res.render('registration', {title:'Registration'});
     });

   app.post('/registration', user.register);

   app.get('/login', function(req,res){
      res.render('login', {title:'Log In'});
     });



};
