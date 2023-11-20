<script lang="ts">
	import '../app.postcss';
	import { AppShell, AppBar } from '@skeletonlabs/skeleton';
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';

	export let data;

	let { supabase, session } = data;
	$: ({ supabase, session } = data);

	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });

	onMount(() => {
		const { data } = supabase.auth.onAuthStateChange((event, _session) => {
			if (_session?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		});

		return () => data.subscription.unsubscribe();
	});
</script>

<AppShell scrollbarGutter="auto">
	<svelte:fragment slot="header">
		<AppBar>
			<svelte:fragment slot="lead">
				<strong class="text-xl uppercase">CSRM</strong>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				<p>Người dùng</p>
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>

	<slot />
</AppShell>
