'use script';

let iconSVG = '';
let fluidFriendObject;

setTimeout(() => {
	if (userObject.friends == '') {
		document.querySelector('.friends_current').style.display = 'none';
		let num = 5;
		let arraySuggestions = [];
		let userFriends = [ 'none' ];
		constructArrUsers(arraySuggestions, num, userFriends);
	} else {
		let userFriends = userObject.friends.split(',');
		getFriends(userFriends);
		if (userFriends.length >= 3) {
			let num = 1;
			let arraySuggestions = [];
			constructArrUsers(arraySuggestions, num, userFriends);
		} else {
			let num = 3;
			let arraySuggestions = [];
			constructArrUsers(arraySuggestions, num, userFriends);
		}
	}
}, 6500);

function getFriends(friends) {
	fetch('https://rpsexam-61a3.restdb.io/rest/registeredusers', {
		method: 'get',
		headers: {
			'Content-Type': 'application/json; charset=utf-8',
			'x-apikey': '5ddfb3cc4658275ac9dc201e',
			'cache-control': 'no-cache'
		}
	})
		.then((e) => e.json())
		.then((data) => {
			data.forEach((el) => {
				friends.forEach((friend) => {
					if (el.username == friend) {
						addFriendEntry(el);
					}
				});
			});
		});
}

function addFriendEntry(el) {
	let template = document.querySelector('#friends-current').content;
	let parent = document.querySelector('.friends_current-parent');
	let clone = template.cloneNode(true);
	clone.querySelector('.paragraph').textContent = el.username;
	clone.querySelector('.button').dataset.uuid = el._id;
	clone.querySelector('button').addEventListener('click', removeFriend);
	parent.appendChild(clone);
	fluidFriendObject = {};
}

function constructArrUsers(array, occurences, friends) {
	fetch('https://rpsexam-61a3.restdb.io/rest/registeredusers', {
		method: 'get',
		headers: {
			'Content-Type': 'application/json; charset=utf-8',
			'x-apikey': '5ddfb3cc4658275ac9dc201e',
			'cache-control': 'no-cache'
		}
	})
		.then((e) => e.json())
		.then((data) => {
			let i = 0;
			let j = data.length - 1;
			while (i < occurences && j != 0) {
				// console.log(data[j].username);
				let k = 0;

				friends.forEach((friend) => {
					if (data[j].username == friend) {
						k++;
					}
				});

				if (k == 0) {
					array.push(data[j]);
					j--;
					i++;
				} else {
					j--;
				}
			}

			addFriendSuggestions(array, occurences, friends);
		});
}

function addFriendSuggestions(array, occurences, friends) {
	let template = document.querySelector('#friends-suggestion').content;
	let parent = document.querySelector('.friends_suggestion-parent');
	for (let i = 0; i < occurences; i++) {
		let clone = template.cloneNode(true);
		clone.querySelector('.paragraph').textContent = array[i].username;
		clone.querySelector('.button').dataset.uuid = array[i]._id;
		clone.querySelector('.button').addEventListener('click', addFriend);
		parent.appendChild(clone);
	}
}

function addFriend() {
	let suggestedUsername = event.target.parentElement.querySelector('.paragraph').textContent;
	userObject.friends += ',' + suggestedUsername;
	event.target.parentElement.remove();
	getFriend(event.target.dataset.uuid);
	setTimeout(() => {
		fluidFriendObject.friends += ',' + userObject.username;
		changeStatus(userObject);
		changeStatus(fluidFriendObject);
		addFriendEntry(fluidFriendObject);
	}, 2000);
}

function removeFriend() {
	let currentUsername = event.target.parentElement.querySelector('.paragraph').textContent;
	currentUsername = ',' + currentUsername;
	userObject.friends = userObject.friends.replace(currentUsername, '');
	event.target.parentElement.remove();
	getFriend(event.target.dataset.uuid);
	setTimeout(() => {
		let loggedInUserUsername = userObject.username;
		loggedInUserUsername = ',' + loggedInUserUsername;
		let fluidFriends = fluidFriendObject.friends;
		fluidFriends = fluidFriends.replace(loggedInUserUsername, '');
		fluidFriendObject.friends = fluidFriends;
		changeStatus(userObject);
		changeStatus(fluidFriendObject);
	}, 2500);
}

function getFriend(id) {
	fetch('https://rpsexam-61a3.restdb.io/rest/registeredusers/' + id, {
		method: 'get',
		headers: {
			'Content-Type': 'application/json; charset=utf-8',
			'x-apikey': '5ddfb3cc4658275ac9dc201e',
			'cache-control': 'no-cache'
		}
	})
		.then((e) => e.json())
		.then((friend) => {
			fluidFriendObject = friend;
		});
}

function changeStatus(editedUser) {
	fetch('https://rpsexam-61a3.restdb.io/rest/registeredusers/' + editedUser._id, {
		method: 'put',
		headers: {
			'Content-Type': 'application/json; charset=utf-8',
			'x-apikey': '5ddfb3cc4658275ac9dc201e',
			'cache-control': 'no-cache'
		},
		body: JSON.stringify(editedUser)
	})
		.then((e) => e.json())
		.then((editedActivity) => {
			console.log(editedActivity);
		});
}
