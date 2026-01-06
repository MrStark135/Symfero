import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeftIcon, ArrowRightIcon, PhoneIcon, VideoIcon } from "../utils/icons"
import ChatThumb from "./ChatThumb"
import Search from "./Search"
import requestServer from "../utils/request";
import getLoggedUser from "../utils/getLoggedUser";
import { useNavigate } from "react-router-dom";
import MessageInput from "./MessageInput";
import Loading from "./Loading";
import { Lock } from "../utils/lock";
import { useMediaQuery } from "../utils/useMediaQuery";

export default function ChatPage() {
	const [searchValue, setSearchValue] = useState("");
	const [chats, setChats] = useState(null);
	const [messages, setMessages] = useState(null);
	const [currentChat, setCurrentChat] = useState(null);
	const [showSidebar, setShowSidebar] = useState(true);
	const [mobile, setMobile] = useState(true);

	const messagesContainer = useRef(null);

	const mesgLock = new Lock();
	const chatLock = new Lock();

	window.onresize = (event) => {
		if (window.innerWidth >= 768) setMobile(false);
		else setMobile(true);
	}

	useEffect(() => {
		messagesContainer.current.scroll(0, 999999999999999);
	}, [messages]);

	// control whether messages are loaded, so that the old messages are cleared on currentChat change
	useEffect(() => {
		if (!currentChat)
		{
			setMessages([]);
			return;
		}
		setShowSidebar(false);
		setMessages(null);
		loadMessages(20);
	}, [currentChat]);

	// first run, for some reason, just increases number of requests with time  
	// async function firstRun() {
	// 	await loadChats(20);
	// 	await loadMessages(20);
	// }

	// current refresh method. I admit it's horrible and inefficient. TODO: maybe use some kind of a global state which should trigger a reload?
	useEffect(() => {

		let chatInter = setInterval(() => { loadChats(20) }, 3000);
		let mesgInter = setInterval(() => { loadMessages(20) }, 1000);
		return () => {
			clearInterval(chatInter);
			clearInterval(mesgInter);
		};
	});

	// redirect user to error page if not logged in. Anyway, the page wouldn't load properly if no user is logged in
	const navigate = useNavigate();
	if (!sessionStorage.getItem('session')) navigate('/error?' + new URLSearchParams({ label: "Login error", description: "There is no logged user, the chat page is unavailable" }).toString());

	async function loadChats(limit) {
		// lock
		if (chatLock.value) { console.log('blocked chat'); return; }
		chatLock.value = true;
		// request
		const { data, error } = await requestServer('/chat/all', 'POST', { loggedUser: getLoggedUser() }, { limit: limit });
		if (error) console.log(error);
		if (!data) return { data, error };

		// find the displayName, in case of a 1-1 chat
		data.forEach((item) => {
			let name = '';
			if (item.type === 'group')
				name = item.name;
			else if(item.type === 'user') {
				const userNames = item.type === 'group' ? [item.name] : item.name.split(' ');
				name = userNames[0] === getLoggedUser().name ? userNames[1] : userNames[0];
			} else throw new Error('The provided chat.type is invalid.');
			item.displayName = name;
		});

		chatLock.value = false;
		setChats(data);
		return { data, error };
	}

	async function loadMessages(limit) {
		// error check
		if (!currentChat) return;
		// lock
		if (mesgLock.value) { console.log('blocked messages'); return; }
		mesgLock.value = true;
		// request
		const { data, error } = await requestServer('/message/all', 'POST', { chat: currentChat }, { limit: limit });
		if (error) console.log(error);
		setMessages(data);
		mesgLock.value = false;
		return { data, error };
	}

	return (
		<div className="bg-dark-bg-100 grow flex">
			{/* Sidebar */}
			<div className={`bg-dark-bg-200 border-r-2 border-dark-bg-300 w-full md:w-2/7 ${mobile ? (showSidebar ? '' : 'hidden') : ''} flex flex-col`}>
				<Search value={searchValue} setValue={setSearchValue} loadedChats={chats} setCurrentChat={setCurrentChat}/>
				<div className="relative grow self-stretch">
					<div className="absolute overflow-y-auto top-0 bottom-0 left-0 right-0">
						{
							chats === null && <Loading className="bg-dark-bg-100 rounded-[3px] p-2 mx-2"/> ||
							chats.map((item, id) => {
								return <ChatThumb chat={item} setCurrentChat={setCurrentChat} key={id}/>
							})
						}
					</div>
				</div>
			</div>
			{/* Main chat */}
			<div className={`w-full flex flex-col grow ${mobile ? (showSidebar ? 'hidden' : '') : ''}`}>
				<div className="flex justify-between items-center w-full text-dark-secondary-100 bg-dark-bg-200">
					<div className="flex items-center">
						<button className="hover:text-dark-primary-100 hover:bg-dark-bg-300 p-[13px] md:hidden" onClick={
							() => {
								setShowSidebar(true);
							}}>
							<ArrowLeftIcon className="size-6"/>
						</button>
						<div className="text-3xl p-3 py-0">{ currentChat?.displayName }</div>
					</div>
					<div className="flex items-center">
						<div className="hover:text-dark-primary-100 hover:bg-dark-bg-300 p-[9px]"><PhoneIcon className="size-8"/></div>
						<div className="hover:text-dark-primary-100 hover:bg-dark-bg-300 p-2"><VideoIcon className="size-[34px]"/></div>
					</div>
				</div>
				<div className="grow w-full relative">
					<div ref={messagesContainer} tabIndex={-1} className="bg-dark-bg-100 flex flex-col overflow-y-auto text-dark-yellow-50 absolute top-0 bottom-0 left-0 right-0">
						{
							messages === null && <Loading className="text-dark-secondary-100 text-xl text-center p-6"/> ||
							messages.map((item, idx) => {
								return (
									<div key={idx} className={`bg-dark-bg-200 p-1.5 rounded-[5px] m-2 w-2/3 ${item.user_id === sessionStorage.getItem('id') ? "self-end" : "self-start"}`}>
										<div>{ item.text }</div>
										<div>{ item.timestamp }</div>
									</div>
								);
							})
						}
					</div>
				</div>
				<MessageInput currentChat={currentChat} />
			</div>
		</div>
	)
}