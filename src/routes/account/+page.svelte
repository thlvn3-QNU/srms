<script>
	export let data;

	let { session, supabase, profile } = data;
	$: ({ session, supabase, profile } = data);
</script>

<div class="flex justify-center">
	<div class="card p-8 w-3/4 [&>*]:my-4">
		<h2 class="h2">Tiểu sử</h2>
		<!-- TODO: turn this into a table -->
		<div>
			<p>Họ tên: {profile?.full_name}</p>
			<p>Ngày sinh: {profile?.date_of_birth}</p>
			<p>Nơi sinh: Chưa cập nhật</p>
			<p>Giới tính: {profile?.gender ? 'Nam' : 'Nữ'}</p>
			<p>Số điện thoại: {'0' + profile?.phone_number || 'Chưa cập nhật'}</p>
			<p>Email: {session.user.email}</p>
		</div>
		<button class="variant-filled">Sửa thông tin</button>
	</div>
</div>
