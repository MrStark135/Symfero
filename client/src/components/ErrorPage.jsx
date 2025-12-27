export default function ErrorPage() {
	// the error details are supplied as query params
	// if none available, a generic message will appear 
	const urlParams = new URLSearchParams(window.location.search);
	return (
		<div className="flex flex-col h-full">
			<div className="bg-dark-bg-100 grow flex flex-col justify-baseline gap-10 items-center p-10 pt-20">
				<div className="text-5xl text-dark-red-200 pb-5 border-b-[3px] border-dark-bg-300">Error: { urlParams.get('label') || 'something went wrong' }</div>
				<div className="text-dark-yellow-100" >{ urlParams.get('description') || "Generic error page. Some internal error occured, or the supplied url doesn't exist. Try going back, or maybe report the error if sure it's a mistake" }</div>
			</div>
		</div>
	);
}