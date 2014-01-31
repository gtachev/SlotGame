
/*
 * GET profile page.
 */

exports.profile = function(req, res){
    if(!req.session.isLogged)
    {
        res.redirect('/');
        return;
    }

    if(req.method == "GET")
    {
        var lock = 1;
        var statisticsData;

        var callbackUserInfo = function(err, results) {
            statisticsData = results[0];
            lock -= 1;
            if (lock === 0)
            {
              finishRequest();
            }
        }

        var finishRequest = function() {
            res.render('profile', {
                title: 'My profile',
                statisticsData: statisticsData,
                username: req.session.username,
                token: req.session.token
            });
        }

        var statisticsModel = require('../models/statistics').statistics;
        var statistics = new statisticsModel();
        statistics.getUserStatistics(req.session.userId,callbackUserInfo);
        
        
    }
    else if(req.method == "POST")
    {
        if(req.session.token != req.body.token)
        {
            res.redirect('/profile');
            return;
        }

        var lock = 1; // change to 2 if also reset statistics

        var callbackResetUserChips = function(err, results)
        {
            lock -= 1;
            if (lock === 0)
            {
              finishRequest();
            }
        }

        var callbackDeleteUserStatistics = function(err, results)
        {
            lock -= 1;
            if (lock === 0)
            {
              finishRequest();
            }
        }

        var finishRequest = function()
        {
            res.redirect('/profile');
            return;
        }

        // reset profile
        var userModel = require('../models/user').user;
        var user = new userModel(); 
        user.resetUserChips(req.session.userId, callbackResetUserChips);
        // don't reset statistics
        //var statisticsModel = require('../models/statistics').statistics;
        //var statistics = new statisticsModel();
        //statistics.deleteUserStatistics(req.session.userId,callbackDeleteUserStatistics);
    }
    
    
    
    
};