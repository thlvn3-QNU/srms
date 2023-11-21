import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url, locals: { getSession } }) => {
	const session = await getSession();

	if (session) {
		throw redirect(303, '/account'); // TODO: đổi route sang đường khác sau khi đăng nhập 
	}

	return { url: url.origin };
};
