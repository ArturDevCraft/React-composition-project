const CalendarHints = ({ hints, fieldName, clickHandler }) => {
	return (
		<ul className="appointment-form__suggestions">
			{hints.map((item) => (
				<li
					className="appointment-form__suggestion-item"
					onClick={() => clickHandler(fieldName, item)}
				>
					{item}
				</li>
			))}
		</ul>
	);
};

export default CalendarHints;
