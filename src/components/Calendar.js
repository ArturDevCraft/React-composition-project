import React from 'react';
import CalendarForm from './CalendarForm';
import CalendarList from './CalendarList';
import { submitMeeting } from '../providers/calendarProvider';

class Calendar extends React.Component {
	formFields = [
		{ name: 'firstName', label: 'Imię', regex: '/.{2,20}/' },
		{ name: 'lastName', label: 'Nazwisko', regex: '/.{2,20}/' },
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
			regex: /^(?:[0-9]|0\d|2[0-3]):[0-5]\d$/,
			required: true,
		},
	];
	render() {
		return (
			<>
				<CalendarForm fields={this.formFields} submitHandler={submitMeeting} />
				<CalendarList />
			</>
		);
	}
}

export default Calendar;
