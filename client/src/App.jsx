import { useState } from "react";
import { ArrowRightIcon, DocumentIcon, PhoneIcon, VideoIcon } from "./assets/icons"
import ChatThumb from "./components/ChatThumb"
import Search from "./components/Search"
import { useQuery } from "@tanstack/react-query";

function App() {
	const { isPending, error, data, isFetching, refetch } = useQuery({
		queryKey: ['messages'],
		queryFn: async () => {
			const response = await fetch(
				`http://localhost:3000/messages`
			)
			return await response.json()
		},
	});
	let messages = [];
	if (data) messages = data;
	let online = true;

	return (<>
		<div className="bg-dark-bg-100 grow flex">
			{/* Sidebar */}
			<div className="bg-dark-bg-200 border-r-2 border-dark-bg-300 w-2/7">
				<Search />
				<ChatThumb name="Adolf Hitler" img="/src/assets/images/Adolf_Hitler.jpg" lastMessage="Have you seen..." />
				<ChatThumb online={true} />
				<ChatThumb online={online} />
			</div>
			{/* Main chat */}
			<div className="w-full flex flex-col grow">
				<div className="flex justify-between items-center w-full text-dark-secondary-100 bg-dark-bg-200">
					<div className="text-3xl p-3 py-0">Alice</div>
					<div className="flex items-center">
						<div className="hover:text-dark-primary-100 hover:bg-dark-bg-300 p-[9px]"><PhoneIcon className="size-8"/></div>
						<div className="hover:text-dark-primary-100 hover:bg-dark-bg-300 p-2"><VideoIcon className="size-[34px]"/></div>
					</div>
				</div>
				<div className="grow w-full relative">
					<div className="bg-dark-bg-100 flex flex-col overflow-y-auto text-dark-yellow-50 absolute top-0 bottom-0 left-0 right-0">
						{
							(() => {
								if (messages) {
									return messages.map((item) => {
										return (
											<div className={`bg-dark-bg-200 p-1.5 rounded-[5px] m-2 w-2/3 ${item.sender == "Adolf Hitler" ? "self-start" : "self-end"}`} key={ item.time }>
												{ item.content }
											</div>
										);
									});
								}
							})()
						}
						{/* <div className="bg-dark-bg-200 p-1.5 rounded-[5px] m-2 w-2/3">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div>
						<div className="bg-dark-bg-200 p-1.5 rounded-[5px] m-2 w-2/3 self-end">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div>
						<div className="bg-dark-bg-200 p-1.5 rounded-[5px] m-2 w-2/3 self-end">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div>
						<div className="bg-dark-bg-200 p-1.5 rounded-[5px] m-2 w-2/3">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div>
						<div className="bg-dark-bg-200 p-1.5 rounded-[5px] m-2 w-2/3">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div>
						<div className="bg-dark-bg-200 p-1.5 rounded-[5px] m-2 w-2/3">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div> */}
					</div>
				</div>
				<div className="flex justify-center items-center w-full text-dark-secondary-100 bg-dark-bg-200">
					<div className="text-xl grow">
						<input type="text" className="w-full outline-none p-2 pr-3 text-dark-yellow-50" placeholder="Type a message..."/>
					</div>
					<div className="flex items-center">
						<div className="hover:text-dark-primary-100 hover:bg-dark-bg-300 p-2"><DocumentIcon className="size-8"/></div>
						<div className="hover:text-dark-primary-100 hover:bg-dark-bg-300 p-[7px]"><ArrowRightIcon className="size-[34px]"/></div>
					</div>
				</div>
			</div>
		</div>
	</>)
}

export default App
