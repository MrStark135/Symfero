import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import requestServer from "../utils/request";

export default function ChatThumb({ chat, setCurrentChat }) {
	
	// redirect user to error page. Anyway, the page wouldn't load properly
	// const navigate = useNavigate();
	// if (!chat) navigate('/error?' + new URLSearchParams({ label: "Internal error", description: "A react component didn't receive proper input" }).toString());

	const name = chat?.displayName;
	const img = "/assets/icons/user.svg"
	const lastMessageArg = "Last message";
	const online = chat.online;

	const [lastMessage, setLastMessage] = useState(lastMessageArg);
	const lastMessageContainer = useRef(null);
	const rootContainer = useRef(null);
	
	return (
		<div ref={rootContainer} className="flex p-2 py-1">
			<button onClick={
				() => {
					setCurrentChat(chat);
				}}
			className="grow flex gap-2 border-2 bg-dark-bg-100 border-dark-bg-300 hover:border-dark-yellow-200 focus:outline-none focus:border-dark-yellow-200 rounded-[5px] p-1">
				<div><img src={ img } className={ `size-14 min-w-14 object-cover rounded-[5px] border-2 ${online ? "border-dark-primary-200" : "border-dark-red-100"}` }/></div>
				<div className="grow flex flex-col items-stretch">
					<div className={ `text-start text-[22px]/[30px] whitespace-nowrap text-ellipsis overflow-hidden ${online ? "text-dark-primary-200" : "text-dark-red-100"}` }>{ name }</div>
					<div ref={lastMessageContainer} className="text-start text-base text-dark-bg-0 whitespace-nowrap overflow-hidden text-ellipsis">{ lastMessage }</div>
				</div>
			</button>
		</div>
	)
}