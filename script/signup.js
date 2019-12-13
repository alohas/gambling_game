'use strict';

let newUser = {
	age: 0,
	bonus_collected: null,
	coins: 0,
	country: 'Antarctica',
	datePosted: null,
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
	getInputValues();
});

document.querySelector('.signup_form-username').addEventListener('change', usernameCheck);

function usernameCheck() {
	let usernameInput = document.querySelector('.signup_form-username input').value;
	let username = 'username';
	getUsers(usernameInput, username);
}

document.querySelector('.signup_form-email').addEventListener('change', emailCheck);

function emailCheck() {
	let emailInput = document.querySelector('.signup_form-email input').value;
	let email = 'email';
	getUsers(emailInput, email);
}

function getInputValues() {
	let usernameInput = document.querySelector('.signup_form-username input').value;
	let emailInput = document.querySelector('.signup_form-email input').value;
	let passwordInput = document.querySelector('.signup_form-password input').value;
	let ageInput = document.querySelector('.signup_form-age input').value;
}

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

setTimeout(() => offerSelectOptionsSignup(), 500);

document.querySelector('.signup_select_form-country select').addEventListener('change', updateSelect);

function updateSelectSignup() {
	let options = document.querySelectorAll('option');
	document.querySelector('.signup_option_form-country').classList.remove('signup_option_form-country');
	options[event.target.selectedIndex].classList.remove('fluidCountry');
	options[event.target.selectedIndex].classList.add('signup_option_form-country');
}

function clearSelectOptionsSignup() {
	document.querySelectorAll('.fluidCountry').forEach((el) => el.remove());
}
