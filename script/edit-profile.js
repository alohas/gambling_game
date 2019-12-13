'use strict';

get();

// Fetch the country API in order to populate the select form element

const countryAPI = 'https://restcountries.eu/rest/v2/all';
let countriesArray = [];

fetch(countryAPI).then((e) => e.json()).then((countries) => {
	countries.forEach((country) => {
		let countryObj = {
			countryName: '',
			countryAlpha2Code: ''
		};
		countryObj.countryName = country.name;
		countryObj.countryAlpha2Code = country.alpha2Code;
		countriesArray.push(countryObj);
	});
});

function offerSelectOptions() {
	let selectCountry = document.querySelector('.select_form-country select');
	let existingOption = document.querySelector('.option_form-country').value;
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

document.querySelector('.select_form-country select').addEventListener('change', updateSelect);

function updateSelect() {
	let options = document.querySelectorAll('option');
	document.querySelector('.option_form-country').classList.remove('option_form-country');
	options[event.target.selectedIndex].classList.remove('fluidCountry');
	options[event.target.selectedIndex].classList.add('option_form-country');
}

function clearSelectOptions() {
	document.querySelectorAll('.fluidCountry').forEach((el) => el.remove());
}

// Add event listeners to edit profile options

document.querySelector('.edit-profile').addEventListener('click', showUserEdit);
document.querySelector('.editUser_form-login_back').addEventListener('click', closeEditUser);
document.querySelector('.confirmModifications_form-login_back').addEventListener('click', closeConfirmModifications);
document.querySelector('.modifyPassword_form-login_back').addEventListener('click', closeModifyPassword);

function closeEditUser() {
	document.querySelector('.editUser').style.display = 'none';
	clearSelectOptions();
	document.querySelector('.editUser_paragraph-alertNoModifs').style.display = 'none';
}

function closeConfirmModifications() {
	document.querySelector('.confirmModifications').style.display = 'none';
}

function closeModifyPassword() {
	document.querySelector('.modifyPassword').style.display = 'none';
	document.querySelector('.modifyPassword_paragraph-alert').style.display = 'none';
}

// console.log(userObject);

function showUserEdit() {
	let editUser = document.querySelector('.editUser');
	editUser.style.display = 'block';
	editUser.querySelector('.editUser_form-username input').setAttribute('placeholder', userObject.username);
	editUser.querySelector('.editUser_form-email input').setAttribute('placeholder', userObject.email);
	editUser.querySelector('.option_form-country').setAttribute('value', userObject.country);
	editUser.querySelector('.option_form-country').textContent = userObject.country;
	editUser.querySelector('.editUser_form-age input').setAttribute('placeholder', userObject.age);
	offerSelectOptions();
}

document.querySelector('.editUser_form-login').addEventListener('click', () => {
	checkForChanges();
});

// IMPORTANT
// Add headlines to incoming forms
// After saving changes let the user know about them
// Validate for mistakes
// Clear out spaces
// Validate password not to have spaces
// Log out button
// edit user saves in value the recently tiped thing before
// confirming
// check for signup validation not the same username in the db
// check for form validation on click

let saveChangesTrigger = false;

function checkForChanges() {
	let selector = [
		'.editUser_form-username input',
		'.editUser_form-email input',
		'.option_form-country',
		'.editUser_form-age input'
	];
	let selectorObject = [ 'username', 'email', 'country', 'age' ];
	for (let i = 0; i < 4; i++) {
		if (
			document.querySelector(selector[i]).value != '' &&
			document.querySelector(selector[i]).value != userObject[selectorObject[i]]
		) {
			userObject[selectorObject[i]] = document.querySelector(selector[i]).value;
			saveChangesTrigger = true;
		}
	}
	if (saveChangesTrigger == false) {
		document.querySelector('.editUser_paragraph-alertNoModifs').style.display = 'block';
	} else {
		showPasswordConfirmation();
	}
}

// Edit the user

function put(editedUser) {
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

function showPasswordConfirmation() {
	document.querySelector('.editUser').style.display = 'none';
	document.querySelector('.confirmModifications').style.display = 'block';
}

document.querySelector('.confirmModifications_form-login').addEventListener('click', (e) => {
	e.preventDefault();
	validatePasswordInput();
});

// Validate with password for profile modifications

function validatePasswordInput() {
	let typedPassword = document.querySelector('.confirmModifications_form-password input').value;
	if (userObject.password == typedPassword) {
		populateUserInfo(userObject);
		put(userObject);
		closeConfirmModifications();
	} else if (userObject.password != typedPassword && typedPassword != '') {
		document.querySelector('.confirmModifications_paragraph-alert').style.display = 'block';
		document.querySelector('.confirmModifications_paragraph-alert').textContent = 'Wrong password :( ';
	} else if (typedPassword == '') {
		// make fields mint BUG
		console.log('no input');
	}
}

// Modify the password

document.querySelector('.editUser_paragraph-modifyPassword').addEventListener('click', showModifyPassword);

function showModifyPassword() {
	document.querySelector('.modifyPassword').style.display = 'block';
}

document.querySelector('.modifyPassword_form-login').addEventListener('click', (e) => {
	e.preventDefault();
	passwordCheckOld();
});

function passwordCheckOld() {
	if (document.querySelector('.modifyPassword_form-password input').value == userObject.password) {
		passwordCheckMatch();
	} else {
		document.querySelector('.modifyPassword_paragraph-alert').style.display = 'block';
		document.querySelector('.modifyPassword_paragraph-alert').textContent = 'Wrong password :(';
	}
}

function passwordCheckMatch() {
	if (
		document.querySelector('.modifyPassword_form-password_new input').value != '' ||
		document.querySelector('.modifyPassword_form-password_new-retype input').value != '' ||
		(document.querySelector('.modifyPassword_form-password_new-retype input').value != '' &&
			document.querySelector('.modifyPassword_form-password_new input').value != '')
	) {
		if (
			document.querySelector('.modifyPassword_form-password_new input').value ==
			document.querySelector('.modifyPassword_form-password_new-retype input').value
		) {
			modifyPassword();
		} else {
			document.querySelector('.modifyPassword_paragraph-alert').textContent = 'No match between passwords';
			document.querySelector('.modifyPassword_paragraph-alert').style.display = 'block';
		}
	} else {
		document.querySelector('.modifyPassword_paragraph-alert').style.display = 'block';
		document.querySelector('.modifyPassword_paragraph-alert').textContent = 'Please type in the new password twice';
	}
}

// The form needs to be cleared out

function modifyPassword() {
	userObject.password = document.querySelector('.modifyPassword_form-password_new input').value;
	put(userObject);
	closeModifyPassword();
}
