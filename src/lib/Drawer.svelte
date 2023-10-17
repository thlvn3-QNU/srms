<script lang="ts">
	import { getDrawerStore } from '@skeletonlabs/skeleton';
	import type { PostgrestSingleResponse } from '@supabase/supabase-js';

	export let profile: ProfileData | null;

	const drawerStore = getDrawerStore();

	function close(): void {
		drawerStore.close();
	}
</script>

<!-- TODO: chỉnh link vào các trang cần thiết -->
<nav class="list-nav p-4 [&>*>*>*]:!no-underline">
	<ul>
		<!-- TODO: Add admin only links here -->
		{#if profile?.permission === 2}
			<hr />
		{/if}
		<li><a href="/" on:click={close}>Homepage</a></li>
		<li><a href="/about" on:click={close}>About</a></li>
		<li><a href="/blog" on:click={close}>Blog</a></li>
		<li><a href="/contact" on:click={close}>Contact</a></li>
	</ul>
</nav>
