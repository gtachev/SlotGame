
var con = require('../models/connection');

exports.statistics = (function(){
    
    var connection;
    // private vars here
    var Statistics = function()
    {
      connection = con.connection;
    }
    
    // not used yet
    Statistics.prototype.getUserStatisticsByUserId = function(id, callback)
    {
        var sql    = "SELECT * FROM statistics WHERE `user_id` = " + connection.escape(id);
        connection.query(sql,callback);
    }

    Statistics.prototype.addStatistics = function(user_id, bet, win)
    {
        var sql = "INSERT INTO  `slot_game`.`statistics` (`user_id` ,`bet` ,`win` ,`date`)";
        sql += "VALUES (  "+connection.escape(user_id)+",  "+connection.escape(bet)+",  "+connection.escape(win)+",  NOW());";
        connection.query(sql,function(){});
    }

    Statistics.prototype.getStatistics = function(callback)
    {
        //var sql    = "SELECT statistics.bet, statistics.win, statistics.date, users.username FROM  `statistics`";
        //sql +=" LEFT JOIN users ON statistics.user_id = users.id WHERE 1 ";
        var sql = 'SELECT ';
        sql += 'COUNT(statistics.user_id) AS number_bets,';
        sql += 'SUM(statistics.win) as win,';
        sql += 'SUM(statistics.bet) as bet,';
        sql += 'MAX(statistics.date) as last_game,';
        sql += 'MIN(statistics.date) as first_game,';
        sql += 'users.username,';
        sql += 'users.chips as current_chips';
        sql += ' FROM `statistics` ';
        sql += ' LEFT JOIN users ON statistics.user_id=users.id';
        sql += ' GROUP BY statistics.user_id;';
        //console.log(sql);
        connection.query(sql,callback);
    }

    Statistics.prototype.getUserStatistics = function(id,callback)
    {
        var sql = 'SELECT ';
        sql += 'COUNT(statistics.user_id) AS number_bets,';
        sql += 'SUM(statistics.win) as win,';
        sql += 'SUM(statistics.bet) as bet,';
        sql += 'MAX(statistics.date) as last_game,';
        sql += 'MIN(statistics.date) as first_game,';
        sql += 'users.username,';
        sql += 'users.chips as current_chips';
        sql += ' FROM `statistics` ';
        sql += ' LEFT JOIN users ON statistics.user_id=users.id';
        sql += ' WHERE users.id = '+ connection.escape(id);
        connection.query(sql,callback);
    }

    // not used
    Statistics.prototype.deleteUserStatistics = function(id,callback)
    {
        var sql    = "DELETE from `statistics` WHERE `user_id` = " + connection.escape(id);
        connection.query(sql,callback);
    }
    
    return Statistics;
})();

