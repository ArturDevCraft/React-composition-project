import React from 'react';
import CalendarForm from './CalendarForm';
import CalendarList from './CalendarList';
import Errors from './Errors';
import { validate } from '../helpers/calendarHelper';
import CalendarApi from '../providers/CalendarApi';

class Calendar extends React.Component {
	formFields = [
		{ name: 'firstName', label: 'Imię', regex: /.{2,20}/, required: true },
		{ name: 'lastName', label: 'Nazwisko', regex: /.{2,20}/, required: true },
		{
			name: 'email',
			label: 'E-mail',
			type: 'email',
			regex: /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}/,
			required: true,
		},
		{
			name: 'date',
			label: 'Data',
			type: 'date',
			regex: /^\d{1,4}[./-]\d{1,2}[./-]\d{1,4}$/,
			required: true,
		},
		{
			name: 'time',
			label: 'Godzina',
			type: 'time',
			regex: /^(?:[0-9]|0\d|2[0-3]|1\d):[0-5]\d$/,
			required: true,
		},
	];

	state = { errors: [], meetings: [], formKey: Math.random() };

	api = new CalendarApi();

	loadMeetingsList = async () => {
		try {
			const meetingsList = await this.api.get();
			this.setState({ meetings: meetingsList });
		} catch (err) {
			alert(err);
		}
	};

	submitMeeting = async (e, data) => {
		e.preventDefault();
		const errors = validate(e, this.formFields);
		if (errors === null) {
			this.setState({ errors: [], formKey: Math.random() });
			try {
				const newMeeting = await this.api.add(data);
				this.setState((state) => {
					return { meetings: [...state.meetings, { ...newMeeting }] };
				});
			} catch (err) {
				alert(err);
			}
		} else {
			this.setState({ errors: errors });
		}
	};

	deleteMeeting = async (id) => {
		try {
			await this.api.delete(id);
			this.setState((state) => {
				const newState = [...state.meetings];
				const filtred = newState.filter((item) => item.id !== id);
				return { meetings: [...filtred] };
			});
		} catch (err) {
			alert(err);
		}
	};

	componentDidMount() {
		this.loadMeetingsList();
	}

	render() {
		const { errors, meetings, formKey } = this.state;
		return (
			<div className="booking-app">
				<Errors errors={errors} />
				<CalendarForm
					key={formKey}
					fields={this.formFields}
					submitHandler={this.submitMeeting}
					errors={errors}
				/>
				<CalendarList meetings={meetings} deleteHandler={this.deleteMeeting} />
			</div>
		);
	}
}

export default Calendar;
