//xử lí phiên bản ở phía máy chủ , giúp giữ phiên đăng nhập của người dùng trong quá trình duyệt web
export const load = async ({ locals: { getSession } }) => {
	return {
		session: await getSession()
	};
};
