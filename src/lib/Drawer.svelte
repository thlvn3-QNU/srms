<script lang="ts">
	import { goto } from '$app/navigation';
	import { redirect } from '@sveltejs/kit';
	import { getDrawerStore } from '@skeletonlabs/skeleton';
	import type { SupabaseClient } from '@supabase/supabase-js';

	export let profile: ProfileData | null;
	export let supabase: SupabaseClient;

	const drawerStore = getDrawerStore();

	function close(): void {
		drawerStore.close();
	}

	async function signOut() {
		close();
		const session = await supabase.auth.getSession();
		if (session) {
			await supabase.auth.signOut();
			goto('/');
			throw redirect(303, '/');
		}
	}
</script>

<!-- TODO: chỉnh link vào các trang cần thiết -->
<nav class="list-nav p-4 [&>*>*>*]:!no-underline">
	<ul>
		<li><a href="/" on:click={close}>Chỉnh sửa tiểu sử</a></li>

		<!-- TODO: Add each permission links here -->
		{#if profile?.permission === 2}
			<li><strong>Quản lí:</strong></li>
			<li><a href="/admin/users" on:click={close}>Người dùng</a></li>
			<li><a href="/admin/classes" on:click={close}>Danh sách lớp</a></li>
		{:else if profile?.permission === 1}
			<li><strong>Quản lí:</strong></li>
			<li><a href="/tutor/users" on:click={close}>Sinh viên</a></li>
			<li><a href="/tutor/classes" on:click={close}>Danh sách lớp</a></li>
		{:else if profile?.permission === 0}
			<li><a href="/student/scores" on:click={close}>Xem điểm</a></li>
		{/if}

		<hr />
		<li><a href={'#'} on:click={signOut}>Đăng xuất</a></li>
	</ul>
</nav>
