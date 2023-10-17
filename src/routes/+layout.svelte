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
		drawerStore.open({});
	}
</script>

<Drawer>
	<h2 class="p-4">Navigation</h2>
	<hr />
	<DrawerComponent {profile} />
</Drawer>

<AppShell scrollbarGutter="auto" slotSidebarLeft="bg-surface-500/5 w-0 lg:w-64">
	<svelte:fragment slot="sidebarLeft">
		<DrawerComponent {profile} />
	</svelte:fragment>

	<svelte:fragment slot="header">
		<AppBar>
			<svelte:fragment slot="lead">
				<div>
					<BurgerBtn onclickEvent={drawerOpen} />
					<strong class="text-xl uppercase">Tra cứu kết quả học tập</strong>
				</div>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				<div class="hidden lg:block">
					<p>{profile?.full_name}</p>
				</div>
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>

	<slot />
</AppShell>
