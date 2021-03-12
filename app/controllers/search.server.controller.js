const Movies = require('../models/movies.server.model')

const searchPage = function(req, res){
    Movies.find({}, function (err, retobj) {
        let ret = {};
        ret.movies = retobj;
    res.render('advance-search', {title:'Advance Search', userLogged: req.user, data:ret});
    });
}

module.exports = {"searchPage": searchPage }