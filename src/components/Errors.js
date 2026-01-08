export default function Errors({ errors }) {
	return (
		<ul>
			{errors.map((error) => {
				return <li key={error.message + error.field}> {error.message}</li>;
			})}
		</ul>
	);
}
