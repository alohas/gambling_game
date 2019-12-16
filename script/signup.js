'use strict';

// User object immitating the user in the db

let newUser = {
	age: 0,
	bonus_collected: null,
	coins: 0,
	country: 'Antarctica',
	email: 'email@com',
	friends: '',
	imageName: 'avatar-3',
	password: 'mypassword',
	previous_bonus: null,
	review: '',
	starRate: 0,
	streak: 7,
	suspended: false,
	username: 'newUser'
};

function getUsers(valueInput, propertyToCheck) {
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
				if (el[propertyToCheck] == valueInput) {
					alert('Pick another ' + propertyToCheck + '!');
				}
			});
		});
}

document.querySelector('.signup_form-button').addEventListener('click', (e) => {
	e.preventDefault();

	// Manual form validation due to preventDefault()

	if (document.querySelector('.signup_form').checkValidity()) {
		getInputValues();
	} else {
		document.querySelector('.signup_form').reportValidity();
	}
});

// Check if the user has typed an already existing username with the db

document.querySelector('.signup_form-username').addEventListener('change', usernameCheck);

function usernameCheck() {
	let usernameInput = document.querySelector('.signup_form-username input').value;
	let username = 'username';
	getUsers(usernameInput, username);
}

// Check if the user has typed an already existing email with the db

document.querySelector('.signup_form-email').addEventListener('change', emailCheck);

function emailCheck() {
	let emailInput = document.querySelector('.signup_form-email input').value;
	let email = 'email';
	getUsers(emailInput, email);
}

// After the signup button is clicked and if it validates
// we update the user object with input from the user

function getInputValues() {
	let usernameInput = document.querySelector('.signup_form-username input').value;
	let emailInput = document.querySelector('.signup_form-email input').value;
	let passwordInput = document.querySelector('.signup_form-password input').value;
	let countryInput = document.querySelector('.signup_option_form-country').textContent;
	let ageInput = document.querySelector('.signup_form-age input').value;

	newUser.username = usernameInput;
	newUser.email = emailInput;
	newUser.password = passwordInput;
	newUser.country = countryInput;
	newUser.age = ageInput;

	postUser(newUser);
}

// Send the user to the database

function postUser(user) {
	console.log(user);
	fetch('https://rpsexam-61a3.restdb.io/rest/registeredusers', {
		method: 'post',
		headers: {
			'Content-Type': 'application/json; charset=utf-8',
			'x-apikey': '5ddfb3cc4658275ac9dc201e',
			'cache-control': 'no-cache'
		},
		body: JSON.stringify(user)
	})
		.then((e) => e.json())
		.then((newActivity) => {
			console.log(newActivity);
		});
}

// Country select options

function offerSelectOptionsSignup() {
	let selectCountry = document.querySelector('.signup_select_form-country select');
	let existingOption = document.querySelector('.signup_option_form-country').value;
	for (let i = 0; i < countriesArray.length; i++) {
		let option = document.createElement('option');
		if (countriesArray[i].countryName != existingOption) {
			option.setAttribute('value', countriesArray[i].countryName);
			option.textContent = countriesArray[i].countryName;
			option.classList.add('fluidCountry');
			selectCountry.appendChild(option);
		}
	}
}

// Add the countries options for signup
// Execute after countriesArray is available

setTimeout(() => offerSelectOptionsSignup(), 500);

document.querySelector('.signup_select_form-country select').addEventListener('change', updateSelectSignup);

function updateSelectSignup() {
	let options = document.querySelectorAll('.signup_select_form-country option');
	document.querySelector('.signup_option_form-country').classList.remove('signup_option_form-country');
	options[event.target.selectedIndex].classList.remove('fluidCountry');
	options[event.target.selectedIndex].classList.add('signup_option_form-country');
}

function clearSelectOptionsSignup() {
	document.querySelectorAll('.fluidCountry').forEach((el) => el.remove());
}
