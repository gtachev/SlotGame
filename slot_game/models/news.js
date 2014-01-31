
var con = require('../models/connection');

var NodeCache = require( "node-cache" );
var myCache = new NodeCache();

exports.news = (function(){
    
    var connection;
    // private vars here
    var News = function()
    {
      connection = con.connection;
    }
    
    News.prototype.getNews = function(callback)
    {
        //var sql    = "SELECT * FROM news WHERE 1 ";
        //connection.query(sql,callback);

        myCache.get( "myNewsKey", function( err, value ) {

            if( !err && Object.keys(value).length ) {
                //console.log("without sql");
                callback(err,value.myNewsKey);    
            }
            else {
                //console.log("with sql");
                var sql    = "SELECT * FROM news WHERE 1 ";
                connection.query(sql,function(err, results){
                    myCache.set( "myNewsKey", results, 60, function(){ callback(err,results); } )
                });
            }
        });

    }

    News.prototype.deleteNews = function(callback)
    {
        var sql    = "DELETE FROM news WHERE 1 ";
        connection.query(sql,callback);
    }

    News.prototype.addNews = function(news,callback)
    {
        var sql    = "INSERT INTO news (`text`) VALUES ";
        for(var i = 0; i<news.length; i++)
        {
            sql += "("+connection.escape(news[i])+")";
            if(i === news.length-1)
            {
                sql += ";";
            }
            else
            {
                sql += ",";
            }
        }
        connection.query(sql,callback);
    }
    
    return News;
})();

