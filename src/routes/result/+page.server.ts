// @ts-nocheck - Using undocumented TS method from Supabase
//test comment
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

const rating = ["F", "D", "C", "B", "A"];

export const load: PageServerLoad = async ({ locals: { supabase, getSession } }) => {
	const session = await getSession();

	if (!session) {
		throw redirect(303, '/');
	}

	const { data: score } = await supabase
		.from('score')
		.select(`id, ...subject_id(name, credits), progress, mid_term, last_term, total`)
		.eq('student_id', session.user.id);
	
	score?.forEach((e) => {
		let total = e.total;
		e.total_four = (total / 10) * 4;
		e.total_rating = rating[Math.trunc(e.total_four)];
	})
	
	console.log(score);

	return { session, score };
};