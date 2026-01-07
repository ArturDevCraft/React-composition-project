import { useState } from 'react';

const CalendarForm = ({ fields }) => {
	const { fieldValues, setFieldValues } = useState();
	return (
		<form>
			{fields.map((field) => (
				<input
					type={field.type}
					name={field.name}
					placeholder={field.label}
				></input>
			))}
			<input type="submit" value="Dodaj" />
		</form>
	);
};

export default CalendarForm;
