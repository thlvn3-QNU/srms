<script lang="ts">
	import { enhance } from '$app/forms';

	export let data;
	export let form;

	let { session, supabase, profile } = data;
	$: ({ session, supabase, profile } = data);

	let profileForm: HTMLFormElement;
	let loading = false;

	let fullName: string = profile?.full_name ?? '';
	let username: string = profile?.username ?? '';
	let dateOfBirth: Date = profile?.date_of_birth ?? '';
	let phoneNumber: number = profile?.phone_number ?? '';
	let gender: boolean = profile?.gender ?? '';

	// vô hiệu hoá nút "Cập nhật" khi form đang submit
	const handleSubmit = () => {
		loading = true;
		return async () => {
			loading = false;
		};
	};
</script>

<div class="flex flex-col justify-center items-center align-middle h-full">
	<h2 class="h2 text-center">Chỉnh sửa tiểu sử</h2>
	<br />
	<div class="w-9/12 lg:w-1/3 [&>*]:space-y-6">
		<form method="post" action="?/update" use:enhance={handleSubmit} bind:this={profileForm}>
			<div>
				<label for="fullName">Tên đầy đủ</label>
				<input id="fullName" name="fullName" type="text" value={form?.full_name ?? fullName} />
			</div>

			<div>
				<label for="username">Tên người dùng</label>
				<input id="username" name="username" type="text" value={form?.username ?? username} />
			</div>

			<div>
				<label for="dob">Ngày sinh</label>
				<input
					id="dob"
					name="date_of_birth"
					type="date"
					value={form?.date_of_birth ?? dateOfBirth}
				/>
			</div>

			<div>
				<label for="phone">Số điện thoại</label>
				<input
					id="phone"
					name="phone_number"
					type="tel"
					value={form?.phone_number ?? phoneNumber}
				/>
			</div>

			<div>
				<label for="gender">Giới tính</label>
				<div class="space-y-2">
					<label class="flex items-center space-x-2">
						<input class="radio" type="radio" name="gender" value="men" checked={gender} />
						<p>Nam</p>
					</label>
					<label class="flex items-center space-x-2">
						<input class="radio" type="radio" name="gender" value="women" checked={!gender} />
						<p>Nữ</p>
					</label>
				</div>
			</div>

			<div>
				<input type="submit" value={loading ? 'Vui lòng đợi...' : 'Cập nhật'} disabled={loading} />
			</div>
		</form>
	</div>
</div>
