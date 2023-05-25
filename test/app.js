function createFields() {
    $('#grid #timer').remove();
    $('#grid').removeClass('currentgrid').addClass('currentgrid').append('<div id="timer"></div>');
    $('#timer').html('<div id="top"></div><div id="right"></div><div id="bottom"></div><div id="left"></div>');
    $('#grid .result').removeClass('red blue white').css('display', 'none');
    $('.container').addClass('playable current').html('<div class="field"><div class="result"><div class="info"></div></div><div class="square"></div><div class="square"></div><div class="square"></div><div class="square"></div><div class="square"></div><div class="square"></div><div class="square"></div><div class="square"></div><div class="square"></div></div>').css({
        'outline': 'none'
    });
    $('.square').html('<div></div>');
    fieldSetup($('.container'));
}
//createFields();

var num = 0;
var turnTime = 15;
var paused = false;
var playerArray;
var randomNumber;
var currentPlayer;
var otherPlayer;

function fieldSetup(thisContainer) {
    num++;
    //console.log(num);
    playerArray = [
        'red',
        'blue'];
    randomNumber = Math.floor(Math.random() * playerArray.length);
    currentPlayer = playerArray[randomNumber];
    //nextPlayer();

    setSize();
    thisContainer.find('.result').css({
        display: 'none'
    });
    thisContainer.find('.square').css({
        'backgroundColor': '#f2f2f2'
    });
    thisContainer.find('.square').addClass('clickable');
    thisContainer.find('.square').removeClass('red');
    thisContainer.find('.square').removeClass('blue');
    nextPlayer();
}
//fieldSetup($('.container'));

function nextPlayer() {
    if (currentPlayer == 'red') {
        currentPlayer = 'blue';
        otherPlayer = 'red';
    } else {
        currentPlayer = 'red';
        otherPlayer = 'blue';
    }
    if ($('#grid').hasClass('currentgrid')) {
        $('#grid.currentgrid').css('outline', '1px solid ' + currentPlayer);
    } else {
        $('.container.current').css('outline', '1px solid ' + currentPlayer);
    }
    timer();
}

function timer() {
    /*var counter = { var: 0 };
    TweenMax.to(counter, 5, {
        var: 100, 
        onUpdate: function () {
            console.log(Math.ceil(counter.var));
        },
        ease:Linear.easeNone
    });*/
    totalTime = turnTime;
    if (turnTime == 4) {
        $('#timer').hide();
    } else {
        $('#timer').show();
        if (!$('#grid').hasClass('currentgrid')) {
            $('.container.current').append($('#timer'));
        } else {
            $('#grid').append($('#timer'));
        }
        if (currentPlayer == "red") {
            lineColor = "blue";
        } else {
            lineColor = "red";
        }
        //$('#timer div').css({background:lineColor});
        TweenMax.killTweensOf("#timer #top, #timer #right, #timer #bottom, #timer #left");
        TweenMax.to($('#timer #top'), totalTime / 4, {
            width: '100%',
            startAt: {
                width: '0px'
            },
            immediateRender: true,
            ease: Linear.easeNone
        });
        TweenMax.to($('#timer #right'), totalTime / 4, {
            height: '100%',
            startAt: {
                height: '0px'
            },
            immediateRender: true,
            ease: Linear.easeNone,
            delay: totalTime / 4
        });
        TweenMax.to($('#timer #bottom'), totalTime / 4, {
            width: '100%',
            startAt: {
                width: '0px'
            },
            immediateRender: true,
            ease: Linear.easeNone,
            delay: (totalTime / 4) * 2
        });
        TweenMax.to($('#timer #left'), totalTime / 4, {
            height: '100%',
            startAt: {
                height: '0px'
            },
            immediateRender: true,
            ease: Linear.easeNone,
            delay: (totalTime / 4) * 3,
            onComplete: timeup
        });
    }
}

function timeup() {
    $('#main').prepend('<div id="timeup"><div class="content"><h1>Too late</h1><h3>Next up is player <font color="'+otherPlayer+'">' + otherPlayer + '</font></h3><div id="nextplayer">Continue</div></div></div>');
    /*$('#timeup').css({
        background: currentPlayer
    });*/
    //nextPlayer();
}
$('#main').on('click', '#nextplayer', function () {
    nextPlayer();
    $('#timeup').remove();
});

function checkGrid() {
    var winArr = ['1,2,3', '4,5,6', '7,8,9', '1,4,7', '2,5,8', '3,6,9', '1,5,9', '3,5,7'];
    for (var i = 0; i < winArr.length; i++) {
        //console.log('>> '+winArr[i]);
        winSeq = winArr[i].split(',');
        //console.log(winSeq[0]);
        var arr = new Array();
        for (var j = 0; j < winSeq.length; j++) {
            trgt = $('.container').eq(winSeq[j] - 1);
            arr.push(trgt.find('.result').attr('class').split(' ')[1]);
        }
        //console.log(arr[0]+','+arr[1]+','+arr[2]);
        if (arr[0] != undefined && arr[0] == arr[1] && arr[0] == arr[2]) {
            console.log('result: ' + arr[0]);
            $('#grid > .result').addClass(arr[0]).css({
                display: 'inherit',
                    'backgroundColor': arr[0]
            });
        } else if (arr[0] != undefined && arr[1] != undefined && arr[2] != undefined) {
            trgt.removeClass('playable');
        }
    }
    if ($('.container').hasClass('playable')) {

    } else {
        $('#grid > .result').addClass('white').css({
            display: 'inherit',
                'backgroundColor': 'white'
        });
    }
}
//checkGrid();

function checkField(thisField) {
    //console.log('thisField: ' + thisField.attr('id'));
    //console.log('class: ' + thisField.find('.square').eq(0).hasClass('blue'));
    if ((thisField.find('.square').eq(0).hasClass('blue') && thisField.find('.square').eq(1).hasClass('blue') && thisField.find('.square').eq(2).hasClass('blue')) || (thisField.find('.square').eq(3).hasClass('blue') && thisField.find('.square').eq(4).hasClass('blue') && thisField.find('.square').eq(5).hasClass('blue')) || (thisField.find('.square').eq(6).hasClass('blue') && thisField.find('.square').eq(7).hasClass('blue') && thisField.find('.square').eq(8).hasClass('blue')) || (thisField.find('.square').eq(0).hasClass('blue') && thisField.find('.square').eq(3).hasClass('blue') && thisField.find('.square').eq(6).hasClass('blue')) || (thisField.find('.square').eq(1).hasClass('blue') && thisField.find('.square').eq(4).hasClass('blue') && thisField.find('.square').eq(7).hasClass('blue')) || (thisField.find('.square').eq(2).hasClass('blue') && thisField.find('.square').eq(5).hasClass('blue') && thisField.find('.square').eq(8).hasClass('blue')) || (thisField.find('.square').eq(0).hasClass('blue') && thisField.find('.square').eq(4).hasClass('blue') && thisField.find('.square').eq(8).hasClass('blue')) || (thisField.find('.square').eq(2).hasClass('blue') && thisField.find('.square').eq(4).hasClass('blue') && thisField.find('.square').eq(6).hasClass('blue'))) {
        //console.log('blue won');
        thisField.find('.result .info').html('<h1>Blue won!</h1><h3><a href="#" id="retryLink">Retry</a></h3>');
        thisField.find('.result').css({
            display: 'inherit',
                'backgroundColor': '#0000ff'
        }).addClass('blue');
        thisField.removeClass('playable');
        checkGrid();
    } else if ((thisField.find('.square').eq(0).hasClass('red') && thisField.find('.square').eq(1).hasClass('red') && thisField.find('.square').eq(2).hasClass('red')) || (thisField.find('.square').eq(3).hasClass('red') && thisField.find('.square').eq(4).hasClass('red') && thisField.find('.square').eq(5).hasClass('red')) || (thisField.find('.square').eq(6).hasClass('red') && thisField.find('.square').eq(7).hasClass('red') && thisField.find('.square').eq(8).hasClass('red')) || (thisField.find('.square').eq(0).hasClass('red') && thisField.find('.square').eq(3).hasClass('red') && thisField.find('.square').eq(6).hasClass('red')) || (thisField.find('.square').eq(1).hasClass('red') && thisField.find('.square').eq(4).hasClass('red') && thisField.find('.square').eq(7).hasClass('red')) || (thisField.find('.square').eq(2).hasClass('red') && thisField.find('.square').eq(5).hasClass('red') && thisField.find('.square').eq(8).hasClass('red')) || (thisField.find('.square').eq(0).hasClass('red') && thisField.find('.square').eq(4).hasClass('red') && thisField.find('.square').eq(8).hasClass('red')) || (thisField.find('.square').eq(2).hasClass('red') && thisField.find('.square').eq(4).hasClass('red') && thisField.find('.square').eq(6).hasClass('red'))) {
        //console.log('red won');
        thisField.find('.result .info').html('<h1>Red won!</h1><h3><a href="#" id="retryLink">Retry</a></h3>');
        thisField.find('.result').css({
            display: 'inherit',
                'backgroundColor': '#ff0000'
        }).addClass('red');
        thisField.removeClass('playable');
        checkGrid();
    } else if (!thisField.find('.square').hasClass('clickable')) {
        thisField.find('.result .info').html('<h1>It\'s a tie!</h1><h3><a href="#" id="retryLink">Retry</a></h3>');
        thisField.find('.result').css({
            display: 'inherit'
        }).addClass('white');
        thisField.removeClass('playable');
        checkGrid();
    }
    nextPlayer();
}

$('#grid').on('click', '.square', function () {
    if ($(this).hasClass('clickable') && $(this).parent().parent().hasClass('current')) {
        if (!$(this).hasClass('red') && !$(this).hasClass('blue')) {
            $(this).removeClass('clickable');
            TweenLite.set($(this), {
                css: {
                    className: '+=' + currentPlayer
                }
            });
            TweenMax.to($(this), 0.2, {
                //backgroundColor: currentPlayer
            });
            //TweenMax.
            checkField($(this).parent().parent());
        }
        /*if() {
                
            }*/
        clickNum = $(this).index();
        if ($('.container').eq(clickNum - 1).hasClass('playable')) {
            $('#grid').removeClass('currentgrid').css({
                'outline': 'none'
            });
            $('.container').removeClass('current').css({
                'outline': 'none',
                    'z-index': 1
            });
            $('.container').eq(clickNum - 1).addClass('current').css({
                'outline': '1px solid ' + currentPlayer,
                    'z-index': 9
            });
        } else {
            $('#grid').addClass('currentgrid').css({
                'outline': '1px solid ' + currentPlayer
            });
            $('.container').removeClass('current').addClass('current').css({
                'outline': 'none',
                    'z-index': 1
            });
        }
        /*checkField($(this).parent().parent());
        }*/
        timer();
    }
});
var count = 0;
/*$('#result, #retryLink').on('click', function () {
    count++;
    console.log('count: ' + count);
    num = 0;
    fieldSetup($(this).parent().parent());
    return false;
});*/
$('#grid > .result').on('click', function () {
    num = 0;
    createFields();
    return false;
});

function setSize() {
    var gridMargin = '30px';
    var fieldMargin = '0px';
    if ($(window).width() < $(window).height()) {
        //alert('high');
        var target = $('#grid');
        target.css({
            left: gridMargin,
            right: gridMargin
        });
        var newMargin = ((target.parent().height() - target.width()) / 2) + 'px';
        target.css({
            top: newMargin,
            bottom: newMargin
        });
        var targetField = $('.field');
        targetField.css({
            left: fieldMargin,
            right: fieldMargin
        });
        var newFieldMargin = (($('.container').height() - targetField.width()) / 2) + 'px';
        targetField.css({
            top: newFieldMargin,
            bottom: newFieldMargin
        });
    } else {
        //alert('wide');
        var target2 = $('#grid');
        target2.css({
            top: gridMargin,
            bottom: gridMargin
        });
        var newMargin2 = ((target2.parent().width() - target2.height()) / 2) + 'px';
        target2.css({
            left: newMargin2,
            right: newMargin2
        });
        var targetField2 = $('.field');
        targetField2.css({
            top: fieldMargin,
            bottom: fieldMargin
        });
        var newFieldMargin2 = (($('.container').width() - targetField2.height()) / 2) + 'px';
        targetField2.css({
            left: newFieldMargin2,
            right: newFieldMargin2
        });
    }
}

$('.knob').knob({
    'change': function (v) {
        //console.log(v);
        turnTime = v;
        if (turnTime === 4) {
            var showVal = '&infin;';
        } else {
            var showVal = v;
        }
        $('#timevalue').html(showVal);
        //$('#timer').html(turnTime);
    }
});
$('#timevalue').html(turnTime);

function toggleMenu(status) {
    if (status == 'show') {
        TweenMax.to($('#setup'), 0.4, {
            css: {
                left: 0
            }
        });
        TweenMax.to($('#playfield'), 0.4, {
            css: {
                left: '100%'
            }
        });
    } else {
        TweenMax.to($('#setup'), 0.4, {
            css: {
                left: '-100%'
            }
        });
        TweenMax.to($('#playfield'), 0.4, {
            css: {
                left: 0
            }
        });
    }
}

$('#startgame').on('click', function () {
    createFields();
    toggleMenu('hide');
});
$('#tomenu').on('click', function () {
    paused = true;
    TweenMax.pauseAll();
    $('#togame').show();
    toggleMenu('show');
});
$('#togame').on('click', function () {
    paused = false;
    TweenMax.resumeAll();
    toggleMenu('hide');
});


$(window).resize(function () {
    //alert('ok');
    setSize();
});