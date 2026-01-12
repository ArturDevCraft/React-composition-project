import CalendarItem from './CalendarItem';

const CalendarList = ({ meetings }) => {
	return (
		<ul className="booking-app__list appointment-list">
			{meetings.map((meeting) => (
				<CalendarItem key={meeting.id} {...meeting} />
			))}
		</ul>
	);
};

export default CalendarList;
