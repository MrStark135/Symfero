// Template page component, so that all routes look more or less alike - gives feeling of polishness

export default function templatePage() {
	return (
		<div className="flex flex-col h-screen">
			<div className="bg-dark-bg-100 grow flex flex-col justify-baseline gap-10 items-center p-10 pt-20">
				<div className="text-5xl text-dark-primary-200 pb-5 border-b-[3px] border-dark-bg-300">Title</div>
				<div className="text-xl text-dark-secondary-100">Additional info, can be replace with anything</div>
			</div>
		</div>
	);
}