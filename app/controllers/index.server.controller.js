
const render = function(req, res){
    res.render('homepage', {title:'Movies Website'});
}

const displayInfo = function (req, res) {

    var username = req.body.username;
    var session = req.session;
    session.username = username;
    console.log("username: " + session.username);
    
}; 

module.exports = {"render": render, "displayInfo": displayInfo}