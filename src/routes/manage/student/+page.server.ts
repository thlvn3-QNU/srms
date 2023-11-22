import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals: { supabase, getSession } }) => {
	const session = await getSession();

	if (!session) {
		throw redirect(303, '/');
	}

	const { data: students } = await supabase
		.from('profiles')
		.select(`id, full_name, student_id, school_year`)
        .eq('permission', 0);

	return { session, students };
};
