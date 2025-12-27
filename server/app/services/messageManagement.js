import supabase from "../utils/supabase.js";

export async function getMessages(chat) {
    const { data, error } = await supabase.from('messages').select()
        .eq('chat_id', chat.id);

    return { data, error };
}

export async function sendMessage(message) {
    const { data, error } = await supabase.from('messages').insert([ message ]).select();
    return { data, error };
}