const CalendarItem = ({ id, firstName, lastName, email, date, time }) => {
	return (
		<>
			<li class="appointment-list__item appointment-list__item--header">
				<span>Imię</span>
				<span>Nazwisko</span>
				<span>E-mail</span>
				<span>Data</span>
				<span>Godzina</span>
				<span></span>
			</li>
			<li className="appointment-list__item">
				<span className="appointment-list__data">{firstName}</span>
				<span className="appointment-list__data">{lastName}</span>
				<span className="appointment-list__data--email">{email}</span>
				<span className="appointment-list__data">{date}</span>
				<span className="appointment-list__data appointment-list__data--time">
					{time}
				</span>
                <button class="appointment-list__delete-btn" aria-label="Usuń">Usuń</button>
			</li>
		</>
	);
};

export default CalendarItem;
