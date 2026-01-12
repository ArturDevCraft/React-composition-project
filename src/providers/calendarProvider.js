import CalendarApi from './calendarApi';
const api = new CalendarApi();

export async function submitMeeting(e, fields, data) {
	e.preventDefault();
	const errors = validate(e, fields);
	if (errors === null) {
		this.setState({ errors: [], formKey: Math.random() });
		try {
			const newMeeting = await api.add(data);
			updateMeetingsState(this, 'add', newMeeting);
		} catch (err) {
			alert(err);
		}
	} else {
		this.setState({ errors: errors });
	}
}

export async function deleteMeeting(id) {
	try {
		await api.delete(id);
		updateMeetingsState(this, 'delete', id);
	} catch (err) {
		alert(err);
	}
}

export async function getFieldHints(field, like) {
	try {
		const data = await api.get();
		const uniqueData = new Set();
		data.forEach((item) => {
			if (item[field].toLowerCase().includes(like.toLowerCase())) {
				uniqueData.add(item[field]);
			}
		});
		return Array.from(uniqueData);
	} catch (err) {
		alert(err);
	}
}

export async function loadMeetingsList(component) {
	try {
		const meetingsList = await api.get();
		component.setState({ meetings: meetingsList });
	} catch (err) {
		alert(err);
	}
}

function updateMeetingsState(component, operation, data) {
	if (operation === 'add') {
		component.setState((state) => {
			return { meetings: [...state.meetings, { ...data }] };
		});
	}

	if (operation === 'delete') {
		component.setState((state) => {
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
