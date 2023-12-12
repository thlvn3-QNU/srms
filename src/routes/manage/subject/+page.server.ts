import { fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { SupabaseClient } from '@supabase/supabase-js';

export const load: PageServerLoad = async ({ depends, locals: { supabase, getSession } }) => {
	const session = await getSession();

	if (!session) {
		throw redirect(303, '/');
	}

	depends('subject:reload');

	let subject = await getData(supabase);

	return { session, subject };
};

export const actions = {
	create: async ({ request, locals: { supabase, getSession } }) => {
		const data = await request.formData();
		const name = await data.get('subject');
		const credits = await data.get('credits');

		let subject = {
			name,
			credits
		};

		const { error } = await supabase.from('subject').insert({
			...subject,
			updated_at: new Date()
		});

		if (error) {
			console.log(error);
			return fail(500, { subject, error: true });
		}
		
		return subject;
	},
	update: async ({ request, locals: { supabase, getSession } }) => {
		const data = await request.formData();
		const id = await data.get('id');
		const name = await data.get('subject');
		const credits = await data.get('credits');

		const subject = {
			id,
			name,
			credits
		};

		const { error } = await supabase.from('subject').upsert({
			...subject,
			updated_at: new Date()
		});

		if (error) {
			console.log(error);
			return fail(500, { subject, error: true });
		}

		return subject;
	}
};

async function getData(supabase: SupabaseClient) {
	const { data: subject } = await supabase
		.from('subject')
		.select(`id, name, credits`)
		.order('id', { ascending: true });

	return subject;
}
