import CalendarItem from './CalendarItem';

const CalendarList = ({ meetings }) => {
	return (
		<ul>
			{meetings.map((meeting) => (
				<CalendarItem key={meeting.id} {...meeting} />
			))}
		</ul>
	);
};

export default CalendarList;
