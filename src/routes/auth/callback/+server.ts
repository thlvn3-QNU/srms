import { redirect } from '@sveltejs/kit';

// xử lý kiểm tra người dùng đã đăng nhập chưa
export const GET = async ({ url, locals: { supabase } }) => {
	const code = url.searchParams.get('code');

	if (code) {
		await supabase.auth.exchangeCodeForSession(code);
	}

	throw redirect(303, '/account');
};
