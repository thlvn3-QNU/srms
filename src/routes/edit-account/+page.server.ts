import { fail, redirect } from '@sveltejs/kit';

export const load = async ({ locals: { supabase, getSession } }) => {
	const session = await getSession();

	if (!session) {
		throw redirect(303, '/');
	}

	const { data: profile } = await supabase
		.from('profiles')
		.select(`username, full_name, date_of_birth, gender, address, phone_number`)
		.eq('id', session.user.id)
		.single();

	return { session, profile };
};

export const actions = {
	update: async ({ request, locals: { supabase, getSession } }) => {
		const formData = await request.formData();
		const session = await getSession();

		const fields: string[] = ['fullName', 'username', 'date_of_birth', 'gender', 'phone_number'];

		const data: Record<string, string | boolean> = {};

		for (const field of fields) {
			const value = formData.get(field);
			if (value !== null && value !== undefined) {
				data[field] = value as string;
			}
		}

		data.gender = data.gender === 'men';

		const { error } = await supabase.from('profiles').upsert({
			id: session?.user.id,
			...data,
			updated_at: new Date()
		});

		if (error) {
			return fail(500, data);
		}

		return data;
	},
	// TODO: make this globally
	signout: async ({ locals: { supabase, getSession } }) => {
		const session = await getSession();
		if (session) {
			await supabase.auth.signOut();
			throw redirect(303, '/');
		}
	}
};
