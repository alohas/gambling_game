"use strict";

let login = document.querySelector("button.login_form-button.button");

login.addEventListener("click", e => {
  e.preventDefault();
  getNow();
});

//gets all users when you click login

function getNow() {
  fetch("https://rpsexam-61a3.restdb.io/rest/registeredusers", {
    method: "get",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": "5ddfb3cc4658275ac9dc201e",
      "cache-control": "no-cache"
    }
  })
    .then(e => e.json())
    .then(data => {
      checkUser(data);
      //console.log(data);
    });
}

//checks if enetred credentials are correct

function checkUser(data) {
  let username = document.querySelector("#login_username").value;
  let password = document.querySelector("#login_password").value;
  for (let i = 0; i < data.length; i++) {
    if (username == data[i].username) {
      if (password == data[i].password) {
        userObject = data[i];
        localStorage.setItem("RPSuser", data[i]._id);
        loggedUserID = localStorage.getItem("RPSuser");
        document.querySelector("#login_password").value = "";
        document.querySelector("#login_username").value = "";
        window.location.hash = "#profile";
        document.querySelector(".link-loginSignup").style.display = "none";
        document.querySelector(".modal_winner_body_notlogged").style.display =
          "none";
        document.querySelector(".modal_winner_body_logged").style.display =
          "block";
        populateUserInfo(data[i]);
        document.querySelector(".modal_start_body-trial").style.display =
          "none";
        document.querySelector(".modal_start_body-logged").style.display =
          "block";
        document.querySelector(".nav_user-link").href = "#profile";
        document.querySelector("#review").style.display = "block";
        document.querySelector("div.highscore_sorting").style.display = "block";
        resetGame();
      }
    }
  }
}

//Logout user and clear local storage

document.querySelector(".logOut").addEventListener("click", e => {
  localStorage.removeItem("RPSuser");
  loggedUserID = undefined;
  userObject = undefined;

  window.location.hash = "#login";
  document.querySelector(".link-loginSignup").style.display = "list-item";
  document.querySelector(".highscore_sorting").style.display = "none";
  resetGame();
  document.querySelector("div.app_player").style.display = "none";
  document.querySelector(".modal_start_body-trial").style.display = "block";
  document.querySelector(".modal_start_body-logged").style.display = "none";
  document.querySelector(".app-bet").style.visibility = "hidden";
  document.querySelector(".nav_user-link").href = "#login";
  document.querySelector("#review").style.display = "none";
});

//EVENT LISTENER FOR OPENING SIGN UP PAGE
document.querySelector(".login_form-signup").addEventListener("click", e => {
  e.preventDefault;
  window.location.hash = "#signup";
  document.querySelector("div.highscore_sorting").style.display = "none";
});
