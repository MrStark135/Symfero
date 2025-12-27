import { useEffect, useRef, useState } from "react";
import { AddIcon, IconbyName } from "../utils/icons";
import requestServer from "../utils/request";
import getLoggedUser from "../utils/getLoggedUser";

export default function Suggestions({ input, list, searchGlobal }) {

	const [show, setShow] = useState(false);
	const suggestionsContainer = useRef(null);

	useEffect(() => { list.length > 0 ? setShow(true) : setShow(false) }, [list]);

	document.addEventListener('mousedown', (event) => {
		if (!suggestionsContainer.current?.contains(event.target) && event.target !== input.current)
			setShow(false);
	});

	async function addChat(user, type, chatName) {
		console.log(chatName)
		if (type === 'user') {
			const { data, error } = await requestServer('/chat/add', 'POST', { user: user, loggedUser: getLoggedUser(), name: chatName }, { type: type });
			return { data, error };
		} else if (type === 'group') {
			const { data, error } = await requestServer('/chat/add', 'POST', { loggedUser: getLoggedUser(), name: chatName }, { type: type });
			return { data, error };
		} else {
			return { error: { label: "Internal error", description: "No valid type specified. Valid types are {'user'|'group'}" }};
		}
	}

	function SuggestionItem({ item }) {
		return (
			<div className="flex items-stretch justify-stretch">
				<button onClick={
					async (event) => {
						// the chat naming convention for user chats is a must. A single space separates the usernames. The space is a forbidden char in usernames:)
						let chatName = item.type === "user" ? sessionStorage.getItem('name') + ' ' + item.label : item.label;
						const { data, error } = await addChat({ name: item.label}, item.type, chatName);
						console.log({ data, error });
					}} className="grow group cursor-pointer px-1 py-0.5 flex justify-between items-center hover:text-dark-secondary-200 focus:text-dark-primary-200 focus:outline-none">
					<div className="flex gap-0.5">
						<div>{IconbyName(item.typeIcon, { className: "size-5 m-[3px]" })}</div>
						<div className="whitespace-nowrap text-ellipsis overflow-hidden text-lg/tight" >{item.label}</div>
					</div>
					{
						searchGlobal &&
						<div className="size-6 hidden group-hover:block group-focus:block">
							<AddIcon className="size-6"/>
						</div>
					}
				</button>
			</div>		
		)
	}

	return (
		show ?
		<div ref={suggestionsContainer} className="absolute w-full bg-dark-bg-100/97 rounded-sm border-2 border-dark-bg-300 mt-1">
			{
				list.map((item, idx) => {
					return (
						<SuggestionItem item={item} key={idx} />
					)
				})
			}
		</div>
		: <></>
	);
};