export function validateName(name) {
	let errorsTemp = [];
	if (name.length === 0)
		errorsTemp.push({ label: 'Invalid name', description: 'Username is too short. Min length is 1' });
	if (name.length > 32)
		errorsTemp.push({ label: 'Invalid name', description: 'Username is too long. Max length is 32' });
	if (name.includes(' '))
		errorsTemp.push({ label: 'Invalid name', description: 'Username musn\'t contain whitespaces' });
	return errorsTemp;
}
export function validateEmail(email) {
	let errorsTemp = [];
	// check if valid format
	if (!email.includes('@') || !email.includes('.'))
		errorsTemp.push({ label: 'Invalid email', description: 'Email format not appropriate. Example: john@example.com' });
	return errorsTemp;
}
export function validatePassword(password) {
	let errorsTemp = [];
	if (password.length < 8)
		errorsTemp.push({ label: 'Invalid password', description: 'Password is too short, at least 8 chars required' });
	if (password.includes(' '))
		errorsTemp.push({ label: 'Invalid password', description: 'Password contains whitespaces - unallowed character' });		
	const passwordhasUppercase = password.match(/[A-Z]/g);
	if (passwordhasUppercase === null)
		errorsTemp.push({ label: 'Invalid password', description: 'Password must contain at least one uppercase letter' });
	const passwordhasNumber = password.match(/[0-9]/g);
	if (passwordhasNumber === null)
		errorsTemp.push({ label: 'Invalid password', description: 'Password must contain at least one number' });
	const passwordhasSpecial = password.match(/[!@#\$%\^\&*\)\(+=._\|\-\]\[\\~`,}{]/g);
	if (passwordhasSpecial === null)
		errorsTemp.push({ label: 'Invalid password', description: 'Password must contain at least one special character' });

	return errorsTemp;
}