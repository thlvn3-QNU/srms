<script lang="ts">
	import '../app.postcss';
	import DrawerComponent from '$lib/Drawer.svelte';
	import { AppShell, AppBar } from '@skeletonlabs/skeleton';
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { initializeStores, storePopup, Drawer, getDrawerStore } from '@skeletonlabs/skeleton';
	import BurgerBtn from '$lib/BurgerBtn.svelte';

	initializeStores();

	const drawerStore = getDrawerStore();

	export let data;

	let { supabase, session, profile } = data;
	$: ({ supabase, session, profile } = data);

	// only show sidebar/burger button when logged in
	$: drawerDisplay = !session ? 'w-0' : 'w-0 lg:w-64';

	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });

	onMount(() => {
		const { data } = supabase.auth.onAuthStateChange((event, _session) => {
			if (_session?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		});

		return () => data.subscription.unsubscribe();
	});

	function drawerOpen(): void {
		if (!session) return;
		drawerStore.open({});
	}
</script>

<Drawer>
	<h2 class="p-4">Tra cứu kết quả học tập</h2>
	<hr />
	<DrawerComponent {supabase} {profile} />
</Drawer>

<AppShell scrollbarGutter="auto" slotSidebarLeft="bg-surface-500/5 {drawerDisplay}">
	<svelte:fragment slot="sidebarLeft">
		<DrawerComponent {supabase} {profile} />
	</svelte:fragment>

	<svelte:fragment slot="header">
		<AppBar>
			<svelte:fragment slot="lead">
				<div>
					{#if session}
						<BurgerBtn onclickEvent={drawerOpen} />
					{/if}
					<strong class="text-xl uppercase">Tra cứu kết quả học tập</strong>
				</div>
			</svelte:fragment>

			<svelte:fragment slot="trail">
				<div class="hidden lg:block">
					<p>{profile?.full_name || ''}</p>
				</div>
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>

	<slot />
</AppShell>
