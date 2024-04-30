"use strict";

const buttonColours = ["red", "blue", "green", "yellow"];

let gamePattern = [];

let userClickedPattern = [];

let level = 0;

let started = false;

$(document).keypress(function () {
  if (!started) {
    $("#level-title").text("Level" + level);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function () {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);

  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length - 1);
});

function nextSequence() {
  userClickedPattern = [];
  level++;

  $("#level-title").text("Level " + level);
  // generates a random number
  var randomNumber = Math.floor(Math.random() * 4);
  // random chosen colors is iqual the random number applied to index of buttons colours
  var randomChosenColour = buttonColours[randomNumber];

  gamePattern.push(randomChosenColour);

  $(`#${randomChosenColour}`).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);
}

function playSound(name) {
  // plays the audio accordly to name to random chosen color
  var audio = new Audio(`./sounds/${name}.mp3`);
  audio.play();
}

function animatePress(currentColour) {
  $(`#${currentColour}`).addClass("pressed");

  setTimeout(function () {
    $(`#${currentColour}`).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  // checks if the last index of the array gamePattern is iqual to userClickedPattern's, is so, it will go to next fase, if not, the else block will run
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("Sucess");
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    // playing the wrong sound if the user's input is wrong
    let wrong = new Audio("./sounds/wrong.mp3");
    wrong.play();

    // changes the body bg color red if the user's input is wrong
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    // changing the title
    $("h1").text("Game Over, Press Any Key to Restart");

    // calling function start over if the user get the wrong answer
    startOver();
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}

// button
$(".btn-rules").click(function () {
  $(".rules-text").toggle();
  $(".rules").toggleClass("active");
});
