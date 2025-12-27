export default async function requestServer(relativeUrl, method, body, searchParams) {
	try {
		// body if provided
		let optionsBody = {
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(body)
		}
		if (!body) optionsBody = {};
		// actual request
		const response = await fetch(import.meta.env.VITE_SERVER_API + relativeUrl +
			// url searchParams if provided 
			(searchParams ? '?'+new URLSearchParams(searchParams).toString():''),
			// options
			{
				method: method,
				...optionsBody 
			});
		// response
		let { data, error } = await response.json();
		return { data, error };	
	} catch (error) {
		console.log(error);
		return { data: null, error: { label: 'Internal error', description: error.toString() } };
	}
}