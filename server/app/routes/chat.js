import express from "express";
import { getUserBy, searchUser } from "../services/userManagement.js";
import { addUserToChat, createChat, getChatBy, getChats, getUsersFromChat, matchChat, searchChat, usersHaveChat } from "../services/chatManagement.js";

const chatRouter = express.Router();
export default chatRouter;

chatRouter.post('/add', async (req, res) => {
	let loggedUser = await getUserBy(req.body.loggedUser);
	let newUser = req.body?.user ? await getUserBy(req.body.user) : {};
	let chat = { name: req.body.name };

	if (req.query?.type === 'user') {
		// create chat
		const { data, error } = await createChat(chat.name, req.query.type);
		if (error) { res.send({ data: null, error: { label: error.details, description: error.message }}); return; }
		chat = data[0];
	} 
	else if (req.query.type === 'group') {
		// find the group
		const { data, error } = await matchChat(chat.name);
		if (error) { res.send({ data: null, error: { label: error.details, description: error.message }}); return; }
		chat = data[0];
	}
	else {
		res.send({ data: null, error: { label: "Request error", description: "No valid chat type specified. Valid options are {'user'|'group'}" }});
		return;
	}

	// add users to chat
	const { data: loggedUserData, error: loggedUserError } = await addUserToChat(chat, loggedUser);
	if (loggedUserError) { res.send({ data: null, error: { label: loggedUserError.details, description: loggedUserError.message }}); return; }
	// if a user chat, not group, add also the newUser
	if (req.query?.type === 'user')
	{
		const { data: newUserData, error: newUserError } = await addUserToChat(chat, newUser);
		if (newUserError) { res.send({ data: null, error: { label: newUserError.details, description: newUserError.message }}); return; }
	}
	
	res.send({ data: chat, error: null });
});

chatRouter.post('/search', async (req, res) => {
	let limit = req.query.limit ? req.query.limit : 10;

	if (req.query?.type === 'user') {
		const { data, error } = await searchUser(req.body.name, limit);
		// res.send({data, error});
		const newUsers = data; //[];
		// for (const user of data) {
		// 	const user1 = await getUserBy(user);
		//	const user2 = await getUserBy(req.body.loggedUser);
		// 	let haveChat = await usersHaveChat(user1, user2);
		// 	if (!haveChat) newUsers.push(user1);
		// }
		// console.log(newUsers, " new");
		res.send({ data: newUsers, error: error? { label: error.details, description: error.message } : null });
		return;
	}
	if (req.query?.type === 'group') {
		const { data, error } = await searchChat(req.body.name, "group", limit);
		res.send({ data, error: error? { label: error.details, description: error.message } : null });
		return;
	}
	res.send({ data: null, error: { label: "Request error", description: "No valid type specified (user|group)" }});
});

chatRouter.post('/all', async (req, res) => {
	const user = await getUserBy(req.body.loggedUser);
	const { data, error } = await getChats(user, req.query?.limit);
	for (let item of data) {
		item.online = true;
	}
	res.send({ data, error });
});