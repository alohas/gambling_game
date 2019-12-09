"use strict";

const moreBtn = document.querySelector(".slider_right-button");
let slided = false;

moreBtn.addEventListener("click", e => {
  if (!slided) {
    document.querySelector(".slider").style.animation = "";
    document.querySelector(".slider").style.animation =
      "sliderFullIn 0.4s ease-in forwards";
    slided = true;
  } else {
    document.querySelector(".slider").style.animation = "";
    document.querySelector(".slider").style.animation =
      "sliderOut 0.4s ease-in forwards";
    slided = false;
  }
});
