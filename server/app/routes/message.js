import express from "express";
import { getMessages, sendMessage } from "../services/messageManagement.js";
import { getChatBy } from "../services/chatManagement.js";

const messageRouter = express.Router();
export default messageRouter;

messageRouter.post('/all', async (req, res) => {
	const chat = await getChatBy(req.body.chat);
	const { data, error } = await getMessages(chat, req.query.limit);
	res.send({ data, error });
});

messageRouter.post('/send', async (req, res) => {
	const chat = await getChatBy({ id: req.body.message.chat_id });
	const { data, error } = await sendMessage(req.body.message);
	res.send({ data, error });
});