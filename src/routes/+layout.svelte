<script lang="ts">
	import '../app.postcss';
	import { AppShell, AppBar, type PopupSettings, popup } from '@skeletonlabs/skeleton';
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	import { AngleDownSolid, RightFromBracketSolid } from 'svelte-awesome-icons';

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

	const popupClick: PopupSettings = {
		event: 'click',
		target: 'sessionPopup',
		placement: 'bottom'
	};
</script>

<div class="card p-4 variant-filled z-50" data-popup="sessionPopup">
	<div class="arrow variant-filled" />
	<button class="[&>*]:mx-2 hover:variant-filled-error">
		Đăng xuất <RightFromBracketSolid size="16" />
	</button>
</div>

<AppShell scrollbarGutter="auto" slotSidebarLeft="bg-surface-500/5 w-64 p-4">
	<svelte:fragment slot="header">
		<AppBar>
			<svelte:fragment slot="lead">
				<strong class="text-xl uppercase">CSRM</strong>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				<button class="[&>*]:mx-2 hover:variant-ghost" use:popup={popupClick}>
					{profile?.username}
					<AngleDownSolid size="14" />
				</button>
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<svelte:fragment slot="sidebarLeft">
		<p>implement sidebar here.</p>
	</svelte:fragment>

	<div class="p-6">
		<slot />
	</div>
</AppShell>
