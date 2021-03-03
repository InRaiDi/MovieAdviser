
exports.render = function(req, res){
    res.render('homepage', {title:'Movies Website'});
}

exports.displayInfo = function (req, res) {

    var username = req.body.username;
    var session = req.session;
    session.username = username;
    console.log("username: " + session.username);
    
}; 

