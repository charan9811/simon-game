var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

$(".btn").click(function(event){
  var userChosenColour = event.target.id;
  userClickedPattern.push(userChosenColour);
  animatePress(userChosenColour);
  playSound(userChosenColour);

  checkAnswer(userClickedPattern.length-1)

})



function nextSequence() {
  var newNumber = Math.floor(Math.random()*4);
  var randomChosenColor = buttonColours[newNumber];
  gamePattern.push(randomChosenColor);
  playSound(randomChosenColor);
  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  level++;
  $("#level-title").text("Level " + level);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour){
  $("#" + currentColour).addClass("pressed");

  setTimeout(function(){
    $("#" + currentColour).removeClass("pressed");
  },80);
}

function checkAnswer(currentLevel){
  if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
    if(currentLevel+1 === level){
      setTimeout(nextSequence, 1000);
      userClickedPattern = [];
    }
  }
  else{
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over")
    },200);

    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();

  }
}

function startOver() {
  gamePattern = [];
  level = 0;  
}


$(document).on("keydown", function(){
  
  if (!started){
    nextSequence();
    started = true;
  }

});



