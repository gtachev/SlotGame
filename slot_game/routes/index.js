
/*
 * GET home page.
 */

exports.index = function(req, res){
    
    var lock = 1;
    //var userId = req.session.userId;
    //var username = req.session.username;
    var currentNews;

    var finishRequest = function() {
        //console.log(req.session.token);
        res.render('index', {
            title: 'Welcome to GT Slot game home!',
            //chips: chips,
            //username: username,
            news: currentNews,
            username : req.session.username,
            isLogged: req.session.isLogged
        });
    }

    var callbackNews = function(err, results) {
        //chips = results[0].chips;
        currentNews = results;

        lock -= 1;
        if (lock === 0) {
          finishRequest();
        }
    }
    var newsModel = require('../models/news').news;
    var news = new newsModel(); 
    news.getNews(callbackNews);
    
    
    
};