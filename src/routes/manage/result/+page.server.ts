import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ depends, locals: { supabase, getSession } }) => {
	const session = await getSession();

	if (!session) {
		throw redirect(303, '/');
	}

	depends('subject:reload');


	const { data: score } = await supabase
		.from('score')
		.select(
			`id, ...student_id(student_id, full_name, class_name), ...subject_id(name),...class_id(name),progress , mid_term , last_term, total `
		);

	let score = await getData(supabase);
	let students = await getStudents(supabase)
	let subject = await getSubject(supabase)

	return { session, score ,students , subject};
};

export const actions = {
	create: async ({ request, locals: { supabase, getSession } }) => {
		const data = await request.formData();
		const student_id = await data.get('student_id');
		const subject_id =  await data.get('subject_id');
		const progress =  await data.get('progress');
		const mid_term =  await data.get('mid_term');
		const last_term = await data.get('last_term'); 
		const total = await data.get('total');
	

		let score = {
			student_id,	
			subject_id,
			progress,
			mid_term,
			last_term,
			total,
			
		};

		const { error } = await supabase.from('score').insert({
		    ...score,
			updated_at: new Date()
		});

		if (error) {
			console.log(error);
			return fail(400, { score, error: true });
		}
		
		return score;
	},
	update: async ({ request, locals: { supabase, getSession } }) => {
		const data = await request.formData();
		// const student_id = await data.get('student_id');
		const id = await data.get('score_id');
		const subject_id =  await data.get('subject_id');
		const progress =  await data.get('progress');
		const mid_term =  await data.get('mid_term');
		const last_term = await data.get('last_term'); 
		const total = await data.get('total');
		const score = {
			id,	
			subject_id,
			progress,
			mid_term,
			last_term,
			total,
		};

		const { error } = await supabase.from('score').update({
		      progress, mid_term , last_term , total,
			updated_at: new Date()
		}).eq('id' ,id);
	
		if (error) {
			console.log(error);
			return fail(400, { score, error: true });
		}

		return score;
	}
};

async function getData(supabase: SupabaseClient) {
	const { data: score } = await supabase
		.from('score')
		.select(
			'id, student_id, ...student_id(student_id, full_name),subject_id, ...subject_id(name) ,progress , mid_term , last_term, total '
		)
		.order('id', { ascending: true });


	const { data: classData } = await supabase.from('class').select(`id , subject_id ,name  `);

	const { data: profiles } = await supabase.from('profiles').select(`id ,student_id , full_name `);

	const { data: subject } = await supabase.from('subject').select(`id ,name  `);

	return { session, score, classData, profiles, subject };
};
