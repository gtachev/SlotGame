
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , register = require('./routes/register')
  , login = require('./routes/login')
  , logout = require('./routes/logout')
  , profile = require('./routes/profile')
  , changepass = require('./routes/changepass')
  , admin = require('./routes/admin')
  , statistics = require('./routes/statistics')
  , game = require('./routes/game')
  , bet = require('./routes/bet')
  , http = require('http')
  , path = require('path');


var app = express();


//gt here
app.use(express.cookieParser('super secret for sessions asdf asdf'));
app.use(express.cookieSession());

var captcha = require('captcha'); // captcha
app.use(captcha({ url: '/captcha.jpg', color:'#0064cd', background: 'rgb(20,30,200)' })); // captcha params
//app.use(express.session());
//app.use(app.route);

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);

app.get('/register', register.register);
app.post('/register', register.register);

app.get('/login', login.login);
app.post('/login', login.login);

app.get('/logout', logout.logout);

app.get('/profile', profile.profile);
app.post('/profile', profile.profile);

app.get('/changepass', changepass.changepass);
app.post('/changepass', changepass.changepass);

app.get('/statistics', statistics.statistics);

app.get('/admin', admin.admin);
app.post('/admin', admin.admin);

app.get('/game', game.game);
app.post('/bet', bet.bet);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
