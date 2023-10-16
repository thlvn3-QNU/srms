// //xử lí phiên bản và đối tượng supabase ở phía máy khách
// import { invalidate } from '$app/navigation';
// import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public';
// import { createSupabaseLoadClient } from '@supabase/auth-helpers-sveltekit';

// export const load = async ({ fetch, data, depends }) => {
// 	depends('supabase:auth');

// 	const supabase = createSupabaseLoadClient({
// 		supabaseUrl: PUBLIC_SUPABASE_URL,
// 		supabaseKey: PUBLIC_SUPABASE_ANON_KEY,
// 		event: { fetch },
// 		serverSession: data.session
// 	});

// 	const {
// 		data: { session }
// 	} = await supabase.auth.getSession();// lấy sesstion hiện tại của người dùng

// 	return { supabase, session };// trả về phiên bản supabase client đã tạo và sesstion hiện tại của người dùng
// };
//  //Hàm load: Hàm này dùng để tải dữ liệu từ Supabase và trả về một
// //  đối tượng có chứa phiên bản Supabase client và session.