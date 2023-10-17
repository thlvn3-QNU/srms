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

		const full_name = formData.get('full_name') as string;
		const username = formData.get('username') as string;
		const date_of_birth = formData.get('date_of_birth') as string;
		const gender = formData.get('gender') as string;
		const phone_number = formData.get('phone_number') as string;

		// TODO: figure out whether you should try this or not
		// const { full_name, username, date_of_birth, gender , phone_number } = formDataObject;

		const profileData = {
			full_name,
			username,
			date_of_birth,
			gender: gender === 'men',
			phone_number
		};

		const { error } = await supabase.from('profiles').upsert({
			id: session?.user.id,
			updated_at: new Date(),
			...profileData
		});

		if (error) {
			return fail(500, profileData);
		}

		return profileData;
	}
};
