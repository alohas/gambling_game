"use strict";

console.log(userObject);

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
      users.forEach(user => {
        if (user.review != "") {
          if (user.review != undefined) {
            populateReviews(user);
          }
        }
      });
    });
}

// The buttons on the menu don't close when you click to go on one another

// Use this to randomize avatar names

// for (let i = 0; i < users.length; i++) {
//   let randomNum = Math.floor(Math.random() * 3) + 1;
//   users[i].imageName = 'avatar-' + randomNum;
//   put(users[i]);
// }

function populateReviews(user) {
  let parent = document.querySelector(".reviews_see");
  let template = document.querySelector(".review-template").content;
  let clone = template.cloneNode(true);
  clone.querySelector(".avatarUser").textContent = user.imageName;
  clone.querySelector(".usernameUser").textContent = user.username;
  clone.querySelector(".starUser").textContent = user.starRate;
  clone.querySelector(".reviewUser").textContent = user.review;
  parent.appendChild(clone);
}

fetchReviews();

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
  document.querySelector("textarea").style.color = "rgba(255, 255, 255, 0.4)";
});

function modifyUserObject() {
  let starRate = document.querySelectorAll(".full").length;
  userObject.starRate = starRate;
  userObject.review = document.querySelector(".reviews_add-input").value;
  putReviews(userObject);
}

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
      populateReviews(editedActivity);
    });
}

// Next to add are pages + edit own comment
