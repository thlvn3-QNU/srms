import { fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { SupabaseClient } from '@supabase/supabase-js';
export const load: PageServerLoad = async ({ depends, locals: { supabase, getSession } }) => {
	const session = await getSession();

	if (!session) {
		throw redirect(303, '/');
	}

	depends('score:reload');

	let score = await getData(supabase);
	let students = await getStudents(supabase)
	let subject = await getSubject(supabase)

	return { session, score ,students , subject};
};

export const actions = {
	create: async ({ request, locals: { supabase, getSession } }) => {
		const data = await request.formData();
		const id_student = await data.get('id_student');
		const subject_id =  await data.get('subject_id');
		const progress =  await data.get('progress');
		const mid_term =  await data.get('mid_term');
		const last_term = await data.get('last_term'); 
		const total = await data.get('total');
	

		let score = {
			id_student,	
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
		const id_student = await data.get('id_student');
		const subject_id =  await data.get('subject_id');
		const progress =  await data.get('progress');
		const mid_term =  await data.get('mid_term');
		const last_term = await data.get('last_term'); 
		const total = await data.get('total');
		const score = {
			id_student,	
			subject_id,
			progress,
			mid_term,
			last_term,
			total,
		};

		const { error } = await supabase.from('score').update({
			...score,
			updated_at: new Date()
		}).eq('id_student' ,id_student , 'subject_id' , subject_id);

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
			'id, id_student, ...id_student(student_id, full_name),subject_id, ...subject_id(name) ,progress , mid_term , last_term, total '
		)
		.order('id', { ascending: true });

	return score;
}

async function getStudents (supabase: SupabaseClient) {
	const { data: students } = await supabase
		.from('profiles')
		.select(
			'id, full_name, student_id'
		)
		.eq('permission' , 0)

	return students;
}

async function getSubject (supabase: SupabaseClient) {
	const { data: subject } = await supabase
		.from('subject')
		.select(
			'id, name '
		)
	
	return subject;
}
