
/*
 * post bet page. gets a post parameter "bet"
 */

exports.bet = function(req, res){
    
    if(!req.session.isLogged)
    {
        return;
    }

    var output = {};
    
    //var bet = parseInt(req.params.bet); // if GET
    var bet = parseInt(req.body.bet); // POST
    if(isNaN(bet)) bet=0;

    var userModel = require('../models/user').user;
    var user = new userModel();
    var statisticsModel = require('../models/statistics').statistics;
    var statistics = new statisticsModel(); 


    var checkIsUserBallanceEnough = function()
    {
        user.getUserInfo(req.session.userId, callbackCheckBallanceEnough);
    }
    
    var callbackCheckBallanceEnough = function(err, results)
    {
        if(results[0].chips >= bet)
        {
            user.decreaseChips(req.session.userId, bet);
            calculateWin();
        }
        else
        {
            invalidBet();
        }
    }

    var winningAlgorithm = function(currentBet) // to do: fix this func
    {
        // basic win like this
        //var win = Math.floor(Math.random() * 1.8 * currentBet); // 1.8 for 90% RTP
        //return win;

        // actual winning algorithm
        // what symbols there are on the reels
          var reels = [
           [1,2,2,3,3,3,4,4,4,4,5,5,5,5,5,6,6,6,6,6,6,7,7,7,7,7,7,7,8,8,8,8,8,8,8,8,9,9,9,9,9,9,9,9,9,10,10,10,10,10,10,10,10,10,10],
           [1,2,2,3,3,3,4,4,4,4,5,5,5,5,5,6,6,6,6,6,6,7,7,7,7,7,7,7,8,8,8,8,8,8,8,8,9,9,9,9,9,9,9,9,9,10,10,10,10,10,10,10,10,10,10],
           [1,2,2,3,3,3,4,4,4,4,5,5,5,5,5,6,6,6,6,6,6,7,7,7,7,7,7,7,8,8,8,8,8,8,8,8,9,9,9,9,9,9,9,9,9,10,10,10,10,10,10,10,10,10,10],
           [1,2,2,3,3,3,4,4,4,4,5,5,5,5,5,6,6,6,6,6,6,7,7,7,7,7,7,7,8,8,8,8,8,8,8,8,9,9,9,9,9,9,9,9,9,10,10,10,10,10,10,10,10,10,10],
           [1,2,2,3,3,3,4,4,4,4,5,5,5,5,5,6,6,6,6,6,6,7,7,7,7,7,7,7,8,8,8,8,8,8,8,8,9,9,9,9,9,9,9,9,9,10,10,10,10,10,10,10,10,10,10]
          ];

          // how much each symbol wins
          var wins = {
           1: [ // symbol 1
            { symbols_num: 3, coef: 10000 },
            { symbols_num: 4, coef: 15000 },
            { symbols_num: 5, coef: 20000 }
           ],
           2: [ // symbol 2
            { symbols_num: 3, coef: 5000 },
            { symbols_num: 4, coef: 7500 },
            { symbols_num: 5, coef: 10000 }
           ],
           3: [ // symbol 3
            { symbols_num: 3, coef: 1000 },
            { symbols_num: 4, coef: 2000 },
            { symbols_num: 5, coef: 3000 }
           ],
           4: [ // symbol 4
            { symbols_num: 3, coef: 500 },
            { symbols_num: 4, coef: 1000 },
            { symbols_num: 5, coef: 1500 }
           ],
           5: [ // symbol 5
            { symbols_num: 3, coef: 200 },
            { symbols_num: 4, coef: 250 },
            { symbols_num: 5, coef: 300 }
           ],
           6: [ // symbol 6
            { symbols_num: 3, coef: 15 },
            { symbols_num: 4, coef: 20 },
            { symbols_num: 5, coef: 25 }
           ],
           7: [ // symbol 7
            { symbols_num: 3, coef: 10 },
            { symbols_num: 4, coef: 15 },
            { symbols_num: 5, coef: 20 }
           ],
           8: [ // symbol 8
            { symbols_num: 3, coef: 5 },
            { symbols_num: 4, coef: 10 },
            { symbols_num: 5, coef: 15 }
           ],
           9: [ // symbol 9
            { symbols_num: 3, coef: 1 },
            { symbols_num: 4, coef: 5 },
            { symbols_num: 5, coef: 10 }
           ],
           10: [ // symbol 10
            { symbols_num: 3, coef: 0.5 },
            { symbols_num: 4, coef: 1 },
            { symbols_num: 5, coef: 1.5 }
           ]
          };


        var rand = function(min, max)
        {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        var getCoefficient = function( positions )
        {
            var seq_length = 0,
            line_finished = false,
            line_symbols = null;

            for (var i = 0; i < positions.length; i++)
            {
                if (line_symbols === null)
                {
                    line_symbols = reels[i][positions[i]];
                    seq_length++;
                }
                else
                {
                    if (!line_finished && line_symbols === reels[i][positions[i]])
                    {
                        seq_length++;
                    }
                    else
                    {
                        line_finished = true;
                    }
                }
            }

           var symbWins = wins[line_symbols];
           var coef = 0;

           for (var i = 0; i < symbWins.length; i++)
           {
                if ( symbWins[i].symbols_num === seq_length )
                {
                    return symbWins[i].coef;
                }
           }

           return coef;
        }

        var getStopPositions = function()
        {
            var p = [];
            for (var i = 0; i < reels.length; i++)
            {
                p.push(rand(0, reels[i].length - 1));
            }
           return p;
        }

          

        var stopPositions = getStopPositions();
        output.symbols = [];
        for (var i = 0; i < stopPositions.length; i++)
        {
            output.symbols.push(reels[i][stopPositions[i]]  );
        }

        /*// testing on the server
        var testRTP = function( testTimes )
        {
           var totalCoef = 0;
           for (var i = 0; i < testTimes; i++)
           {
                totalCoef += getCoefficient( getStopPositions() );
           }
           //return Math.round((totalCoef / testTimes) * 10000) / 100;
           return (totalCoef / testTimes)*100;
        }
        console.log(testRTP(10000000));
        //  */

        // testing in front end
        //Game.getInstance().gameSpeed = 1;
        //Game.getInstance().autoGame = 1000;

        //console.log(reels);
        //console.log(stopPositions);
        //console.log(output.symbols);
        return ( getCoefficient(stopPositions) * currentBet );
        
    }

    var calculateWin = function()
    {
        var win = winningAlgorithm(bet);
        if(win > 0)
        {
            user.increaseChips(req.session.userId, win);
        }
        statistics.addStatistics(req.session.userId,bet,win);
        output.win = win;
        // output.symbols = [1,2,3,4,5];
        finishRequest();
    }

    var invalidBet = function()
    {
        output.win = 0;
        output.symbols = [1,2,3,4,5];
        finishRequest();
    }

    var finishRequest = function()
    {
        res.send(JSON.stringify(output));
        //res.render('login', { title: 'Login here' });
    }

    if(bet > 0 && bet <= 100 && req.session.token == req.body.token)
    {
        checkIsUserBallanceEnough();
    }
    else
    {
        invalidBet();
    }
  
};
