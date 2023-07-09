var colours = ["red", "green", "yellow", "blue"];
var level = 0;
var s=0;
var i = 0;
var userClicks = [];
var generatedColours = [];
var started = false;
function nextSequence() {
    level++;
    i = 0;
    userClicks = [];
    $("h1").text("Level " + level);
    var randomNumber = Math.floor(4 * Math.random());
    var randomColour = colours[randomNumber];
    generatedColours.push(randomColour);
    // console.log(generatedColours);
    $("#" + randomColour).fadeOut(100).fadeIn(100);
    var audio = new Audio("sounds/" + randomColour + ".mp3");
    audio.play();
}
function clicked(colour) {
    $("#" + colour).addClass("pressed");
    setTimeout(() => {
        $("#" + colour).removeClass("pressed");
    }, 100);
}
$(document).keydown(function () {
    if (!started) {
        nextSequence();
        started = true;
    }
});

$(".btn").click(function () {
    if (i != -1 && started) {
        clicked($(this).attr("id"));
        userClicks.push($(this).attr("id"));
        console.log(userClicks);
        console.log(generatedColours);
        if (i <= level - 1) {
            if (userClicks[i] != generatedColours[i]) {
                i = -1;
                $("h1").text("Game Over!! Press Any Key to Restart");
                $("body").addClass("game-over");
                var audio = new Audio("sounds/wrong.mp3");
                audio.play();

                level = 0;
                generatedColours = [];
                setTimeout(function (){$("body").removeClass("game-over")},500);
                // setTimeout(nextSequence,1000);   
                    nextSequence();
                // $("h1").text("Press Any Key To Start");
                // started = false;

            }
            else {
                var audio = new Audio("sounds/" + generatedColours[i] + ".mp3");
                audio.play();
                i++;
            }
        }
        if (i > level - 1) {
            setTimeout(nextSequence, 500);
        }
    }
});