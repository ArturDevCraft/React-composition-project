import React from 'react';
import CalendarForm from './CalendarForm';
import CalendarList from './CalendarList';
import Errors from './Errors';
import {
	submitMeeting,
	loadMeetingsList,
	deleteMeeting,
} from '../providers/calendarProvider';

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

	componentDidMount() {
		loadMeetingsList((state) => this.setState(state));
	}

	submitHandler = (e, fields, data) => {
		submitMeeting(e, fields, data, (state) => this.setState(state));
	};

	deleteHandler = (id) => {
		deleteMeeting(id, (state) => this.setState(state));
	};

	render() {
		const { errors, meetings, formKey } = this.state;
		return (
			<div className="booking-app">
				<Errors errors={errors} />
				<CalendarForm
					key={formKey}
					fields={this.formFields}
					submitHandler={this.submitHandler}
					errors={errors}
				/>
				<CalendarList meetings={meetings} deleteHandler={this.deleteHandler} />
			</div>
		);
	}
}

export default Calendar;
