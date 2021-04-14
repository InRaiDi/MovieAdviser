
const movie = require("../models/movies.server.model");
const adminPage = function(req, res){

    movie.find({}, function (err, retobj) {
        let ret = {};
        ret.movies = retobj;
    res.render('admin-panel/index', {title:'Admin Panel', userLogged: req.user, data:ret});
    });
  
    //res.render('admin-panel/index', {title:'Admin Panel', userLogged: req.user});

}

module.exports = {"adminPage": adminPage};