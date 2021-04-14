let authorization = module.exports = {}

authorization.requireAdmin = async (req, res, next) => {

      let username = req.user && req.user.username
      let admin = "admin"

      if(username == admin){
        next();
      } else {
        res.redirect("/homepage");
      }
    }
  