import React from 'react';
import CalendarForm from './CalendarForm';
import CalendarList from './CalendarList';

class Calendar extends React.Component {
	formFields = [
		{ name: 'firstName', label: 'Imię', regex: /[\w]+/ },
		{ name: 'lastName', label: 'Nazwisko', regex: /[\w]+/ },
		{ name: 'email', label: 'E-mail', type:'email', regex: /[\w]+/ },
		{ name: 'date', label: 'Data', type:"date", regex: /[\w]+/ },
		{ name: 'time', label: 'Godzina',type:'time', regex: /[\w]+/ },
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
