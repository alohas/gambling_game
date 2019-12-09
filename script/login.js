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
        localStorage.setItem("RPSuser", data[i]._id);
        loggedUserID = localStorage.getItem("RPSuser");
        document.querySelector("#password").value = "";
        document.querySelector("#username").value = "";
        document.querySelector(".profile").style.visibility = "visible";
        document.querySelector(".login").style.visibility = "hidden";
        populateUserInfo(data[i]);
      }
    }
  }
}

document.querySelector(".logOut").addEventListener("click", e => {
  localStorage.removeItem("RPSuser");
  loggedUserID = undefined;
  document.querySelector(".profile").style.visibility = "hidden";
  document.querySelector(".login").style.visibility = "hidden";
});
