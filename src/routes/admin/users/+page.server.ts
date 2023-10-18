import { redirect } from "@sveltejs/kit";

export const load = async ({ locals: { supabase, getSession } }) => {
	const session = await getSession();

	if (!session) {
		throw redirect(303, '/');
	}

	const { data: profiles } = await supabase
		.from('profiles')
		.select(`id, student_id, full_name, date_of_birth, phone_number`);

    console.log(profiles);

	return { session, profiles };
};