import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { randomUUID, type UUID } from 'crypto';

export const load: PageServerLoad = async ({ locals: { supabase, getSession } }) => {
	const session = await getSession();

	if (!session) {
		throw redirect(303, '/');
	}

	const { data: students } = await supabase
	.from('profiles')
	.select()
	.eq('permission', 0);

	return { session, students };
};

export const actions = {
    update: async ({ locals: { supabase }, request }) => {
		const formData = await request.formData();
		
		let ID: any;
		if ( formData.get('id') === 'undefined') {
			ID = randomUUID();
		}
		else {
			ID = formData.get('id');
		}

		let profile = {
			id: ID,
			student_id: formData.get('student_id'),
			full_name: formData.get('full_name'),
			date_of_birth: formData.get('date_of_birth'),
			gender: formData.get('gender'),
			address: formData.get('address'),
			phone_number: formData.get('phone_number'),
			class_name: formData.get('class_name'),
			school_year: formData.get('school_year'),
			permission: 0
		}

		// const { data, error } = await supabase.auth.admin.createUser({
		// 	email: 'user@email.com',
		// 	password: 'password',
		// 	user_metadata: { name: 'Yoda' }
		// })


		await supabase
		.from('profiles')
		.upsert(profile);
    },
} satisfies Actions;