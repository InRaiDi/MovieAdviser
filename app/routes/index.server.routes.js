//this function handles routing of requests
module.exports = function (app) {
   var index = require('../controllers/index.server.controller');

   app.get('/', function(req,res){
    res.render('homepage', {title:'Login Page'});
   });

   

};
