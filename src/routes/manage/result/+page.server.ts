import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals: { supabase, getSession } }) => {
	const session = await getSession();

	if (!session) {
		throw redirect(303, '/');
	}

    // TODO: Populate values from their respective foreign tables
	const { data: score } = await supabase
		.from('score')
		.select(`id, student_id, class_id, subject_id, total`);

	return { session, score };
};
