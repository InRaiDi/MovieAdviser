
const adminPage = function(req, res){
    
    res.render('partials/admin-panel', {title:'Admin Panel', userLogged: req.user});

}

module.exports = {"adminPage": adminPage};