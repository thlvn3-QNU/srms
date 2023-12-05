import { fail, redirect } from '@sveltejs/kit';

export const load = async ({ locals: { supabase, getSession } }) => {
	const session = await getSession();

	if (!session) {
		throw redirect(303, '/');
	}

	return { session };
};

export const actions = {
	update: async ({ request, locals: { supabase, getSession } }) => {
		const session = await getSession();
		const data = await request.formData();

		const newpass = data.get('new-password');
		const conpass = data.get('confirm-password');

		if (newpass !== conpass) {
			console.log(`pass unmatch: ${newpass} ${conpass}`);
			return fail(400, { error: true, message: 'Mật khẩu không trùng khớp!' });
		}
	}
};
