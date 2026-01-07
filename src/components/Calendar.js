import React from 'react';
import CalendarForm from './CalendarForm';
import CalendarList from './CalendarList';

class Calendar extends React.Component {
	formFields = [
		{ name: 'firstName', label: 'Imię', regex: '/.{2,20}/' },
		{ name: 'lastName', label: 'Nazwisko', regex: '/.{2,20}/' },
		{
			name: 'email',
			label: 'E-mail',
			type: 'email',
			regex: '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}',
		},
		{
			name: 'date',
			label: 'Data',
			type: 'date',
			regex: '^d{1,4}[./-]d{1,2}[./-]d{1,4}$',
		},
		{
			name: 'time',
			label: 'Godzina',
			type: 'time',
			regex: '^(?:[0-9]|1d|2[0-3]):[0-5]d$',
		},
	];
	render() {
		return (
			<>
				<CalendarForm fields={this.formFields} />
				<CalendarList />
			</>
		);
	}
}

export default Calendar;
