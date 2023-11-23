import { redirect } from "@sveltejs/kit";

export const load = async ({ locals: { supabase, getSession } }) => {
	const session = await getSession();

	if (!session) {
		throw redirect(303, '/');
	}

	const { data: profile } = await supabase
		.from('profiles')
		.select(`full_name, date_of_birth, gender, address, phone_number`)
		.eq('id', session.user.id)
		.single();

	return { session, profile };
};