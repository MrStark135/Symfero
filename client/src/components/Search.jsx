import { useEffect, useRef, useState } from "react";
import { AddIcon } from "../utils/icons";
import Suggestions from "./Suggestions";
import requestServer from "../utils/request";
import { Lock } from "../utils/lock";
import getLoggedUser from "../utils/getLoggedUser";

export default function Search({ value, setValue, loadedChats, setCurrentChat }) {

	const [searchGlobal, setSearchGlobal] = useState(false);
	const [showSuggestions, setShowSuggestions] = useState(false);
	const [suggestions, setSuggestions] = useState([]);
	const input = useRef(null);
	const searchButton = useRef(null);
	const lock = new Lock();

	useEffect(() => {
		handleSuggestions(input.current);
	}, [searchGlobal]);

	async function handleSuggestions(inputElement) {
		// locking mechanism to avoid conflict
		if (lock.value) return;
		lock.value = true; // acquire lock

		if (inputElement.value.length > 0) {
			let suggestionsTemp = [];
			
			if (searchGlobal) {
				let userRes = await search(inputElement.value, "user");
				let groupRes = await search(inputElement.value, "group");
				if (inputElement.value === "") return; // after the result of the async request, the state might have changed
				userRes?.data?.forEach((item) => {
					suggestionsTemp.push({
						typeIcon: "UserIcon",
						type: "user",
						label: item.name,
					})
				});
				groupRes?.data?.forEach((item) => {
					suggestionsTemp.push({
						typeIcon: "ChatIcon",
						type: "group",
						label: item.name
					})
				});
				// TODO
				// suggestionsTemp.push({
				// 	typeIcon: "ChatIcon",
				// 	label: "New group"
				// });
			} else {
				loadedChats?.forEach((item) => {
					suggestionsTemp.push({
						typeIcon: item.type === 'user' ? 'UserIcon' : 'ChatIcon',
						type: item.type,
						label: item.displayName,
						...item
					})
				});
			}
			
			if (suggestionsTemp.length === 0) suggestionsTemp.push({ label: 'No results' })
				setSuggestions(suggestionsTemp);
		}
		lock.value = false; // release lock
	}

	return (
		<div className="flex items-stretch gap-1 p-2">
			<div className="relative grow">
				<div className="flex border-2 border-dark-bg-300 rounded-sm h-full">
					<input tabIndex={1} ref={input} type="text" className="self-stretch w-full text-lg placeholder-dark-bg-0 pl-2 
						focus:outline-none caret-dark-primary-100"
						placeholder="Search chats..." value={value} 
						onFocus={(event) => { 
							event.preventDefault();
							event.target.value.length > 0 ? setSuggestions([{ label: 'Loading...' }]) : '';
							handleSuggestions(event.target); 
						}}
						onChange={
							(event) => {
								event.preventDefault();
								setValue(event.target.value);
								event.target.value.length > 0 ? setSuggestions([{ label: 'Loading...' }]) : '';
								handleSuggestions(event.target);
							}}
					/>
				</div>
				<Suggestions input={input} list={suggestions} searchGlobal={searchGlobal} setCurrentChat={setCurrentChat}/>
			</div>
			<button tabIndex={2} onClick={ async () => { setSearchGlobal(!searchGlobal) }}
				className={ `${searchGlobal ? 'text-dark-secondary-100 bg-dark-bg-300' : 'text-dark-primary-200 bg-dark-bg-200'} rounded-sm border-2 border-dark-bg-300 hover:bg-dark-bg-300 hover:text-dark-primary-200 focus:outline-none focus:bg-dark-bg-300` }>
				<AddIcon className="size-9"/>
			</button>
		</div>
	)
}

async function search(name, type) {
	const { data, error } = await requestServer('/chat/search', 'POST', { name: name, loggedUser: getLoggedUser()}, { type: type, limit: 6 });
	return { data, error };
}