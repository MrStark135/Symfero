export default function Loading({ message, className }) {
	return (
		<div className={className}>
			{ message || 'Loading...' }
		</div>
	)
}