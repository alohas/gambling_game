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
  // document.querySelector(".link-loginSignup").style.display = "none";
  document.querySelector(".menu-login").textContent = "see profile";
  document.querySelector(".menu-login").href = "#profile";
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
    ("phone");
  } else {
    if (!slidedMore) {
      document.querySelector(".slider").style.animation = "";
      document.querySelector(".nav").style.animation = "";
      document.querySelector(".slider").style.animation =
        "sliderFullIn 0.4s ease-in-out forwards";
      // document.querySelector(".nav").style.animation =
      //   "navIn 0.4s ease-in forwards";
      document.querySelector(".nav").style.width = "100vw";
      document.querySelector(".seemore").innerHTML = "see less";
      slidedMore = true;
    } else {
      document.querySelector(".slider").style.animation = "";
      document.querySelector(".nav").style.animation = "";
      document.querySelector(".slider").style.animation =
        "sliderOut 0.4s ease-in-out forwards";
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

document.querySelector(".link-loginSignup").addEventListener("click", () => {
  wrapperMenu.classList.toggle("open");
  document.querySelector("#person").classList.add("hidden");
  document.querySelector("#person1").classList.remove("hidden");
});

document
  .querySelector(".modal_winner_body_notlogged_buttons-login")
  .addEventListener("click", () => {
    document.querySelector("#person").classList.add("hidden");
    document.querySelector("#person1").classList.remove("hidden");
  });

document
  .querySelector(".modal_winner_body_notlogged_buttons-signup")
  .addEventListener("click", () => {
    document.querySelector("#person").classList.add("hidden");
    document.querySelector("#person1").classList.remove("hidden");
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
  document.querySelector("#personclose").classList.remove("hidden");
});

document.querySelectorAll(".u-close-right").forEach(elem => {
  elem.addEventListener("click", () => {
    document.querySelector("#person").classList.remove("hidden");
    document.querySelector("#personclose").classList.add("hidden");
  });
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

("use strict");

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

("use strict");

// Fetching the reviews from the database

function fetchReviews() {
  fetch(`https://rpsexam-61a3.restdb.io/rest/registeredusers`, {
    method: "get",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": "5ddfb3cc4658275ac9dc201e",
      "cache-control": "no-cache"
    }
  })
    .then(e => e.json())
    .then(users => {
      // Check if the user posted a review and if he has execute fc

      users.forEach(user => {
        if (user.review != "") {
          if (user.review != undefined) {
            populateReviews(user);
          }
        }
      });
    });
}

// Use this to randomize avatar names and send them to the db
// Cannot be generated automatically as db is limited in this regard

// for (let i = 0; i < users.length; i++) {
//   let randomNum = Math.floor(Math.random() * 3) + 1;
//   users[i].imageName = 'avatar-' + randomNum;
//   put(users[i]);
// }

// Use the standard review template and append the data
// for each user to it

function populateReviews(user) {
  let parent = document.querySelector(".reviews_see");
  let template = document.querySelector(".review-template").content;
  let clone = template.cloneNode(true);
  clone.querySelector(".avatarUser").textContent = user.imageName;
  clone.querySelector(".usernameUser").textContent = "~ " + user.username;
  let starsHTML = "";
  for (let i = 0; i < user.starRate; i++) {
    starsHTML += '<img src="/images/star_full.png" alt="Star Rate"/>';
  }
  for (let i = 0; i < 5 - user.starRate; i++) {
    starsHTML += '<img src="/images/star_empty.png" alt="Star Rate"/>';
  }
  clone.querySelector(".starUser").innerHTML = starsHTML;
  clone.querySelector(".reviewUser").textContent = user.review;
  parent.prepend(clone);
}

fetchReviews();

// Increasing and decreasing star rate by click

let stars = document.querySelector(".stars").children;

for (let star of stars) {
  star.addEventListener("click", e => {
    for (let star of stars) {
      star.classList.remove("full");
    }
    const rate = Number(e.target.classList[1]);
    colorstars(rate);
  });
}

function colorstars(rating) {
  for (let i = 0; i < rating; i++) {
    stars[i].classList.add("full");
  }
  for (let star of stars) {
    if (star.classList[2] == "full") {
      star.src = "/images/star_full.png";
    } else {
      star.src = "/images/star_empty.png";
    }
  }
}

document.querySelector(".reviews_add-post").addEventListener("click", e => {
  e.preventDefault();
  modifyUserObject();
  e.target.textContent = "posted";
  e.target.style.color = "#7186f5";
  document.querySelector("#review > textarea").value = " ";
  for (let star of stars) {
    star.classList.remove("full");
    star.src = "/images/star_empty.png";
  }
  document.querySelector("textarea").style.color = "rgba(255, 255, 255, 0.4)";
});

// Modifying the saved user object's variables - starRate and review

function modifyUserObject() {
  let starRate = document.querySelectorAll(".full").length;
  userObject.starRate = starRate;
  userObject.review = document.querySelector(".reviews_add-input").value;
  putReviews(userObject);
}

// Function to send the modified user to the database

function putReviews(editedUser) {
  fetch(
    "https://rpsexam-61a3.restdb.io/rest/registeredusers/" + editedUser._id,
    {
      method: "put",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "x-apikey": "5ddfb3cc4658275ac9dc201e",
        "cache-control": "no-cache"
      },
      body: JSON.stringify(editedUser)
    }
  )
    .then(e => e.json())
    .then(editedActivity => {
      // When modified user data is back from the database we give it as a
      // parameter to the function that creates the review

      populateReviews(editedActivity);
    });
}

("use strict");

//get();

// Fetch the country API in order to populate the select form element
const countryAPI = "https://restcountries.eu/rest/v2/all";

// Global declaration in order to be able to always access it
let countriesArray = [];

function fetchCountries() {
  fetch(countryAPI)
    .then(e => e.json())
    .then(countries => {
      countries.forEach(country => {
        let countryObj = {
          countryName: "",
          countryAlpha2Code: ""
        };

        // Push data to the array of objects

        countryObj.countryName = country.name;
        countryObj.countryAlpha2Code = country.alpha2Code;
        countriesArray.push(countryObj);
      });
    });
}

fetchCountries();

// Populate select with option elements with the values and text content
// set from the countries array

function offerSelectOptions() {
  let selectCountry = document.querySelector(".select_form-country select");
  let existingOption = document.querySelector(".option_form-country").value;
  for (let i = 0; i < countriesArray.length; i++) {
    let option = document.createElement("option");
    // Compare to exclude already existing option
    if (countriesArray[i].countryName != existingOption) {
      option.setAttribute("value", countriesArray[i].countryName);
      option.textContent = countriesArray[i].countryName;
      option.classList.add("fluidCountry");
      selectCountry.appendChild(option);
    }
  }
}

document
  .querySelector(".select_form-country select")
  .addEventListener("change", updateSelect);

// On each change update the classes on option elements so that they can be cleared out

function updateSelect() {
  let options = document.querySelectorAll(".select_form-country option");
  document
    .querySelector(".option_form-country")
    .classList.remove("option_form-country");
  options[event.target.selectedIndex].classList.remove("fluidCountry");
  options[event.target.selectedIndex].classList.add("option_form-country");
}

function clearSelectOptions() {
  document.querySelectorAll(".fluidCountry").forEach(el => el.remove());
}

// Add event listeners to edit profile options

document.querySelector(".edit-profile").addEventListener("click", showUserEdit);
document
  .querySelector(".editUser_form-login_back")
  .addEventListener("click", closeEditUser);
document
  .querySelector(".confirmModifications_form-login_back")
  .addEventListener("click", closeConfirmModifications);
document
  .querySelector(".modifyPassword_form-login_back")
  .addEventListener("click", closeModifyPassword);

function closeEditUser() {
  document.querySelector(".editUser").style.display = "none";

  document.querySelector("#editUser_username").value = "";
  document.querySelector("#editUser_email").value = "";
  document.querySelector("#editUser_age").value = "";

  // Link to a different section of the page

  window.location.hash = "#profile";
  clearSelectOptions();
  document.querySelector(".editUser_paragraph-alertNoModifs").style.display =
    "none";
}

function closeConfirmModifications() {
  document.querySelector(".confirmModifications").style.display = "none";
}

function closeModifyPassword() {
  document.querySelector(".modifyPassword").style.display = "none";
  document.querySelector(".modifyPassword_paragraph-alert").style.display =
    "none";
}

// console.log(userObject);

// Populate the form with already existent info about the logged in user

function showUserEdit() {
  let editUser = document.querySelector(".editUser");
  editUser.style.display = "block";
  editUser
    .querySelector(".editUser_form-username input")
    .setAttribute("placeholder", userObject.username);
  editUser
    .querySelector(".editUser_form-email input")
    .setAttribute("placeholder", userObject.email);
  editUser
    .querySelector(".option_form-country")
    .setAttribute("value", userObject.country);
  editUser.querySelector(".option_form-country").textContent =
    userObject.country;
  editUser
    .querySelector(".editUser_form-age input")
    .setAttribute("placeholder", userObject.age);
  offerSelectOptions();
}

document.querySelector(".editUser_form-login").addEventListener("click", e => {
  // Check for form validity manually
  e.preventDefault();
  let k = 0;
  let selector = [
    ".editUser_form-username input",
    ".editUser_form-email input",
    ".option_form-country",
    ".editUser_form-age input"
  ];
  selector.forEach(el => {
    if (document.querySelector(el).value == "") {
      k++;
    }
  });
  if (k == 3) {
    document.querySelector(".editUser_form").reportValidity();
  } else {
    checkForChanges();
  }
});

let saveChangesTrigger = false;

// If there's valid input, check for values differences

function checkForChanges() {
  let selector = [
    ".editUser_form-username input",
    ".editUser_form-email input",
    ".option_form-country",
    ".editUser_form-age input"
  ];
  let selectorObject = ["username", "email", "country", "age"];
  for (let i = 0; i < 4; i++) {
    if (
      document.querySelector(selector[i]).value != "" &&
      document.querySelector(selector[i]).value != userObject[selectorObject[i]]
    ) {
      // If there are values differences update the saved user object with them
      userObject[selectorObject[i]] = document.querySelector(selector[i]).value;
      // and store true in variable in order to be later on used
      saveChangesTrigger = true;
    } else if (
      document.querySelector(selector[i]).value == userObject[selectorObject[i]]
    ) {
      document.querySelector(selector[i]).input = document.querySelector(
        selector[i]
      ).value;
    }
  }
  if (saveChangesTrigger == false) {
    document.querySelector(".editUser_paragraph-alertNoModifs").style.display =
      "block";
  } else {
    // If variable is true show password confirmation window
    showPasswordConfirmation();
  }
}

// Modify the password

document
  .querySelector(".editUser_paragraph-modifyPassword")
  .addEventListener("click", showModifyPassword);

function showModifyPassword() {
  document.querySelector(".modifyPassword").style.display = "block";
}

// Edit the user

function put(editedUser) {
  fetch(
    "https://rpsexam-61a3.restdb.io/rest/registeredusers/" + editedUser._id,
    {
      method: "put",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "x-apikey": "5ddfb3cc4658275ac9dc201e",
        "cache-control": "no-cache"
      },
      body: JSON.stringify(editedUser)
    }
  )
    .then(e => e.json())
    .then(editedActivity => {
      document.querySelector(".modal-confirm").style.display = "none";
    });
}

function showPasswordConfirmation() {
  document.querySelector(".editUser").style.display = "none";
  document.querySelector(".confirmModifications").style.display = "block";
}

document
  .querySelector(".confirmModifications_form-login")
  .addEventListener("click", e => {
    e.preventDefault();
    // If the confirm button is clicked check for password match
    // from the input and the database
    validatePasswordInput();
  });

// Validate with password for profile modifications

function validatePasswordInput() {
  let typedPassword = document.querySelector(
    ".confirmModifications_form-password input"
  ).value;
  if (userObject.password == typedPassword) {
    // If there is a match the user is updated in the website

    populateUserInfo(userObject);

    // The user is updated in the database

    put(userObject);
    document.querySelector(".modal-confirm").style.display = "block";
    closeConfirmModifications();
  } else {
    document.querySelector(
      ".confirmModifications_paragraph-alertWrongPass"
    ).style.display = "block";
  }
}

// Changing password section

document
  .querySelector(".modifyPassword_form-login")
  .addEventListener("click", e => {
    e.preventDefault();

    // Check for validation manually due to preventDefault()

    if (document.querySelector(".modifyPassword_form").checkValidity()) {
      passwordCheckOld();
    } else {
      document.querySelector(".modifyPassword_form").reportValidity();
    }
  });

// Display customized error messages depending on the user's mistake

function passwordCheckOld() {
  if (
    document.querySelector(".modifyPassword_form-password input").value ==
    userObject.password
  ) {
    passwordCheckMatch();
  } else {
    document.querySelector(".modifyPassword_paragraph-alert").style.display =
      "block";
    document.querySelector(".modifyPassword_paragraph-alert").textContent =
      "Wrong old password";
  }
}

function passwordCheckMatch() {
  if (
    document.querySelector(".modifyPassword_form-password_new input").value !=
      "" ||
    document.querySelector(".modifyPassword_form-password_new-retype input")
      .value != "" ||
    (document.querySelector(".modifyPassword_form-password_new-retype input")
      .value != "" &&
      document.querySelector(".modifyPassword_form-password_new input").value !=
        "")
  ) {
    if (
      document.querySelector(".modifyPassword_form-password_new input").value ==
      document.querySelector(".modifyPassword_form-password_new-retype input")
        .value
    ) {
      modifyPassword();
    } else {
      document.querySelector(".modifyPassword_paragraph-alert").style.display =
        "block";
      document.querySelector(".modifyPassword_paragraph-alert").textContent =
        "No match between passwords :(";
    }
  } else {
    document.querySelector(".modifyPassword_paragraph-alert").style.display =
      "block";
    document.querySelector(".modifyPassword_paragraph-alert").textContent =
      "Please type in the new passwords :) ";
  }
}

function modifyPassword() {
  userObject.password = document.querySelector(
    ".modifyPassword_form-password_new input"
  ).value;

  // If everything checks send the user to the db and close window

  put(userObject);
  closeModifyPassword();
  document.querySelector(".modal-confirm").style.display = "block";
}

("useStrict");

if (loggedUserID) {
  document.querySelector("div.app_player").style.display = "block";
  document.querySelector(".modal_start_body-logged").style.display = "block";
} else {
  document.querySelector(".modal_start_body-trial").style.display = "block";
}

const game = {
  userWin: 0,
  pcWin: 0
};

let optionsPC = [
  "Rock",
  "Paper",
  "Scissors",
  "Lizard",
  "Spock",
  "Spider-man",
  "Batman",
  "Wizard",
  "Glock"
];

const playerh = document.querySelector("div.userhimg > img");
const computerh = document.querySelector("div.pchimg > img");
const options = document.querySelectorAll(".app_options button");
const handsimg = document.querySelectorAll(".handsimg img");
const modalWin = document.querySelector(".modal_winner");
const modalStart = document.querySelector(".modal_start");
const restart = document.querySelector(".modal_winner_body_logged-restart");
const start = document.querySelector(".modal_start_body-buton");
const inputAmount = document.querySelector(".modal_start_body-logged-input");
const bet = document.querySelector(".app-bet");

restart.addEventListener("click", resetGame);

start.addEventListener("click", e => {
  if (loggedUserID) {
    if (userObject.coins > 0) {
      startGame();
    }
  } else {
    startGame();
  }
});

document
  .querySelector(".modal_winner_body_notlogged_buttons-login")
  .addEventListener("click", e => {
    window.location.hash = "#login";
  });

document
  .querySelector(".modal_start_body-logged-up")
  .addEventListener("click", () => {
    if (Number(inputAmount.value) == inputAmount.max) {
    } else {
      inputAmount.value = Number(inputAmount.value) + 10;
    }
  });

document
  .querySelector(".modal_start_body-logged-down")
  .addEventListener("click", () => {
    if (Number(inputAmount.value) == 10) {
    } else {
      inputAmount.value = Number(inputAmount.value) - 10;
    }
  });

handsimg.forEach(hand => {
  hand.addEventListener("animationend", function() {
    this.style.animation = "";
  });
});

options.forEach(option => {
  option.disabled = true;
  option.addEventListener("click", function() {
    options.forEach(e => {
      e.disabled = true;
    });
    let generatedHand = optionsPC[Math.floor(Math.random() * 8)];
    let result = null;

    setTimeout(() => {
      playerh.src = `/hands/hand_${
        option.querySelector("svg").dataset.name
      }.svg`;
      computerh.src = `/hands/hand_${generatedHand}.svg`;

      result = aRound(option.querySelector("svg").dataset.name, generatedHand);

      if (result === "win") {
        game.userWin++;
        updateScore();
      } else if (result === "loss") {
        game.pcWin++;
        updateScore();
      }
      options.forEach(e => {
        e.disabled = false;
      });
      setTimeout(() => {
        checkScore();
      }, 200);
    }, 2000);

    playerh.style.animation = "shakePlayer 2s ease";
    computerh.style.animation = "shakeComputer 2s ease";
  });
});

function aRound(playerHand, computerHand) {
  const winner = document.querySelector(".app_result");

  document.querySelector(".userh span").textContent = playerHand;
  document.querySelector(".pch span").textContent = computerHand;

  winner.style.visibility = "visible";
  if (playerHand === computerHand) {
    winner.textContent = "It is a tie!";
    return;
  }
  if (playerHand === "Rock") {
    if (computerHand === "Paper") {
      winner.textContent = "Paper covers rock.";
      return "loss";
    } else if (computerHand === "Scissors") {
      winner.textContent = "Rock crushes scissors.";
      return "win";
    } else if (computerHand === "Lizard") {
      winner.textContent = "Rock crushes lizard";
      return "win";
    } else if (computerHand === "Spock") {
      winner.textContent = "Spock vaporizes rock.";
      return "loss";
    } else if (computerHand === "Spider-man") {
      winner.textContent = "Rock knocks out spider-man.";
      return "win";
    } else if (computerHand === "Batman") {
      winner.textContent = "Batman explodes rock.";
      return "loss";
    } else if (computerHand === "Wizard") {
      winner.textContent = "Rock interrupts wizard.";
      return "win";
    } else if (computerHand === "Glock") {
      winner.textContent = "Glock breaks rock.";
      return "loss";
    }
  } else if (playerHand === "Paper") {
    if (computerHand === "Rock") {
      winner.textContent = "Paper covers rock.";
      return "win";
    } else if (computerHand === "Scissors") {
      winner.textContent = "Scissors cut paper.";
      return "loss";
    } else if (computerHand === "Lizard") {
      winner.textContent = "Lizard eats paper.";
      return "loss";
    } else if (computerHand === "Spock") {
      winner.textContent = "Paper disproves spock.";
      return "win";
    } else if (computerHand === "Spider-man") {
      winner.textContent = "Spider-man rips paper.";
      return "loss";
    } else if (computerHand === "Batman") {
      winner.textContent = "Paper delays batman.";
      return "win";
    } else if (computerHand === "Wizard") {
      winner.textContent = "Wizard burns paper";
      return "loss";
    } else if (computerHand === "Glock") {
      winner.textContent = "Paper jams glock.";
      return "win";
    }
  } else if (playerHand === "Scissors") {
    if (computerHand === "Rock") {
      winner.textContent = "Rock crushes scissors.";
      return "loss";
    } else if (computerHand === "Paper") {
      winner.textContent = "Scissors cut paper.";
      return "win";
    } else if (computerHand === "Lizard") {
      winner.textContent = "Scissors decapitates lizard.";
      return "win";
    } else if (computerHand === "Spock") {
      winner.textContent = "Spock smashes scissors.";
      return "loss";
    } else if (computerHand === "Spider-man") {
      winner.textContent = "Scissors cut spider-man.";
      return "win";
    } else if (computerHand === "Batman") {
      winner.textContent = "Batman dismantles scissors.";
      return "loss";
    } else if (computerHand === "Wizard") {
      winner.textContent = "Scissors stabs wizard.";
      return "win";
    } else if (computerHand === "Glock") {
      winner.textContent = "Glock dents scissors.";
      return "loss";
    }
  } else if (playerHand === "Lizard") {
    if (computerHand === "Rock") {
      winner.textContent = "Rock crushes lizard";
      return "loss";
    } else if (computerHand === "Paper") {
      winner.textContent = "Lizard eats paper.";
      return "win";
    } else if (computerHand === "Scissors") {
      winner.textContent = "Scissors decapitates lizard.";
      return "loss";
    } else if (computerHand === "Spock") {
      winner.textContent = "Lizard poisons spock.";
      return "win";
    } else if (computerHand === "Spider-man") {
      winner.textContent = "Spider-man defeats lizard.";
      return "loss";
    } else if (computerHand === "Batman") {
      winner.textContent = "Lizard confuses batman.";
      return "win";
    } else if (computerHand === "Wizard") {
      winner.textContent = "Wizard transforms lizard.";
      return "loss";
    } else if (computerHand === "Glock") {
      winner.textContent = "Lizard is too small for glock";
      return "win";
    }
  } else if (playerHand === "Spock") {
    if (computerHand === "Rock") {
      winner.textContent = "Spock vaporizes rock.";
      return "win";
    } else if (computerHand === "Paper") {
      winner.textContent = "Paper disproves spock.";
      return "loss";
    } else if (computerHand === "Scissors") {
      winner.textContent = "Spock smashes scissors.";
      return "win";
    } else if (computerHand === "Lizard") {
      winner.textContent = "Lizard poisons spock.";
      return "loss";
    } else if (computerHand === "Spider-man") {
      winner.textContent = "Spock befuddles spider-man";
      return "win";
    } else if (computerHand === "Batman") {
      winner.textContent = "Batman hangs Spock";
      return "loss";
    } else if (computerHand === "Wizard") {
      winner.textContent = "Spock zaps wizard";
      return "win";
    } else if (computerHand === "Glock") {
      winner.textContent = "Glock shoots spock.";
      return "loss";
    }
  } else if (playerHand === "Spider-man") {
    if (computerHand === "Rock") {
      winner.textContent = "Rock knocks out spider-man.";
      return "loss";
    } else if (computerHand === "Paper") {
      winner.textContent = "Spider-man rips paper.";
      return "win";
    } else if (computerHand === "Scissors") {
      winner.textContent = "Scissors cut spider-man.";
      return "loss";
    } else if (computerHand === "Lizard") {
      winner.textContent = "Spider-man defeats lizard.";
      return "win";
    } else if (computerHand === "Spock") {
      winner.textContent = "Spock befuddles spider-man";
      return "loss";
    } else if (computerHand === "Batman") {
      winner.textContent = "Batman scares spider-man";
      return "loss";
    } else if (computerHand === "Wizard") {
      winner.textContent = "Spider-man annoys wizard.";
      return "win";
    } else if (computerHand === "Glock") {
      winner.textContent = "Spider-man disarms glock.";
      return "win";
    }
  } else if (playerHand === "Batman") {
    if (computerHand === "Rock") {
      winner.textContent = "Batman explodes rock.";
      return "win";
    } else if (computerHand === "Paper") {
      winner.textContent = "Paper delays batman.";
      return "loss";
    } else if (computerHand === "Scissors") {
      winner.textContent = "Batman dismantles scissors.";
      return "win";
    } else if (computerHand === "Lizard") {
      winner.textContent = "Lizard confuses batman.";
      return "loss";
    } else if (computerHand === "Spock") {
      winner.textContent = "Batman hangs Spock";
      return "win";
    } else if (computerHand === "Spider-man") {
      winner.textContent = "Batman scares spider-man";
      return "win";
    } else if (computerHand === "Wizard") {
      winner.textContent = "Wizard stuns batman.";
      return "loss";
    } else if (computerHand === "Glock") {
      winner.textContent = "Glock shoots batman's mom";
      return "loss";
    }
  } else if (playerHand === "Wizard") {
    if (computerHand === "Rock") {
      winner.textContent = "Rock interrupts wizard.";
      return "loss";
    } else if (computerHand === "Paper") {
      winner.textContent = "Wizard burns paper";
      return "win";
    } else if (computerHand === "Scissors") {
      winner.textContent = "Scissors stabs wizard.";
      return "loss";
    } else if (computerHand === "Lizard") {
      winner.textContent = "Wizard transforms lizard.";
      return "win";
    } else if (computerHand === "Spock") {
      winner.textContent = "Spock zaps wizard";
      return "loss";
    } else if (computerHand === "Spider-man") {
      winner.textContent = "Spider-man annoys wizard.";
      return "loss";
    } else if (computerHand === "Batman") {
      winner.textContent = "Wizard stuns batman.";
      return "win";
    } else if (computerHand === "Glock") {
      winner.textContent = "Wizard melts glock.";
      return "win";
    }
  } else if (playerHand === "Glock") {
    if (computerHand === "Rock") {
      winner.textContent = "Glock breaks rock.";
      return "win";
    } else if (computerHand === "Paper") {
      winner.textContent = "Paper jams glock.";
      return "loss";
    } else if (computerHand === "Scissors") {
      winner.textContent = "Glock dents scissors.";
      return "win";
    } else if (computerHand === "Lizard") {
      winner.textContent = "Lizard is too small for glock";
      return "loss";
    } else if (computerHand === "Spock") {
      winner.textContent = "Glock shoots spock.";
      return "win";
    } else if (computerHand === "Spider-man") {
      winner.textContent = "Spider-man disarms glock.";
      return "loss";
    } else if (computerHand === "Batman") {
      winner.textContent = "Glock shoots batman's mom";
      return "win";
    } else if (computerHand === "Wizard") {
      winner.textContent = "Wizard melts glock.";
      return "loss";
    }
  }
}

function updateScore() {
  document.querySelector(".app_wins-userw span").textContent =
    "- " + game.userWin + " -";
  document.querySelector(".app_wins-pcw span").textContent =
    "- " + game.pcWin + " -";
}

function checkScore() {
  if (game.userWin == 2 || game.pcWin == 2) {
    options.forEach(option => {
      option.disabled = true;
    });

    modalWin.style.display = "grid";
    document.querySelector(".modal_winner_body_logged-restart").textContent =
      "Play Again";
    options.forEach(e => {
      e.disabled = true;
    });

    if (game.userWin == 2) {
      document.querySelector(".modal_winner_body-message").textContent =
        "winner";

      if (loggedUserID) {
        userObject.coins = userObject.coins + Number(bet.textContent);
        populateUserInfo(userObject);
        const postData = JSON.stringify(userObject);
        fetch(
          `https://rpsexam-61a3.restdb.io/rest/registeredusers/${loggedUserID}`,
          {
            method: "put",
            headers: {
              "Content-Type": "application/json; charset=utf-8",
              "x-apikey": "5ddfb3cc4658275ac9dc201e",
              "cache-control": "no-cache"
            },
            body: postData
          }
        );
      }
    } else if (game.pcWin == 2) {
      document.querySelector(".modal_winner_body-message").textContent =
        "loser";
    }
    if (!loggedUserID) {
      document.querySelector(".modal_winner_body_notlogged").style.display =
        "block";
      document.querySelector(".modal_winner_body_logged").style.display =
        "none";
    } else {
      document.querySelector(".modal_winner_body_logged").style.display =
        "block";
      document.querySelector(".modal_winner_body_notlogged").style.display =
        "none";
      if (userObject.coins == 0) {
        document.querySelector(".modal_winner_body-message").textContent =
          "out of coins";
        document.querySelector(
          ".modal_winner_body_logged-restart"
        ).textContent = "Get 100";
        userObject.coins = 100;

        populateUserInfo(userObject);
        const postData = JSON.stringify(userObject);
        fetch(
          `https://rpsexam-61a3.restdb.io/rest/registeredusers/${loggedUserID}`,
          {
            method: "put",
            headers: {
              "Content-Type": "application/json; charset=utf-8",
              "x-apikey": "5ddfb3cc4658275ac9dc201e",
              "cache-control": "no-cache"
            },
            body: postData
          }
        );
      }
    }
  }
}

function resetGame() {
  game.userWin = 0;
  game.pcWin = 0;
  updateScore();
  modalWin.style.display = "none";
  document.querySelector(".app_result").style.visibility = "hidden";
  playerh.src = `/hands/hand_Default.svg`;
  computerh.src = `/hands/hand_Default.svg`;
  document.querySelector(".userh span").textContent = "";
  document.querySelector(".pch span").textContent = "";
  // options.forEach(e => {
  //   e.disabled = false;
  // });
  bet.style.visibility = "hidden";
  modalStart.style.display = "grid";
  inputAmount.value = 10;
}

function startGame() {
  options.forEach(e => {
    e.disabled = false;
  });
  modalStart.style.display = "none";
  if (loggedUserID) {
    let betAmmount = 2 * Number(inputAmount.value);
    bet.textContent = 0;

    function betting() {
      setTimeout(function() {
        bet.textContent++;
        if (bet.textContent < betAmmount) {
          betting();
        } else {
          options.forEach(e => {
            e.disabled = false;
          });
        }
      }, 4);
    }

    betting();

    bet.style.visibility = "visible";
    userObject.coins = userObject.coins - Number(inputAmount.value);
    populateUserInfo(userObject);

    const postData = JSON.stringify(userObject);
    fetch(
      `https://rpsexam-61a3.restdb.io/rest/registeredusers/${loggedUserID}`,
      {
        method: "put",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          "x-apikey": "5ddfb3cc4658275ac9dc201e",
          "cache-control": "no-cache"
        },
        body: postData
      }
    );
  }
}

document
  .querySelector(".modal_winner_body_notlogged_buttons-signup")
  .addEventListener("click", e => {
    window.location.hash = "#signup";
  });

("use strict");

// User object immitating the user in the db

let newUser = {
  age: 0,
  bonus_collected: null,
  coins: 300,
  country: "Antarctica",
  email: "email@com",
  friends: "",
  imageName: "avatar-3",
  password: "mypassword",
  previous_bonus: null,
  review: "",
  starRate: 0,
  streak: 7,
  suspended: false,
  username: "newUser"
};

function getUsers(valueInput, propertyToCheck) {
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
      data.forEach(el => {
        if (el[propertyToCheck] == valueInput) {
          alert("Pick another " + propertyToCheck + "!");
        }
      });
    });
}

document.querySelector(".signup_form-button").addEventListener("click", e => {
  e.preventDefault();

  // Manual form validation due to preventDefault()
  // https://emailregex.com/
  if (
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      document.querySelector(".signup_form-email input").value
    )
  ) {
    if (document.querySelector(".signup_form").checkValidity()) {
      getInputValues();
    } else {
      document.querySelector(".signup_form").reportValidity();
    }
  } else {
    alert("wrong email input");
  }
});

// Check if the user has typed an already existing username with the db

document
  .querySelector(".signup_form-username")
  .addEventListener("change", usernameCheck);

function usernameCheck() {
  let usernameInput = document.querySelector(".signup_form-username input")
    .value;
  let username = "username";
  getUsers(usernameInput, username);
}

// Check if the user has typed an already existing email with the db

document
  .querySelector(".signup_form-email")
  .addEventListener("change", emailCheck);

function emailCheck() {
  let emailInput = document.querySelector(".signup_form-email input").value;
  let email = "email";
  getUsers(emailInput, email);
}

// After the signup button is clicked and if it validates
// we update the user object with input from the user

function getInputValues() {
  let usernameInput = document.querySelector(".signup_form-username input")
    .value;
  let emailInput = document.querySelector(".signup_form-email input").value;
  let passwordInput = document.querySelector(".signup_form-password input")
    .value;
  let countryInput = document.querySelector(".signup_option_form-country")
    .textContent;
  let ageInput = document.querySelector(".signup_form-age input").value;

  newUser.username = usernameInput;
  newUser.email = emailInput;
  newUser.password = passwordInput;
  newUser.country = countryInput;
  newUser.age = ageInput;

  postUser(newUser);
}

// Send the user to the database

function postUser(user) {
  fetch("https://rpsexam-61a3.restdb.io/rest/registeredusers", {
    method: "post",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": "5ddfb3cc4658275ac9dc201e",
      "cache-control": "no-cache"
    },
    body: JSON.stringify(user)
  })
    .then(e => e.json())
    .then(newUser => {
      window.location.hash = "#profile";
      localStorage.setItem("RPSuser", newUser._id);
      loggedUserID = localStorage.getItem("RPSuser");
      document.querySelector(".modal_winner_body_notlogged").style.display =
        "none";
      document.querySelector(".modal_winner_body_logged").style.display =
        "block";
      document.querySelector(".modal_start_body-trial").style.display = "none";
      document.querySelector(".modal_start_body-logged").style.display =
        "block";
      document.querySelector(".nav_user-link").href = "#profile";
      document.querySelector("#review").style.display = "block";
      document.querySelector("div.highscore_sorting").style.display = "block";
      resetGame();
      fetchUser(newUser._id);
    });
}

// Country select options

function offerSelectOptionsSignup() {
  let selectCountry = document.querySelector(
    ".signup_select_form-country select"
  );
  let existingOption = document.querySelector(".signup_option_form-country")
    .value;
  for (let i = 0; i < countriesArray.length; i++) {
    let option = document.createElement("option");
    if (countriesArray[i].countryName != existingOption) {
      option.setAttribute("value", countriesArray[i].countryName);
      option.textContent = countriesArray[i].countryName;
      option.classList.add("fluidCountry");
      selectCountry.appendChild(option);
    }
  }
}

// Add the countries options for signup
// Execute after countriesArray is available

setTimeout(() => offerSelectOptionsSignup(), 500);

document
  .querySelector(".signup_select_form-country select")
  .addEventListener("change", updateSelectSignup);

function updateSelectSignup() {
  let options = document.querySelectorAll(".signup_select_form-country option");
  document
    .querySelector(".signup_option_form-country")
    .classList.remove("signup_option_form-country");
  options[event.target.selectedIndex].classList.remove("fluidCountry");
  options[event.target.selectedIndex].classList.add(
    "signup_option_form-country"
  );
}

function clearSelectOptionsSignup() {
  document.querySelectorAll(".fluidCountry").forEach(el => el.remove());
}

("use script");

// Declare globally in order to be used anywhere

let fluidFriendObject;

// Execute after userObject is available
function getUserFriends() {
  if (loggedUserID) {
    // setTimeout(() => {
    // If the user doesn't have friends, show 5 suggestions
    if (userObject.friends == "") {
      document.querySelector(".friends_current").style.display = "none";
      let num = 5;
      let arraySuggestions = [];
      let userFriends = ["none"];
      constructArrUsers(arraySuggestions, num, userFriends);
    } else {
      let userFriends = userObject.friends.split(",");

      // If the user has friends get them from db
      getFriends(userFriends);

      // If the user has more than three friends, show 1 suggestion

      if (userFriends.length >= 3) {
        let num = 1;
        let arraySuggestions = [];
        constructArrUsers(arraySuggestions, num, userFriends);
      } else {
        // If the user has less, show 3 suggestions
        let num = 3;
        let arraySuggestions = [];
        constructArrUsers(arraySuggestions, num, userFriends);
      }
    }
    // }, 6500);
  }
}
function getFriends(friends) {
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
      data.forEach(el => {
        // If the username from the array of friends matches the username
        // from the database add it as a friend entry
        friends.forEach(friend => {
          if (el.username == friend) {
            addFriendEntry(el);
          }
        });
      });
    });
}

// Disable buttons

function disableButtons() {
  document.querySelectorAll(".friends_container button").forEach(el => {
    el.style.color = "grey";
    el.style.border = "2px solid grey";
    el.disabled = true;
  });
}

// Enable buttons

function enableButtons() {
  document.querySelectorAll(".friends_container button").forEach(el => {
    el.style.color = "#5dfdcb";
    el.style.border = "2px solid #7186f5";
    el.disabled = false;
    location.reload();
  });
}

// Use the standard template for friends

function addFriendEntry(el) {
  let template = document.querySelector("#friends-current").content;
  let parent = document.querySelector(".friends_current-parent");
  let clone = template.cloneNode(true);
  clone.querySelector(".paragraph").textContent = el.username;
  // Add id to user
  clone.querySelector(".button").dataset.uuid = el._id;
  clone.querySelector("button").addEventListener("click", removeFriend);
  parent.appendChild(clone);
  // Create array for the friend for later use
  fluidFriendObject = {};
}

// Constructing suggestions, takes three parameters
// the empty array for storing suggestions, the number
// of suggestions/users needed to be shown and the
// already existent/inexistent of friends

function constructArrUsers(array, occurences, friends) {
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
      let i = 0;
      // j is used to parse through the data backwards
      let j = data.length - 1;
      while (i < occurences && j != 0) {
        // Check for name overlappings
        // If there are, the suggestion is already a friend
        let k = 0;

        // Check each friend with the selected user from the db
        friends.forEach(friend => {
          if (data[j].username == friend) {
            k++;
          }
        });

        if (k == 0) {
          array.push(data[j]);
          // Value decreases to check the next user
          j--;
          // Value increases as one suggestion is found
          i++;
        } else {
          j--;
        }
      }

      addFriendSuggestions(array, occurences, friends);
    });
}

// Construct suggestion with the standard template

function addFriendSuggestions(array, occurences, friends) {
  let template = document.querySelector("#friends-suggestion").content;
  let parent = document.querySelector(".friends_suggestion-parent");
  for (let i = 0; i < occurences; i++) {
    let clone = template.cloneNode(true);
    clone.querySelector(".paragraph").textContent = array[i].username;
    clone.querySelector(".button").dataset.uuid = array[i]._id;
    clone.querySelector(".button").addEventListener("click", addFriend);
    parent.appendChild(clone);
  }
}

// Adding friends

function addFriend() {
  let suggestedUsername = event.target.parentElement.querySelector(".paragraph")
    .textContent;
  // Name convention for the database in order to be able to use str functions effectively
  // Add new friend to logged in user's friends object property
  userObject.friends += "," + suggestedUsername;
  event.target.parentElement.remove();
  // Get friend from db through previously stored uuid on element
  getFriend(event.target.dataset.uuid);
  disableButtons();
  setTimeout(() => {
    // Add to the new friend object in the friends object property the logged in user's username
    fluidFriendObject.friends += "," + userObject.username;
    // Send both elements to the db for update
    changeStatus(userObject);
    changeStatus(fluidFriendObject);
    addFriendEntry(fluidFriendObject);
  }, 2000);
}

// Removing friends

function removeFriend() {
  let currentUsername = event.target.parentElement.querySelector(".paragraph")
    .textContent;
  currentUsername = "," + currentUsername;
  // Clear out friend from logged in user's friends object property
  userObject.friends = userObject.friends.replace(currentUsername, "");
  event.target.parentElement.remove();
  getFriend(event.target.dataset.uuid);
  disableButtons();
  setTimeout(() => {
    let loggedInUserUsername = userObject.username;
    loggedInUserUsername = "," + loggedInUserUsername;
    let fluidFriends = fluidFriendObject.friends;
    // Clear out logged in user from friend's friends object property
    fluidFriends = fluidFriends.replace(loggedInUserUsername, "");
    fluidFriendObject.friends = fluidFriends;
    // Send both elements to the db for update
    changeStatus(userObject);
    changeStatus(fluidFriendObject);
  }, 2000);
}

function getFriend(id) {
  fetch("https://rpsexam-61a3.restdb.io/rest/registeredusers/" + id, {
    method: "get",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": "5ddfb3cc4658275ac9dc201e",
      "cache-control": "no-cache"
    }
  })
    .then(e => e.json())
    .then(friend => {
      fluidFriendObject = friend;
    });
}

function changeStatus(editedUser) {
  fetch(
    "https://rpsexam-61a3.restdb.io/rest/registeredusers/" + editedUser._id,
    {
      method: "put",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "x-apikey": "5ddfb3cc4658275ac9dc201e",
        "cache-control": "no-cache"
      },
      body: JSON.stringify(editedUser)
    }
  )
    .then(e => e.json())
    .then(editedActivity => {
      enableButtons();
    });
}
