
/*
 * GET game page.
 */

exports.game = function(req, res){
    if(!req.session.isLogged)
    {
        res.redirect('/');
        return;
    }
    
    var lock = 1;
    var userId = req.session.userId;
    var chips;
    var username = req.session.username;

    var callbackUserInfo = function(err, results) {
        chips = results[0].chips;

        lock -= 1;
        if (lock === 0) {
          finishRequest();
        }
    }
    var userModel = require('../models/user').user;
    var user = new userModel(); 
    user.getUserInfo(userId, callbackUserInfo);
    
    var finishRequest = function() {
        res.render('game', {
            title: 'GT slot game',
            chips: chips,
            token: req.session.token,
            username: username
        });
    }
    
    
};