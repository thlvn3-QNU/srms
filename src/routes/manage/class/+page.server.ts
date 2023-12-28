import { redirect, fail } from '@sveltejs/kit';
import type { Actions } from './$types'
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ depends, locals: { supabase, getSession } }) => {
	const session = await getSession();
    depends('class:reload');

	if (!session) {
		throw redirect(303, '/');
	}

    const { data: classes } = await supabase
        .from('class')
        .select('id, subject_id, ...subject_id(name), teacher_id, ...teacher_id(full_name)');

    const { data: subjects } = await supabase
        .from('subject')
        .select('id, name');
    
    const { data: teachers } = await supabase
        .from('profiles')
        .select('id, full_name');

    return { session, classes, subjects, teachers };
};

export const actions = {
    upsert: async ({ locals: { supabase }, request }) => {
		const formData = await request.formData();

		let classInput = {
            id: formData.get('id'),
            subject_id: formData.get('subject_id'),
            teacher_id: formData.get('teacher_id')
        };
		
		let { error } = await supabase
		.from('class')
		.upsert(classInput);

		if (error) {
			console.log(error);
			return fail(400, { error: true });
		}
    },

	delete: async ({ locals: { supabase }, request }) => {
		const formData = await request.formData();

		let { error } = await supabase.from('class').delete().eq('id', formData.get('id'));

		if (error) {
			console.log(error);
			return fail(400, { error: true });
		}
	}
} satisfies Actions;
