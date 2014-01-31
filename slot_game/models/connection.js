// https://npmjs.org/package/mysql

    
var mysql      = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'slot_game'
});

connection.connect();
exports.connection = connection;


//connection.end();


