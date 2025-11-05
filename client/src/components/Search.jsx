import { SearchIcon } from "../assets/icons";

export default function Search() {
	return (
		<div className="flex items-center border-2 border-dark-bg-300 rounded-sm m-2">
			<input type="text" className="w-full text-lg placeholder-dark-bg-0 pl-2
				focus:outline-none caret-dark-primary-100
			" placeholder="Search chats..."/>
			<div className="">
				<button className="flex justify-center items-center
					hover:text-dark-primary-100 hover:bg-dark-bg-300"
				>
					<SearchIcon className="text-dark-primary-200 m-1 size-6"/>
				</button>
			</div>
		</div>
	)
}