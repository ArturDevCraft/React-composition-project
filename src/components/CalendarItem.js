const CalendarItem = ({ id, firstName, lastName, email, date, time }) => {
	return (
		<li>
			<span>{firstName}</span>
			<span>{lastName}</span>
			<span>{email}</span>
			<span>{date}</span>
			<span>{time}</span>
		</li>
	);
};

export default CalendarItem;
