"use strict";

let loggedUserID = localStorage.getItem("RPSuser");

let userObject;
if (loggedUserID) {
  fetchUser(loggedUserID);
}

let scores;
const moreBtn = document.querySelector(".slider_right-button");
const userBtn = document.querySelector(".nav_user");
const menuBtn = document.querySelector(".wrapper");
const reviewsBtn = document.querySelector(".text-link");
let slidedMore = false;
let slidedMenu = false;
let slidedUser = false;
let slidedReview = false;

moreBtn.addEventListener("click", e => {
  moreSlider();
});

userBtn.addEventListener("click", e => {
  userSlider();
});

menuBtn.addEventListener("click", e => {
  menuSlider();
});

document.querySelector("#allUsers").addEventListener("click", scoreBoard);
document.querySelector("#userCountry");
document.querySelector("#userAge");

function moreSlider() {
  if (!slidedMore) {
    document.querySelector(".slider").style.animation = "";
    document.querySelector(".nav").style.animation = "";
    document.querySelector(".slider").style.animation =
      "sliderFullIn 0.4s ease-in forwards";
    document.querySelector(".nav").style.animation =
      "navIn 0.4s ease-in forwards";
    slidedMore = true;
  } else {
    document.querySelector(".slider").style.animation = "";
    document.querySelector(".nav").style.animation = "";
    document.querySelector(".slider").style.animation =
      "sliderOut 0.4s ease-in forwards";
    document.querySelector(".nav").style.animation =
      "navOut 0.4s ease-in forwards";
    slidedMore = false;
  }
}

function menuSlider() {
  if (!slidedMenu) {
    document.querySelector(".menu").style.visibility = "visible";
    slidedMenu = true;
  } else {
    document.querySelector(".menu").style.visibility = "hidden";
    slidedMenu = false;
  }
}

function userSlider() {
  if (!slidedUser) {
    slidedUser = true;
    if (loggedUserID) {
      document.querySelector(".profile").style.visibility = "visible";
    } else {
      document.querySelector(".login").style.visibility = "visible";
    }
  } else {
    document.querySelector(".profile").style.visibility = "hidden";
    document.querySelector(".login").style.visibility = "hidden";
    slidedUser = false;
  }
}

function fetchUser(id) {
  fetch(`https://rpsexam-61a3.restdb.io/rest/registeredusers/${id}`, {
    method: "get",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": "5ddfb3cc4658275ac9dc201e",
      "cache-control": "no-cache"
    }
  })
    .then(e => e.json())
    .then(data => {
      userObject = data;
      populateUserInfo(userObject);
    });
}

// use THIS function to use user data model on loading stuff on page
function populateUserInfo(user) {
  // console.log(user);
  document.querySelector(".profile_user-name").textContent = user.username;
  document.querySelector(".profile_user-points").textContent = user.coins;
  document.querySelector(".app_player-name").textContent = user.username;
  document.querySelector(".app_player-coins span").textContent = user.coins;
  document.querySelector("div.app_player").style.display = "block";
  document
    .querySelector(".modal_start_body-logged-input")
    .setAttribute("max", user.coins);
  document.querySelector("div.highscore_sorting").style.display = "block";
}

var wrapperMenu = document.querySelector(".wrapper");

wrapperMenu.addEventListener("click", function() {
  wrapperMenu.classList.toggle("open");
});

document.querySelector(".link-highscore > a").addEventListener("click", e => {
  scoreBoard();
});

function scoreBoard() {
  fetch(`https://rpsexam-61a3.restdb.io/rest/registeredusers`, {
    method: "get",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": "5ddfb3cc4658275ac9dc201e",
      "cache-control": "no-cache"
    }
  })
    .then(e => e.json())
    .then(data => {
      scores = data.sort((a, b) => (a.coins < b.coins ? 1 : -1));
      //console.log(scores);
      showScores();
    });
}

function showScores() {
  const parent = document.querySelector(".highscoreParent");
  parent.innerHTML = " ";
  for (let i = 0; i <= 9; i++) {
    const template = document.querySelector("#scoreBoard").content;
    const clone = template.cloneNode(true);
    clone.querySelector(".place").textContent = i + 1;
    clone.querySelector(".name").textContent = scores[i].username;
    clone.querySelector(".score").textContent = scores[i].coins;
    clone.querySelector(".country").textContent = scores[i].country;
    clone.querySelector(".age").textContent = scores[i].age;
    parent.appendChild(clone);
  }
  if (loggedUserID) {
    for (let i = 0; i < scores.length; i++) {
      if (loggedUserID == scores[i]._id) {
        const template = document.querySelector("#scoreBoard").content;
        const clone = template.cloneNode(true);
        const parent = document.querySelector(".highscoreParent");
        clone.querySelector(".place").textContent = i + 1;
        clone.querySelector(".name").textContent = scores[i].username;
        clone.querySelector(".score").textContent = scores[i].coins;
        clone.querySelector(".country").textContent = scores[i].country;
        clone.querySelector(".age").textContent = scores[i].age;
        parent.appendChild(clone);
      }
    }
  }
}
