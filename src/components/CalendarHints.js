const CalendarHints = ({ hints, fieldName, clickHandler }) => {
	return (
		<ul>
			{hints.map((item) => (
				<li onClick={() => clickHandler(fieldName, item)}>{item}</li>
			))}
		</ul>
	);
};

export default CalendarHints;
