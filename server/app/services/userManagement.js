// abstraction wrappers for supabase methods for managing users
import supabase from "../utils/supabase.js";

export async function addUser(user) {
	const { data, error } = await supabase.from('users').insert([ user ]).select();
	return { data, error };
}
export async function matchUser(user, mode) {
	switch(mode) {
		case 'auth': {
			const { data, error } = await supabase.from('users').select()
				.or(`name.eq.${user.name}, email.eq.${user.email}`)
				.eq('password', user.password);
			return { data, error };
		}
		case 'match': {
			const { data, error } = await supabase.from('users').select()
				.eq('name', user.name)
				.eq('email', user.email)
			return { data, error };
		}
		case 'search': {
			const { data, error } = await supabase.from('users').select()
				.or(`name.eq.${user.name}, email.eq.${user.email}`);
			return { data, error };
		}
		default: return { data: null, error: "no valid mode specified" };
	}
}
export async function searchUser(name, limit) {
	const { data, error } = await supabase.from('users').select()
		.ilike('name', name + '%')
		.limit(limit);

	return { data, error };

}
export async function getUserBy(user) {
	let actualUser = null;
	if (user.name) {
		const { data, error } = await supabase.from('users').select().eq('name', user.name);
		if (error) throw new Error(error.details + ', ' + error.message);
		actualUser = data[0];
	} else if (user.email) {
		const { data, error } = await supabase.from('users').select().eq('email', user.email);
		if (error) throw new Error(error.details + ', ' + error.message);
		actualUser = data[0];
	} else if (user.session) {
		const { data, error } = await supabase.from('users').select().eq('session', user.session);
		if (error) throw new Error(error.details + ', ' + error.message);
		actualUser = data[0];
	} else if (user.id) {
		const { data, error } = await supabase.from('users').select().eq('id', user.id);
		if (error) throw new Error(error.details + ', ' + error.message);
		actualUser = data[0];
	}
	
	if (actualUser === null) throw new Error("User provided doesn\'t contain a unique column by which could be searchable");
	return actualUser;
}
export async function allowSessionUser(user) {
	const { data, error } = await supabase.from('users').update({'sessionAllowed': true, 'session': crypto.randomUUID()})
		.eq('name', user.name)
		.eq('email', user.email)
		.eq('password', user.password)
		.select();
		
	return { data, error };
}
export async function removeUser(user) {
	const { error } = await supabase.from('users').delete().eq('name', user.name);
	return { error };
}