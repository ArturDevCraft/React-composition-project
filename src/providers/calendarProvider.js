import CalendarApi from './calendarApi';
const api = new CalendarApi();

export async function submitMeeting(e, fields, data, setState) {
	e.preventDefault();
	const errors = validate(e, fields);
	if (errors === null) {
		setState({ errors: [], formKey: Math.random() });
		try {
			const newMeeting = await api.add(data);
			updateMeetingsState(setState, 'add', newMeeting);
		} catch (err) {
			alert(err);
		}
	} else {
		setState({ errors: errors });
	}
}

export async function deleteMeeting(id, setState) {
	try {
		await api.delete(id);
		updateMeetingsState(setState, 'delete', id);
	} catch (err) {
		alert(err);
	}
}

export async function getFieldHints(field, like) {
	try {
		const data = await api.get();
		const uniqueData = new Set();

		data.forEach((item) => {
			if (isValueLike(item[field], like)) {
				uniqueData.add(item[field]);
			}
		});

		return Array.from(uniqueData);
	} catch (err) {
		alert(err);
	}
}

export async function loadMeetingsList(setState) {
	try {
		const meetingsList = await api.get();
		setState({ meetings: meetingsList });
	} catch (err) {
		alert(err);
	}
}

function isValueLike(value, like) {
	return value.toLowerCase().includes(like.toLowerCase());
}

function updateMeetingsState(setState, operation, data) {
	if (operation === 'add') {
		setState((state) => {
			return { meetings: [...state.meetings, { ...data }] };
		});
	}

	if (operation === 'delete') {
		setState((state) => {
			const newState = [...state.meetings];
			const filtred = newState.filter((item) => item.id !== data);
			return { meetings: [...filtred] };
		});
	}
}

function validate(e, fields) {
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
