"useStrict";

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
start.addEventListener("click", startGame);

document
  .querySelector(".modal_winner_body_notlogged_buttons-login")
  .addEventListener("click", userSlider);

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
  options.disabled = true;
  option.addEventListener("click", function() {
    options.forEach(e => {
      e.disabled = true;
    });

    generatedHand = optionsPC[Math.floor(Math.random() * 8)];
    let result = null;

    setTimeout(() => {
      playerh.src = `assets/hands/hand_${option.textContent}.svg`;
      computerh.src = `assets/hands/hand_${generatedHand}.svg`;

      result = aRound(option.textContent, generatedHand);

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
  console.log(playerHand, computerHand);
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
  document.querySelector(".app_wins-userw span").textContent = game.userWin;
  document.querySelector(".app_wins-pcw span").textContent = game.pcWin;
}

function checkScore() {
  if (game.userWin == 2 || game.pcWin == 2) {
    modalWin.style.display = "grid";
    options.forEach(e => {
      e.disabled = true;
    });
    if (game.userWin == 2) {
      document.querySelector(".modal_winner_body-message").textContent =
        "Congratulations! You won!";
    } else if (game.pcWin) {
      document.querySelector(".modal_winner_body-message").textContent =
        "Oh no! You lost...";
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
    }
  }
}

function resetGame() {
  game.userWin = 0;
  game.pcWin = 0;
  updateScore();
  modalWin.style.display = "none";
  document.querySelector(".app_result").style.visibility = "hidden";
  playerh.src = `assets/hands/hand_default.svg`;
  computerh.src = `assets/hands/hand_default.svg`;
  document.querySelector(".userh span").textContent = "";
  document.querySelector(".pch span").textContent = "";
  options.forEach(e => {
    e.disabled = false;
  });
  modalStart.style.display = "grid";
}

function startGame() {
  options.forEach(e => {
    e.disabled = false;
  });
  modalStart.style.display = "none";
  if (loggedUserID) {
    console.log(inputAmount.value);
    bet.textContent = 2 * Number(inputAmount.value);
    bet.style.visibility = "visible";
    userObject.coins = userObject.coins - Number(inputAmount.value);
    populateUserInfo(userObject);
  }
}
