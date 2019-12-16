"use script";

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
  }, 2500);
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
      console.log(editedActivity);
      enableButtons();
    });
}
