export default function Errors({ errors }) {
	return (
		<ul className="booking-app__error-list error-summary">
			{errors.map((error) => {
				return (
					<li className="error-summary__item" key={error.message + error.field}>
						{' '}
						{error.message}
					</li>
				);
			})}
		</ul>
	);
}
