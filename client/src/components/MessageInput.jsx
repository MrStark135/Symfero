import { useState } from "react";
import { ArrowRightIcon, DocumentIcon } from "../utils/icons"
import requestServer from "../utils/request";

export default function MessageInput({ currentChat }) {
	const [textInput, setTextInput] = useState("");

	async function sendMessage() {
		if (!currentChat) return;
		const { data, error } = await requestServer('/message/send', 'POST', { message: { chat_id: currentChat.id, user_id: sessionStorage.getItem('id'), text: textInput } });
		if (!error) setTextInput('');
		
		return { data, error };
	}

	return (
		<div className="flex justify-center items-center w-full text-dark-secondary-100 bg-dark-bg-200">
			<div className="text-xl grow">
				<input type="text" value={textInput}
				onChange={
					(event) => {
						event.preventDefault();
						setTextInput(event.target.value);
					}}
				className="w-full outline-none p-2 pr-3 text-dark-yellow-50" placeholder="Type a message..."/>
			</div>
			<div className="flex items-center">
				<button className="p-2 hover:text-dark-primary-100 hover:bg-dark-bg-300 focus:outline-none focus:text-dark-primary-100 focus:bg-dark-bg-300">
					<DocumentIcon className="size-8"/>
				</button>
				<button className="p-[7px] hover:text-dark-primary-100 hover:bg-dark-bg-300 focus:outline-none focus:text-dark-primary-100 focus:bg-dark-bg-300"
					onClick={
						() => {
							sendMessage();
						}
					}>
					<ArrowRightIcon className="size-[34px]"/>
				</button>
			</div>
		</div>
	)
}