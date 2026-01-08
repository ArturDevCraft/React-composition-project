import React from 'react';
import CalendarForm from './CalendarForm';
import CalendarList from './CalendarList';
import { submitMeeting } from '../providers/calendarProvider';
import Errors from './Errors';

class Calendar extends React.Component {
	formFields = [
		{ name: 'firstName', label: 'Imię', regex: '/.{2,20}/', required: true },
		{ name: 'lastName', label: 'Nazwisko', regex: '/.{2,20}/', required: true },
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
	state = { errors: [] };
	render() {
		const { errors } = this.state;
		return (
			<>
				{' '}
				{errors.length > 0 && <Errors errors={errors} />}
				<CalendarForm
					fields={this.formFields}
					submitHandler={submitMeeting.bind(this)}
					errors={errors}
				/>
				<CalendarList />
			</>
		);
	}
}

export default Calendar;
