const CalendarHints = ({ hints, fieldName, clickHandler }) => {
	if (hints.length <= 0) {
		return null;
	}
	return (
		<ul className="appointment-form__suggestions">
			{hints.map((item) => (
				<li
					key={'hint-item-val' + item}
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
