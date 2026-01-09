const CalendarList = ({ meetings }) => {
	return (
		<ul>
			{meetings.map(({ id, firstName, lastName, email, date, time }) => (
				<li key={id}>
					<span>{firstName}</span>
					<span>{lastName}</span>
					<span>{email}</span>
					<span>{date}</span>
					<span>{time}</span>
				</li>
			))}
		</ul>
	);
};

export default CalendarList;
