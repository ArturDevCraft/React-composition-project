import { useState } from 'react';
import { isValueLike } from '../helpers/calendarHelper';
import CalendarHints from './CalendarHints';
import CalendarApi from '../providers/calendarApi';

const CalendarForm = ({ fields, submitHandler, errors }) => {
	const initialValues = Object.fromEntries(
		fields.map((field) => [field.name, '']),
	);

	const initialHints = Object.fromEntries(
		fields.map((field) => [field.name, []]),
	);

	const [fieldValues, setFieldValues] = useState(initialValues);
	const [fieldHints, setFieldHints] = useState(initialHints);

	const api = new CalendarApi();

	const inputChange = (e) => {
		const { name, value } = e.target;
		setFieldValues((state) => ({ ...state, [name]: value }));
		setHints(name, value);
	};

	async function getFieldHints(field, like) {
		try {
			const data = await api.get();
			const uniqueData = new Set();

			data.forEach((item) => {
				if (isValueLike(item[field], like)) {
					uniqueData.add(item[field]);
				}
			});

			return Array.from(uniqueData);
		} catch (err) {
			alert(err);
		}
	}

	const setHints = async (fieldName, value) => {
		let hints = await getFieldHints(fieldName, value);
		if (value === '') {
			hints = [];
		}
		setFieldHints((state) => ({ ...state, [fieldName]: hints }));
	};

	const hasErrors = (fieldName) => {
		const err = errors.find((err) => err.field == fieldName);
		if (err) {
			return true;
		}
		return false;
	};

	const useHint = (fieldName, value) => {
		setFieldValues((state) => ({ ...state, [fieldName]: value }));
		setFieldHints((state) => ({ ...state, [fieldName]: [] }));
	};

	return (
		<form
			onSubmit={(e) => submitHandler(e, fieldValues)}
			className="booking-app__form appointment-form"
		>
			{fields.map((field) => (
				<div
					key={'form-field' + field.name + field.label}
					className="appointment-form__field-group"
				>
					<input
						type={field.type}
						name={field.name}
						placeholder={field.label}
						value={fieldValues[field.name]}
						onChange={inputChange}
						className={
							hasErrors(field.name)
								? 'error appointment-form__input'
								: 'appointment-form__input'
						}
						autoComplete="off"
					></input>
					<CalendarHints
						key={field.name + 'hints'}
						hints={fieldHints[field.name]}
						fieldName={field.name}
						clickHandler={useHint}
					/>
				</div>
			))}

			<input type="submit" value="Dodaj" className="appointment-form__submit" />
		</form>
	);
};

export default CalendarForm;
