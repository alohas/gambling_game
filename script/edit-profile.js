'use strict';

//get();

// Fetch the country API in order to populate the select form element
const countryAPI = 'https://restcountries.eu/rest/v2/all';

// Global declaration in order to be able to always access it
let countriesArray = [];

function fetchCountries() {
	fetch(countryAPI).then((e) => e.json()).then((countries) => {
		countries.forEach((country) => {
			let countryObj = {
				countryName: '',
				countryAlpha2Code: ''
			};

			// Push data to the array of objects

			countryObj.countryName = country.name;
			countryObj.countryAlpha2Code = country.alpha2Code;
			countriesArray.push(countryObj);
		});
	});
}

fetchCountries();

// Populate select with option elements with the values and text content
// set from the countries array

function offerSelectOptions() {
	let selectCountry = document.querySelector('.select_form-country select');
	let existingOption = document.querySelector('.option_form-country').value;
	for (let i = 0; i < countriesArray.length; i++) {
		let option = document.createElement('option');
		// Compare to exclude already existing option
		if (countriesArray[i].countryName != existingOption) {
			option.setAttribute('value', countriesArray[i].countryName);
			option.textContent = countriesArray[i].countryName;
			option.classList.add('fluidCountry');
			selectCountry.appendChild(option);
		}
	}
}

document.querySelector('.select_form-country select').addEventListener('change', updateSelect);

// On each change update the classes on option elements so that they can be cleared out

function updateSelect() {
	let options = document.querySelectorAll('.select_form-country option');
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

	// Link to a different section of the page

	window.location.hash = '#profile';
	clearSelectOptions();
	document.querySelector('.editUser_paragraph-alertNoModifs').style.display = 'none';
}

function closeConfirmModifications() {
	document.querySelector('.confirmModifications').style.display = 'none';
}

function closeModifyPassword() {
	document.querySelector('.modifyPassword').style.display = 'none';
	document.querySelector('.modifyPassword_paragraph-alertWrongPass').style.display = 'none';
	document.querySelector('.modifyPassword_paragraph-alertNoMatch').style.display = 'none';
	// document.querySelector('.modifyPassword').style.display = 'none';
	// document.querySelector('.modifyPassword_paragraph-alert').style.display = 'none';
}

// console.log(userObject);

// Populate the form with already existent info about the logged in user

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

document.querySelector('.editUser_form-login').addEventListener('click', (e) => {
	// Check for form validity manually
	e.preventDefault();
	let k = 0;
	let selector = [
		'.editUser_form-username input',
		'.editUser_form-email input',
		'.option_form-country',
		'.editUser_form-age input'
	];
	selector.forEach((el) => {
		if (document.querySelector(el).value == '') {
			k++;
		}
	});
	if (k == 3) {
		document.querySelector('.editUser_form').reportValidity();
	} else {
		checkForChanges();
	}
});

let saveChangesTrigger = false;

// If there's valid input, check for values differences

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
			// If there are values differences update the saved user object with them
			userObject[selectorObject[i]] = document.querySelector(selector[i]).value;
			// and store true in variable in order to be later on used
			saveChangesTrigger = true;
		} else if (document.querySelector(selector[i]).value == userObject[selectorObject[i]]) {
			document.querySelector(selector[i]).input = document.querySelector(selector[i]).value;
		}
	}
	if (saveChangesTrigger == false) {
		document.querySelector('.editUser_paragraph-alertNoModifs').style.display = 'block';
	} else {
		// If variable is true show password confirmation window
		showPasswordConfirmation();
	}
}

// Modify the password

document.querySelector('.editUser_paragraph-modifyPassword').addEventListener('click', showModifyPassword);

function showModifyPassword() {
	document.querySelector('.modifyPassword').style.display = 'block';
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
	// If the confirm button is clicked check for password match
	// from the input and the database
	validatePasswordInput();
});

// Validate with password for profile modifications

function validatePasswordInput() {
	let typedPassword = document.querySelector('.confirmModifications_form-password input').value;
	if (userObject.password == typedPassword) {
		// If there is a match the user is updated in the website

		populateUserInfo(userObject);

		// The user is updated in the database

		put(userObject);
		closeConfirmModifications();
	} else {
		document.querySelector('.confirmModifications_paragraph-alertWrongPass').style.display = 'block';
	}
}

// Changing password section

document.querySelector('.modifyPassword_form-login').addEventListener('click', (e) => {
	e.preventDefault();

	// Check for validation manually due to preventDefault()

	if (document.querySelector('.modifyPassword_form').checkValidity()) {
		passwordCheckOld();
	} else {
		document.querySelector('.modifyPassword_form').reportValidity();
	}
});

// Display customized error messages depending on the user's mistake

function passwordCheckOld() {
	if (document.querySelector('.modifyPassword_form-password input').value == userObject.password) {
		passwordCheckMatch();
	} else {
		document.querySelector('.modifyPassword_paragraph-alertWrongPass').style.display = 'block';
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
			document.querySelector('.modifyPassword_paragraph-alertNoMatch').textContent =
				' No match between passwords';
			document.querySelector('.modifyPassword_paragraph-alertNoMatch').style.display = 'block';
		}
	} else {
		document.querySelector('.modifyPassword_paragraph-alertNoMatch').style.display = 'block';
		document.querySelector('.modifyPassword_paragraph-alertNoMatch').textContent =
			'Please type in the new passwords';
	}
}

function modifyPassword() {
	userObject.password = document.querySelector('.modifyPassword_form-password_new input').value;

	// If everything checks send the user to the db and close window

	put(userObject);
	closeModifyPassword();
}
