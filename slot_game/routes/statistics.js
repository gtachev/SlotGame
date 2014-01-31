
/*
 * GET and POST admin pages.
 */

exports.statistics = function(req, res){
    
    if(req.session.username !== 'admin') // user admin only
    {
        res.redirect('/');
        return;
    }

    var statisticsModel = require('../models/statistics').statistics;
    var statistics = new statisticsModel();

    var lock = 1;
    var currentStatistics;

    var callbackStatistics = function(err, results)
    {
        currentStatistics = results;

        lock -= 1;
        if (lock === 0) {
          finishRequest();
        }
    }
    
    var finishRequest = function()
    {
        res.render('statistics', {
            title: 'Admin page',
            statistics: currentStatistics,
            username : req.session.username,
            //isLogged: req.session.isLogged
        });
    }
    statistics.getStatistics(callbackStatistics);
    
    
};