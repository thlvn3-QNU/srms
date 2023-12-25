<script lang="ts">
	import '../app.postcss';
	import { onMount } from 'svelte';
	import { redirect } from '@sveltejs/kit';
	import { invalidate, goto } from '$app/navigation';
	import { Toast, initializeStores, getModalStore, storePopup, type ModalComponent, Modal } from '@skeletonlabs/skeleton';
	import { AngleDownSolid, RightFromBracketSolid } from 'svelte-awesome-icons';
	import { AppShell, AppBar, type PopupSettings, popup } from '@skeletonlabs/skeleton';
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import Drawer from '$lib/Drawer.svelte';
	
	// LongNhat's works - this is absolutely unhinged
	import ModalOne from './manage/student/modal.svelte';
	initializeStores();

	const modalStore = getModalStore();

	const modalRegistry: Record<string, ModalComponent> = {
		modalComponent: { ref: ModalOne }
	};
						

	export let data;

	let { supabase, session, profile } = data;
	$: ({ supabase, session, profile } = data);

	let hideControls: string = '';

	controlVisibility(session as unknown as Boolean); // wtf?

	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });

	onMount(() => {
		const { data } = supabase.auth.onAuthStateChange((event, _session) => {
			if (_session?.expires_at !== session?.expires_at) {
				controlVisibility(true);
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

	async function signOut() {
		if (session) {
			await supabase.auth.signOut();
			controlVisibility(false);
			goto('/', { invalidateAll: true });
			throw redirect(303, '/');
		}
	}

	function controlVisibility(visibility: Boolean) {
		hideControls = visibility ? '' : 'hidden';
	}
</script>

<Toast position="t" />
<Modal />

<Modal components={modalRegistry}/>

<AppShell
	scrollbarGutter="auto"
	slotSidebarLeft="bg-surface-500/5 w-64 p-4 {hideControls}"
	slotHeader={hideControls}
>
	<svelte:fragment slot="header">
		<AppBar>
			<svelte:fragment slot="lead">
				<!-- TODO: set text to page title-->
				<strong class="text-xl">CSRM</strong>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				<button class="hover:variant-ghost" use:popup={popupClick}>
					{#if profile?.full_name} {profile?.full_name}
					{:else if session?.user.email} {session?.user.email}
					{/if}

					<AngleDownSolid size="14" />
				</button>
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<svelte:fragment slot="sidebarLeft">
		<Drawer {profile}/>
	</svelte:fragment>

	<div class="p-6 h-full">
		<slot />
	</div>
</AppShell>

<div class="card p-4 variant-filled z-50" data-popup="sessionPopup">
	<div class="arrow variant-filled" />
	<button class="hover:variant-filled-error" on:click={signOut}>
		Đăng xuất <RightFromBracketSolid size="16" />
	</button>
</div>
