import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url, depends, locals: { getSession } }) => {
	depends("supabase:auth");
	
	const session = await getSession();
	if (session) {
		throw redirect(303, '/account');
	}

	return { url: url.origin };
};
