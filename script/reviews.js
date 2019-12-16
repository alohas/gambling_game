"use strict";

console.log(userObject);

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
  clone.querySelector(".usernameUser").textContent = user.username;
  let starsHTML = "";
  for (let i = 0; i < user.starRate; i++) {
    starsHTML += '<img src="assets/images/star_full.png" alt="Star Rate"/>';
  }
  for (let i = 0; i < 5 - user.starRate; i++) {
    starsHTML += '<img src="assets/images/star_empty.png" alt="Star Rate"/>';
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
  console.log(rating);
  for (let i = 0; i < rating; i++) {
    stars[i].classList.add("full");
  }
  for (let star of stars) {
    if (star.classList[2] == "full") {
      star.src = "assets/images/star_full.png";
    } else {
      star.src = "assets/images/star_empty.png";
    }
  }
}

document.querySelector(".reviews_add-post").addEventListener("click", e => {
  e.preventDefault();
  modifyUserObject();
  e.target.textContent = "posted";
  e.target.style.color = "#7186f5";
  document.querySelector("#review > textarea").value = " ";
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
