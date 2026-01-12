import CalendarItem from './CalendarItem';
import { createPortal } from 'react-dom';
import ConfirmationModal from './ConfirmationModal';
import { useState } from 'react';

const CalendarList = ({ meetings, deleteHandler }) => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedId, setSelectedId] = useState(false);

	const openModalHandler = (id) => {
		setIsModalOpen(true);
		setSelectedId(id);
	};

	const confirmModalHandler = () => {
		deleteHandler(selectedId);
		setIsModalOpen(false);
	};

	return (
		<>
			<ul className="booking-app__list appointment-list">
				{meetings.map((meeting) => (
					<CalendarItem
						key={'calendar-item-' + meeting.id}
						{...meeting}
						clickHandler={openModalHandler}
					/>
				))}
			</ul>
			{createPortal(
				<ConfirmationModal
					isOpen={isModalOpen}
					onClose={() => setIsModalOpen(false)}
					onConfirm={confirmModalHandler}
					title="Potwierdzenie usunięcia"
					description="Czy na pewno chcesz usunąć ten element? Tej operacji nie da się
					cofnąć."
				/>,
				document.body
			)}
		</>
	);
};

export default CalendarList;
