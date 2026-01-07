import CalendarApi from './calendarApi';

export function submitMeeting(e, fields, data) {
	const api = new CalendarApi();
	e.preventDefault();
	const errors = validate(e, fields);
	if (errors === null) {
		api.add(data);
		e.target.reset();
	}
	return errors;
}

function validate(e, fields) {
	e.preventDefault();
	const errors = [];

	fields.forEach((field) => {
		const value = e.target[field.name].value;
		const label = e.target[field.name].placeholder;

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
	return null;
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
