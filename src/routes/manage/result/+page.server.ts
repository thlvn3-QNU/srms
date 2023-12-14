import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals: { supabase, getSession } }) => {
	const session = await getSession();

	if (!session) {
		throw redirect(303, '/');
	}

   
	const { data: score } = await supabase
		.from('score')
		.select(`id, ...student_id(student_id, full_name, class_name), ...subject_id(name),...class_id(name), total ` );

		const { data: classData } = await supabase
		.from('class')
		.select(`id , subject_id ,name  ` );

		const { data: profiles } = await supabase
		.from('profiles')
		.select(`id ,student_id , full_name ` );

		const { data: subject } = await supabase
		.from('subject')
		.select(`id ,name  ` );


	return { session, score  , classData , profiles , subject};
};
