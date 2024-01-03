import { redirect, fail } from '@sveltejs/kit';
import type { Actions } from './$types'
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url, depends, locals: { supabase, getSession } }) => {
	const session = await getSession();
    depends('details:reload');

	if (!session) {
		throw redirect(303, '/');
	}

	const queryParams = new URL(url.href).searchParams;
	const id = queryParams.get('id');

    const { data: details } = await supabase
        .from('participation')
        .select(`id, ...student_id(full_name, date_of_birth, student_id)`)
		.eq('class', id);
		
	const { data: classDes } =  await supabase
		.from('class')
		.select(`id, ...subject_id(name), ...teacher_id(full_name)`)
		.eq('id', id);

	const { data: studentList } =  await supabase
		.from('profiles')
		.select('*')
		.eq('permission', 0);

    return { session, details, classDes, studentList };
};

export const actions = {
    upsert: async ({ locals: { supabase }, request }) => {
		const formData = await request.formData();

		let studentId = formData.get('student_id');
		let currentClass = formData.get('class');
		
		let { error } = await supabase
		.from('participation')
		.upsert({
			student_id: studentId,
			class: currentClass
		});

		if (error) {
			console.log(error);
			return fail(400, { error: true });
		}
    },

	delete: async ({ locals: { supabase }, request }) => {
		const formData = await request.formData();

		let { error } = await supabase.from('participation').delete().eq('student_id', formData.get('id'));

		if (error) {
			console.log(error);
			return fail(400, { error: true });
		}
	}
} satisfies Actions;
