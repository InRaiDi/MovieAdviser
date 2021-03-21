
const adminPage = function(req, res){
    
    res.render('admin-panel/index', {title:'Admin Panel', userLogged: req.user});

}

module.exports = {"adminPage": adminPage};