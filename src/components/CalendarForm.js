import { useState } from 'react';

const CalendarForm = ({ fields, submitHandler }) => {
	const initialValues = Object.fromEntries(
		fields.map((field) => [field.name, ''])
	);
	const [fieldValues, setFieldValues] = useState(initialValues);
	const inputChange = (e) => {
		const { name, value } = e.target;

		setFieldValues((state) => ({ ...state, [name]: value }));
	};
	return (
		<form onSubmit={(e) => submitHandler(e, fields, fieldValues)}>
			{fields.map((field) => (
				<input
					key={field.name}
					type={field.type}
					name={field.name}
					placeholder={field.label}
					value={fieldValues[field.name]}
					onChange={inputChange}
				></input>
			))}
			<input type="submit" value="Dodaj" />
		</form>
	);
};

export default CalendarForm;
