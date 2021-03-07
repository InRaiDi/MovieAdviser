const User = require('mongoose').model('User');
const bcrypt = require('bcrypt');

//adding new user to DB
exports.register = function( req, res, next){
    const user = new User(req.body);
    
    bcrypt.genSalt(10,(err,salt)=> 
            bcrypt.hash(user.password,salt,
                (err,hash)=> {
                    if(err) throw err;
                        //save pass to hash
                        user.password = hash;
                        
    
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
}));
};
