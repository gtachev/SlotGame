
var con = require('../models/connection');

exports.user = (function(){
    
    var connection;
    // private vars here
    var User = function()
    {
      connection = con.connection;
    }
    
    User.prototype.hashUserPassword = function(pass)
    {
        var saltPrefix = 'qedofamsd masd ;mlasdf;ma lsfmzxcvz;lxf{} "|:|??|> (& ()^)^$%^&%* 09870709';
        var saltPostfix = '()_+())_(^78$*$*%HJLkj;lfas; ;akjlsdjj;lmvmzlasjlq@#$%GSRGSDG]';
        var crypto = require('crypto');
        var shasum = crypto.createHash('sha1');
        shasum.update(saltPrefix + pass + saltPostfix);
        var hashedPass = (shasum.digest('hex'));
        return hashedPass;
    }
    
    User.prototype.checkIsUsernameAvailable = function(username, callback)
    {
        var sql = "SELECT id FROM users WHERE `username` = " + connection.escape(username) + "";
        connection.query(sql, callback);
    }

    User.prototype.registerUser = function(username, password, callback)
    {
        password = this.hashUserPassword(password);
        var sql    = "INSERT INTO users set `username` = " + connection.escape(username) + "";
        sql += ", `password` = "+ connection.escape(password) + "";
        sql += ", `chips` = '1000'";
        connection.query(sql, callback);
    }
    
    User.prototype.loginUser = function(username, password, callback)
    {
        password = this.hashUserPassword(password);
        var sql    = "SELECT id FROM users WHERE `username` = " + connection.escape(username) + "";
        sql += "AND `password` = "+ connection.escape(password) + "";
        connection.query(sql, callback);
    }
    
    User.prototype.getUserInfo = function(id, callback)
    {
        var sql    = "SELECT username,chips FROM users WHERE `id` = " + connection.escape(id);
        connection.query(sql,callback);
    }

    User.prototype.increaseChips = function(id, sum)
    {
        var sql = "UPDATE users SET chips = chips + "+connection.escape(sum)+" where id = "+connection.escape(id);
        connection.query(sql);
    }

    User.prototype.decreaseChips = function(id, sum)
    {
        var sql = "UPDATE users SET chips = chips - "+connection.escape(sum)+" where id = "+connection.escape(id);
        connection.query(sql);
    }

    User.prototype.resetUserChips = function(id,callback)
    {
        var sql    = "UPDATE users SET `chips` =  '1000'  WHERE `id` = " + connection.escape(id);
        connection.query(sql,callback);
    }

    User.prototype.changeUserPassword = function(id, oldPassword, newPassword, callback)
    {
        var oldPass = this.hashUserPassword(oldPassword);
        var newPass = this.hashUserPassword(newPassword);
        var sql    = "UPDATE users SET `password` =  "+connection.escape(newPass);
        sql +="  WHERE `id` = " + connection.escape(id) + " AND `password` = " +connection.escape(oldPass);
        connection.query(sql,callback);
    }
    
    return User;
})();

