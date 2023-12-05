import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals: { supabase, getSession } }) => {
	const session = await getSession();

	if (!session) {
		throw redirect(303, '/');
	}

    // FIXME: unable to reference foreign key
    // subject_id.name returned null
    const { data: classes } = await supabase
        .from('class')
        .select('id, ...subject_id(name), ...teacher_id(full_name)');

    return { session, classes };
};
