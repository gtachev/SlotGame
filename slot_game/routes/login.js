
/*
 * GET login page.
    req.params.password get
    req.body.password post
 */

exports.login = function(req, res){
    
    if(req.session.isLogged === true)
    {
        res.redirect('/');
        return;
    }
    
    if(req.method == "GET")
    {
        var error = req.session.error;
        if(error == undefined) error = '';
        req.session.error = '';
        res.render('login', { title: 'Login here', error: error });
    }
    else if(req.method == "POST")
    {
        
        var lock = 1;
        var username = req.body.username;
        var password = req.body.password;
        var userId;
        
        
        var callbackLogin = function(err, results) {
            if(results.length)
            {
                //console.log("Logged user id is:" + results[0].id);
                userId = results[0].id
                lock -= 1;
                if (lock === 0) {
                  finishRequest();
                }
            }
            else
            {
                req.session.error = 'Wrong username or password';
                res.redirect('/login');
            }
                
        }
        var userModel = require('../models/user').user;
        var user = new userModel(); 
        user.loginUser(username, password, callbackLogin);
    }
    
    var finishRequest = function() {
        //res.send("user is " + username + " password is " + password );
        req.session.isLogged = true;
        req.session.username = username;
        req.session.userId = parseInt(userId);
        req.session.token = Math.random();
        //console.log(req.session);
        res.redirect('/');
    }
    
  
};