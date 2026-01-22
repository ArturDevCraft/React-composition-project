export function validate(e, fields) {
	e.preventDefault();
	const errors = [];

	fields.forEach((field) => {
		const value = e.target[field.name].value;
		const label = e.target[field.name].placeholder;

		if (field.required && !isNotEmpty(value)) {
			errors.push({
				field: field.name,
				message: 'Pole: ' + label + ' jest puste',
			});
		} else if (field.regex) {
			!checkPattern(field.regex, value) &&
				errors.push({
					field: field.name,
					message: 'Pole: ' + label + ' ma niewłaściwy format',
				});
		}
	});

	if (errors.length > 0) {
		return errors;
	}
	return null;
}

export function isValueLike(value, like) {
	return value.toLowerCase().includes(like.toLowerCase());
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
