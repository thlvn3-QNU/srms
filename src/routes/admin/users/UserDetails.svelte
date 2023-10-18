<script lang="ts">
	import { getModalStore } from '@skeletonlabs/skeleton';
	import UserRegular from 'svelte-awesome-icons/UserRegular.svelte';

	export let parent: any;

	const modalStore = getModalStore();
</script>

{#if $modalStore[0]}
	<div class="card p-4 w-modal shadow-xl space-y-4">
		<header class="text-2xl font-bold flex items-center gap-2"><UserRegular />Thông tin</header>
		<footer class="modal-footer {parent.regionFooter}">
			<button class={parent.buttonNeutral} on:click={parent.onClose}>Xong</button>
		</footer>
	</div>
{/if}
