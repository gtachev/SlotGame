
/*
 * GET logout page
    req.params.password get
    req.body.password post
 */

exports.logout = function(req, res){

    //var userModel = require('../models/user').user;
    //var user = new userModel(); 
    //user.loginUser(req.body.username, req.body.password);
    //require('../models/connection').connection.end();
    req.session.isLogged = false;
    req.session.username = undefined;
    req.session.userId = undefined;
    req.session.token = undefined;
    //console.log(req.session);
    res.redirect('/');

};