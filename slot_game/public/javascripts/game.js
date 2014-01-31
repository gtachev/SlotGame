//// Game class
var Game = function()
{
    this.stakes = [1, 2, 5, 10, 20, 50, 100];
    this.currentStakeIndex = 1;
    this.currentStake = 2;
    this.currentBalance = 0;
    this.gameRunning = false;
    this.autoGame = 0;
    this.gameSpeed = 20; // general time changer the less the value the faster. default 20
    this.rillLengthNum = 20; // general rill counter

    this.createStartRandomRillsBoxes();
    this.updateBetInfo();
    this.currentBalance = this.getBalanceInfo();
    this.token = this.getToken();

    //var self = this;
    $('#btnStakeUp').click(this.stakeUp.bind(this));
    $('#btnStakeDown').click(this.stakeDown.bind(this));
    $('#btnSpinAuto').click(this.runAutoGame.bind(this));
    $("#btnSpin").click(this.requireGameStart.bind(this));
}

// static function getInstance
Game.getInstance = function( )
{
    if (!Game._instance) {
        Game._instance = new Game();
    }
    return Game._instance;
}


Game.prototype.stakeUp = function()
{
    var stakesLen = this.stakes.length;
    if (stakesLen > this.currentStakeIndex + 1)
    {
        this.currentStakeIndex++;
        this.currentStake = this.stakes[this.currentStakeIndex];
        this.updateBetInfo();
    }
}
Game.prototype.stakeDown = function()
{
    if (this.currentStakeIndex > 0)
    {
        this.currentStakeIndex--;
        this.currentStake = this.stakes[this.currentStakeIndex];
        this.updateBetInfo();
    }
}
Game.prototype.updateBetInfo = function()
{
    $("#betInfo span").text(this.currentStake);
}

Game.prototype.startBet = function(data)
{
    var responseObj = JSON.parse(data);
    this.addTopRillsBoxes(responseObj.symbols);
    this.removeBottomRillsBoxes();
    this.animateRills(0, responseObj.win);
}

Game.prototype.animateRills = function(rillNum, win)
{
    var self = this;
    $('.rillSider:eq(' + rillNum + ')').animate({
        top: '-=10'
    }, self.gameSpeed*10, function() {
        if (rillNum < 4)
            self.animateRills(rillNum + 1, win);
    }).animate({
        top: '10'//'+=50',
    }, self.gameSpeed*150, function() {
        // finish animation
    }).animate({
        top: '0'//'+=50',
    }, self.gameSpeed*10, function() {
        if (rillNum === 4)
            self.finishRillsAnimation(win);
    });
}

Game.prototype.finishGame = function()
{
    this.gameRunning = false;
    if(this.autoGame > 0)
    {
        this.autoGame -= 1;
        this.setAutoGameMessage(this.autoGame);
        this.requireGameStart();
    }
}

Game.prototype.animateBalance = function(times)
{
    var self = this;
    if (times > 0)
    {
        this.currentBalance++;
        this.setBalanceInfo(this.currentBalance);
        setTimeout(function() {
            self.animateBalance(times - 1)
        }, self.gameSpeed*2);
    }
    else
    {
        this.finishGame();
    }
}

Game.prototype.finishRillsAnimation = function(win)
{
    win = parseInt(win);
    if (isNaN(win))
        win = 0;
    if (win > 0)
    {
        this.setUserMessage('You won ' + win);
        this.animateBalance(win);
    }
    else
    {
        this.setUserMessage('Try again');
        this.finishGame();
    }
}

Game.prototype.createStartRandomRillsBoxes = function()// at page load
{
    var numberToAdd = this.rillLengthNum + 4;
    $('.rillSider').each(function() {
        for (var i = 0; i < numberToAdd; i++)
        {
            var randNum = Math.floor((Math.random() * 10) + 1); // 1-10 including
            $(this).append('<div class="itemBox bg' + randNum + '"></div>');
        }
    });
}
Game.prototype.addTopRillsBoxes = function(arrSymbols)// on bet
{
    var numberToAdd = this.rillLengthNum;
    var currentSlider = 0;
    $('.rillSider').each(function() {
        for (var i = 0; i < numberToAdd; i++)
        {
            var randNum = Math.floor((Math.random() * 10) + 1); // 1-10 including
            if (i == numberToAdd - 2)
                randNum = arrSymbols[currentSlider];//add special symbols to 2nd positions
            $(this).prepend('<div class="itemBox bg' + randNum + '"></div>');
        }
        $(this).css('top', parseInt($(this).css('top')) - 140 * numberToAdd);
        currentSlider++;
    });
}
Game.prototype.removeBottomRillsBoxes = function()// on bet
{
    var numberToRemove = this.rillLengthNum;
    $('.rillSider').each(function() {
        for (var i = 0; i < numberToRemove; i++)
        {
            $(this).find('.itemBox:last-child').remove();
        }
    });
}

Game.prototype.requireGameStart = function()
{
    if (!this.gameRunning)
    {
        if (this.currentBalance >= this.currentStake)
        {
            this.setUserMessage('Good luck!');
            this.gameRunning = true;
            this.currentBalance -= this.currentStake;
            this.setBalanceInfo(this.currentBalance);
            $.post('bet' , { "bet": this.currentStake, "token": this.token }, this.startBet.bind(this));
        }
        else
        {
            this.setUserMessage('Not enough chips :(');
            this.finishGame();
        }
    }
}

Game.prototype.setUserMessage = function(msg)
{
    $('#additionalInfoBottom').text(msg);
}

Game.prototype.getBalanceInfo = function()
{
    return parseInt($('#infoBalance span').text());
}

Game.prototype.getToken = function()
{
    return ($('#token').val());
}

Game.prototype.setBalanceInfo = function(balance)
{
    $('#infoBalance span').text(balance);
}

Game.prototype.setAutoGameMessage = function(val)
{
    if(val > 0)
    {
        $('#btnSpinAuto p span').text(" x"+val);
    }
    else
    {
        $('#btnSpinAuto p span').text("");
    }
}

Game.prototype.runAutoGame = function()
{
    if(this.gameRunning)
    {
        this.autoGame += 3;
        this.setAutoGameMessage(this.autoGame);
    }
    else
    {
        this.autoGame += 2;
        this.setAutoGameMessage(this.autoGame);
        this.requireGameStart();
    }
    
}

$(function() {
    var GameInstance = Game.getInstance();
});


