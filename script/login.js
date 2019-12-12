"use strict";

let login = document.querySelector("button.login_form-button.button");
login.addEventListener("click", e => {
  e.preventDefault();
  get();
});

function get() {
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

function checkUser(data) {
  let username = document.querySelector("#username").value;
  let password = document.querySelector("#password").value;
  for (let i = 0; i < data.length; i++) {
    if (username == data[i].username) {
      if (password == data[i].password) {
        userObject = data[i];
        localStorage.setItem("RPSuser", data[i]._id);
        loggedUserID = localStorage.getItem("RPSuser");
        document.querySelector("#password").value = "";
        document.querySelector("#username").value = "";
        //document.querySelector(".profile").style.visibility = "visible";
        window.location.hash = "#profile";
        //document.querySelector(".login").style.visibility = "hidden";
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
        resetGame();
      }
    }
  }
}

document.querySelector(".logOut").addEventListener("click", e => {
  localStorage.removeItem("RPSuser");
  loggedUserID = undefined;
  userObject = undefined;
  //document.querySelector(".profile").style.visibility = "hidden";
  window.location.hash = "#login";
  //document.querySelector(".login").style.visibility = "hidden";
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
});
