const User = require('mongoose').model('User');

//adding new user to DB
exports.register = function( req, res, next){
    const user = new User(req.body);
    console.log(user);
    user.save((err) =>{
        if(err){
        return next(err);
    } 
    else{
        res.render('registration', {
            title: 'Index',
        });
    }
    });
};
