import supabase from "../utils/supabase.js";

export async function getChatBy(chat) {
	let actualChat = null;

	if (chat.name) {
		const { data, error } = await supabase.from('chats').select().eq('name', chat.name);
		if (error) throw new Error(error.details + ', ' + error.message);
		actualChat = data[0];
	} else if (chat.id) {
		const { data, error } = await supabase.from('chats').select().eq('id', chat.id);
		if (error) throw new Error(error.details + ', ' + error.message);
		actualChat = data[0];
	}

	if (!actualChat) throw new Error("Chat provided doesn\'t contain a unique column by which could be searchable");
	return actualChat;
}

export async function searchChat(name, type, limit) {
	const { data, error } = await supabase.from('chats').select()
		.ilike('name', name + '%')
		.eq('type', type)
		.limit(limit);

	return { data, error };
}

export async function matchChat(name) {
	const { data, error } = await supabase.from('chats').select()
			.eq('name', name)
	return { data, error };
}

export async function createChat(name, type) {
	const { data, error } = await supabase.from('chats').insert([{ name: name, type: type }]).select();
	return { data, error };
}

export async function addUserToChat(chat, user) {
	const { data, error } = await supabase.from('chat_members').insert([{ user_id: user.id, chat_id: chat.id }]).select();
	return { data, error };
}

export async function usersHaveChat(user1, user2) {
	const { data, error } = await supabase.from('chat_members').select()
		.or(`user_id.eq.${user1Res.data[0].id}, user_id.eq.${user2Res.data[0].id}`);

	console.log(error, data, "data");
	return true;
	if (error) return { error };
}

export async function getChats(user, limit) {
	// get all chats in which user is member
	const { data, error } = await supabase.from('chat_members').select()
		.eq('user_id', user.id)
		.limit(limit);

	if (error) return { data, error };
	const chats = [];
	for (let userChat of data) {
		let chat = await getChatBy({ id: userChat.chat_id });
		chats.push(chat);
	}
	return { data: chats, error: null };
}