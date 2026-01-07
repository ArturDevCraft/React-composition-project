import CalendarApi from './calendarApi';

function validate(e, fields) {
	e.preventDefault();
	const errors = [];

	fields.forEach((field) => {
		const value = e.target[field.name].value;
		const label = e.target[field.name].labels[0].firstChild.textContent;

		if (field.required && !isNotEmpty(value)) {
			errors.push(label + ' jest puste');
		} else if (field.pattern) {
			!checkPattern(field.pattern, value) &&
				errors.push(label + ' ma niewłaściwy format');
		}
	});

	if (errors.length > 0) {
		return errors;
	}
	return true;
}

function isNotEmpty(string = null) {
	if (string === null || string.trim() === '') {
		return false;
	}
	return true;
}

function checkPattern(pattern, val) {
	const regex = new RegExp(pattern);
	return regex.test(val);
}
