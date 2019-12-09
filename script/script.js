"use strict";

const moreBtn = document.querySelector(".slider_right-button");
const userBtn = document.querySelector(".nav_user");
const menuBtn = document.querySelector(".nav_menu");
let slidedMore = false;
let slidedMenu = false;
let slidedUser = false;

moreBtn.addEventListener("click", e => {
  if (!slidedMore) {
    document.querySelector(".slider").style.animation = "";
    document.querySelector(".slider").style.animation =
      "sliderFullIn 0.4s ease-in forwards";
    slidedMore = true;
  } else {
    document.querySelector(".slider").style.animation = "";
    document.querySelector(".slider").style.animation =
      "sliderOut 0.4s ease-in forwards";
    slidedMore = false;
  }
});

userBtn.addEventListener("click", e => {
  if (!slidedUser) {
    document.querySelector(".login").style.visibility = "visible";
    slidedUser = true;
  } else {
    document.querySelector(".login").style.visibility = "hidden";
    slidedUser = false;
  }
});

menuBtn.addEventListener("click", e => {
  if (!slidedMenu) {
    document.querySelector(".menu").style.visibility = "visible";
    slidedMenu = true;
  } else {
    document.querySelector(".menu").style.visibility = "hidden";
    slidedMenu = false;
  }
});
