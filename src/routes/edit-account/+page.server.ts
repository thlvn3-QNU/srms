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

		const avatar_url = formData.get('avatarUrl') as string;
		const full_name = formData.get('fullName') as string;
		const username = formData.get('username') as string;
		const date_of_birth = formData.get('date_of_birth') as string;
		const gender = formData.get('gender') as string;
		const phone_number = formData.get('phone_number') as string;

		const session = await getSession();

		const { error } = await supabase.from('profiles').upsert({
			id: session?.user.id,
			full_name,
			username,
            date_of_birth,
			avatar_url,
            gender: (gender === "men" ? true : false),
            phone_number,
			updated_at: new Date()
		});

		if (error) {
			return fail(500, {
				full_name,
                username,
                date_of_birth,
                avatar_url,
                gender,
                phone_number
			});
		}

		return {
			full_name,
			username,
            date_of_birth,
			avatar_url,
            gender,
            phone_number
		};
	},
	signout: async ({ locals: { supabase, getSession } }) => {
		const session = await getSession();
		if (session) {
			await supabase.auth.signOut();
			throw redirect(303, '/');
		}
	}
};
