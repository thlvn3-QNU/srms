<!-- src/routes/account/+page.svelte -->
<script lang="ts">
	import { enhance } from '$app/forms';

	export let data;
	export let form;

	let { session, supabase, profile } = data;
	$: ({ session, supabase, profile } = data);

	let profileForm: HTMLFormElement;
	let loading = false;

	let fullName: string = profile?.full_name ?? '';
	let dateOfBirth: Date = profile?.date_of_birth ?? '';

	// Someone prefers 'phone_number' as numbers. Fuck that guy.
	let phoneNumber: string;
	if (profile?.phone_number)
	{
		phoneNumber = "0" + profile?.phone_number;
	}
	// let phoneNumber: number = + profile?.phone_number ?? '';
	let gender: boolean = profile?.gender ?? '';

	console.log(gender);

	const handleSubmit = () => {
		loading = true;
		return async () => {
			loading = false;
		};
	};
</script>

<div class="flex flex-col h-full">
	<h2 class="h2">Chỉnh sửa tiểu sử</h2>
	<br />
	<div class="[&>*]:space-y-6">
		<form method="post" action="?/update" use:enhance={handleSubmit} bind:this={profileForm}>
			<div>
				<label for="fullName">Tên đầy đủ</label>
				<input id="fullName" name="full_name" type="text" value={form?.full_name ?? fullName} />
			</div>

			<div>
				<label for="dob">Ngày sinh</label>
				<input
					id="dob"
					name="date_of_birth"
					type="date"
					value={dateOfBirth}
				/>
			</div>

			<div>
				<label for="phone">Số điện thoại</label>
				<input
					id="phone"
					name="phone_number"
					type="tel"
					value={phoneNumber}
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
