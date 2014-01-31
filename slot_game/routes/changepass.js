
/*
 * GET profile page.
 */

exports.changepass = function(req, res){
    if(!req.session.isLogged)
    {
        res.redirect('/');
        return;
    }

    if(req.method == "GET")
    {
        var msg = req.session.msg ? req.session.msg : '';
        req.session.msg = '';
        res.render('changepass', {
            title: 'Change password',
            username : req.session.username,
            msg: msg,
        });
    }
    else if(req.method == "POST")
    {
        var lock = 1;
        var numRows;

        var callbackChangeUserPass = function(err, results)
        {
            numRows = results.affectedRows;
            console.log(numRows);
            lock -= 1;
            if (lock === 0)
            {
              finishRequest();
            }
        }

        var finishRequest = function()
        {
            req.session.msg = numRows ? "Password changed successfully" : "Wrong password";
            res.redirect('/changepass');
            return;
        }

        var userModel = require('../models/user').user;
        var user = new userModel(); 
        user.changeUserPassword(req.session.userId,req.body.oldPass,req.body.newPass, callbackChangeUserPass); 
    }
    
    
    
    
};