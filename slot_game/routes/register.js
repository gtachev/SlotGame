
/*
 * GET register page.
    req.params.password get
    req.body.password post
 */

exports.register = function(req, res){
    
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
        res.render('register', { title: 'Register here', error: error });
    }
    else if(req.method == "POST")
    {
        var lock = 1;
        var username = req.body.username;
        var password = req.body.password;
        var insertedId;
        //console.log(req.session.captcha);
        
        var callbackRegister = function(err, results) {
            //console.log("Last inserted user id: " + results.insertId);
            insertedId = results.insertId;
          
            lock -= 1;
            if (lock === 0)
            {
              finishRequest();
            }
        }
        var callbackCheckUsername = function(err, results){
            if(results.length)
            {
                req.session.error = 'Username is already in use';
                res.redirect('/register');
                return;
            }
            else
            {
                user.registerUser(username, password, callbackRegister);
            }
        }
        var checkCaptcha = function() {
            if(req.session.captcha != req.body.captcha)
            {
                req.session.error = 'Captcha value is wrong';
                res.redirect('/register');
                return;
            }
            else
            {
                user.checkIsUsernameAvailable(username,callbackCheckUsername);
            }
        }
        var userModel = require('../models/user').user;
        var user = new userModel(); 
        checkCaptcha();
        //user.registerUser(username, password, callbackRegister);
        
    }
    
    
    var finishRequest = function() {
        //res.send("user is " + username + " password is " + password + " id is " + insertedId);
        req.session.isLogged = true;
        req.session.username = username;
        req.session.userId = parseInt(insertedId);
        req.session.token = Math.random();
        //console.log(req.session);
        res.redirect('/');
    }
    
  
};