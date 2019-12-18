"use strict";

//GAME THEME CHANGE
const html = document.querySelector("html");
const orangeBtn = document.querySelector(".orange");
const pinkBtn = document.querySelector(".pink");
const violetBtn = document.querySelector(".violet");
const redBtn = document.querySelector(".red");
const closeColorsBtn = document.querySelector(".store_close");
const openColorsBtn = document.querySelector(".app_rightBar-cart");

openColorsBtn.addEventListener("click", () => {
  document.querySelector(".store").style.display = "grid";
});
closeColorsBtn.addEventListener("click", () => {
  document.querySelector(".store").style.display = "none";
});

orangeBtn.addEventListener("click", () => {
  html.setAttribute("data-attribute", "orange");
  document.querySelector(".store").style.display = "none";
});
redBtn.addEventListener("click", () => {
  html.setAttribute("data-attribute", "red");
  document.querySelector(".store").style.display = "none";
});
violetBtn.addEventListener("click", () => {
  html.setAttribute("data-attribute", "violet");
  document.querySelector(".store").style.display = "none";
});
pinkBtn.addEventListener("click", () => {
  html.setAttribute("data-attribute", "pink");
  document.querySelector(".store").style.display = "none";
});

let loggedUserID = localStorage.getItem("RPSuser");

//INFO MODAL
document.querySelector(".app_rightBar-info").addEventListener("click", () => {
  document.querySelector(".info").style.display = "grid";
});

document.querySelector(".info_close").addEventListener("click", () => {
  document.querySelector(".info").style.display = "none";
});

let userObject;
if (loggedUserID) {
  fetchUser(loggedUserID);
  document.querySelector(".nav_user-link").href = "#profile";
  document.querySelector("#review").style.display = "block";
  document.querySelector(".link-loginSignup").style.display = "none";
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
const mediaQuery = window.matchMedia("(max-width: 900px)");

moreBtn.addEventListener("click", e => {
  moreSlider(mediaQuery);
});

// userBtn.addEventListener("click", e => {
//   userSlider();
// });

// menuBtn.addEventListener("click", e => {
//   menuSlider();
// });

document.querySelector("#allUsers").addEventListener("click", scoreBoard);
document
  .querySelector("#userCountry")
  .addEventListener("click", showScoresByCountry);
document.querySelector("#userAge").addEventListener("click", showScoresByAge);

function moreSlider(mediaQuery) {
  if (mediaQuery.matches) {
    console.log("phone");
  } else {
    if (!slidedMore) {
      document.querySelector(".slider").style.animation = "";
      document.querySelector(".nav").style.animation = "";
      document.querySelector(".slider").style.animation =
        "sliderFullIn 0.4s ease-in forwards";
      // document.querySelector(".nav").style.animation =
      //   "navIn 0.4s ease-in forwards";
      document.querySelector(".nav").style.width = "100vw";
      document.querySelector(".seemore").innerHTML = "see less";
      slidedMore = true;
    } else {
      document.querySelector(".slider").style.animation = "";
      document.querySelector(".nav").style.animation = "";
      document.querySelector(".slider").style.animation =
        "sliderOut 0.4s ease-in forwards";
      // document.querySelector(".nav").style.animation =
      //   "navOut 0.4s ease-in forwards";
      document.querySelector(".nav").style.width = "32vw";
      document.querySelector(".seemore").innerHTML = "see more";
      slidedMore = false;
    }
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
  getUserFriends();
  console.log(user);
  document.querySelector(".profile_user-name").textContent = user.username;
  document.querySelector("#friends > div > div.profile_user > h2").textContent =
    user.username;
  document.querySelector(".profile_user-points").textContent =
    "$ " + user.coins;
  document.querySelector("#friends > div > div.profile_user > p").textContent =
    "$ " + user.coins;
  document.querySelector(".app_player-name").textContent = user.username;
  document.querySelector(".app_player-coins span").textContent = user.coins;
  document.querySelector("div.app_player").style.display = "block";
  document
    .querySelector(".modal_start_body-logged-input")
    .setAttribute("max", user.coins);
  document.querySelector("div.highscore_sorting").style.display = "block";
  if (user.username == "admin") {
    document.querySelector("#admin_list").style.display = "inline-block";
    document.querySelector(".admin_panel").style.display = "inline-block";
  } else {
    document.querySelector("#admin_list").style.display = "none";
    document.querySelector(".admin_panel").style.display = "none";
  }
}

//CLOSING MODAL WITH THE X
const wrapperMenu = document.querySelector(".wrapper");

wrapperMenu.addEventListener("click", () => {
  wrapperMenu.classList.toggle("open");
});

const closeModal = document.querySelectorAll(".u-close");
closeModal.forEach(elem => {
  elem.addEventListener("click", () => {
    wrapperMenu.classList.toggle("open");
  });
});

document.querySelector(".menu-login").addEventListener("click", () => {
  wrapperMenu.classList.toggle("open");
});

//SCORE BOARD
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
      showScores(scores);
    });
}

function showScores(arrayOfUsers) {
  const parent = document.querySelector(".highscoreParent");
  parent.innerHTML = " ";
  for (let i = 0; i <= 9; i++) {
    if (arrayOfUsers.length < 9) {
      if (i == arrayOfUsers.length) {
        break;
      }
    }

    const template = document.querySelector("#scoreBoard").content;
    const clone = template.cloneNode(true);
    clone.querySelector("tr").id = arrayOfUsers[i]._id;
    clone.querySelector(".place").textContent = i + 1;
    clone.querySelector(".name").textContent = arrayOfUsers[i].username;
    clone.querySelector(".score").textContent = arrayOfUsers[i].coins;
    clone.querySelector(".country").textContent = arrayOfUsers[i].country;
    clone.querySelector(".age").textContent = arrayOfUsers[i].age;
    parent.appendChild(clone);
  }
  if (loggedUserID) {
    for (let i = 0; i < arrayOfUsers.length; i++) {
      if (loggedUserID == arrayOfUsers[i]._id) {
        if (i < 10) {
          let list = document.querySelectorAll("tr");
          list.forEach(tr => {
            if (tr.id == loggedUserID) {
              tr.classList.add("you");
            }
          });
        } else {
          const template = document.querySelector("#scoreBoard").content;
          const clone = template.cloneNode(true);
          clone.querySelector("tr").classList.add("you");
          clone.querySelector(".place").textContent = i + 1;
          clone.querySelector(".name").textContent = arrayOfUsers[i].username;
          clone.querySelector(".score").textContent = arrayOfUsers[i].coins;
          clone.querySelector(".country").textContent = arrayOfUsers[i].country;
          clone.querySelector(".age").textContent = arrayOfUsers[i].age;
          parent.appendChild(clone);
        }
      }
    }
  }
}

function showScoresByCountry() {
  let countryName;
  const parent = document.querySelector(".highscoreParent");
  parent.innerHTML = " ";
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
      for (let i = 0; i < data.length; i++) {
        if (loggedUserID == data[i]._id) {
          countryName = data[i].country;
        }
      }
      let filteredUsers = data.filter(function(user) {
        return user.country == countryName;
      });
      filteredUsers = filteredUsers.sort((a, b) =>
        a.coins < b.coins ? 1 : -1
      );
      showScores(filteredUsers);
    });
}

function showScoresByAge() {
  let agecap;
  const parent = document.querySelector(".highscoreParent");
  parent.innerHTML = " ";
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
      for (let i = 0; i < data.length; i++) {
        if (loggedUserID == data[i]._id) {
          agecap = data[i].age;
        }
      }
      let filteredUsers = data.filter(function(user) {
        return user.age == agecap;
      });
      filteredUsers = filteredUsers.sort((a, b) =>
        a.coins < b.coins ? 1 : -1
      );
      showScores(filteredUsers);
    });
}

document.querySelector(".nav_user-link").addEventListener("click", () => {
  document.querySelector("#person").classList.add("hidden");
  document.querySelector("#person1").classList.remove("hidden");
});

document.querySelector(".u-close-right").addEventListener("click", () => {
  document.querySelector("#person").classList.remove("hidden");
  document.querySelector("#person1").classList.add("hidden");
});

var prevScrollpos = window.pageYOffset;
window.onscroll = function() {
  var currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos) {
    document.getElementById("logoOut").style.top = "0";
  } else {
    document.getElementById("logoOut").style.top = "-50px";
  }
  prevScrollpos = currentScrollPos;
};
