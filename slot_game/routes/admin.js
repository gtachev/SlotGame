
/*
 * GET and POST admin pages.
 */

exports.admin = function(req, res){
    
    if(req.session.username !== 'admin') // user admin only
    {
        res.redirect('/');
        return;
    }

    var newsModel = require('../models/news').news;
    var news = new newsModel();

    if(req.method == "GET")
    {
        var lock = 1;
        var currentNews;

        var callbackNews = function(err, results)
        {
            currentNews = results;

            lock -= 1;
            if (lock === 0) {
              finishRequest();
            }
        }
        
        var finishRequest = function()
        {
            res.render('admin', {
                title: 'Admin page',
                news: currentNews,
                username : req.session.username,
                //isLogged: req.session.isLogged
            });
        }
        news.getNews(callbackNews);
    }
    else if(req.method == "POST")
    {
        var callbackAddNews = function()
        {
            res.redirect('/admin');
            return;
        }
        var callbackDeleteNews = function()
        {
            news.addNews(req.body.news,callbackAddNews);
        }
        news.deleteNews(callbackDeleteNews);
    }
    
    
};