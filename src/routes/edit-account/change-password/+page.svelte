<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';
	import { getToastStore, type ToastSettings, type ToastStore } from '@skeletonlabs/skeleton';

	export let form: ActionData;
	let loading = false;

	const handleSubmit = () => {
		loading = true;
		return async () => {
			loading = false;
		};
	};
</script>

<div class="[&>*]:space-y-6">
	<h2 class="h2">Đổi mật khẩu</h2>
	<br />
	<form method="post" action="?/update" use:enhance={handleSubmit}>
		<div>
			<label for="new">Mật khẩu mới</label>
			<input type="password" name="new-password" id="new" required />
		</div>
		<div>
			<label for="confirm">Nhập lại mật khẩu mới</label>
			<input type="password" name="confirm-password" id="confirm" required />
		</div>
		<div>
			<input type="submit" value="Cập nhật mật khẩu" disabled={loading} />
		</div>
		{#if form?.error}<p class="red">{form?.message}</p>{/if}
	</form>
</div>
