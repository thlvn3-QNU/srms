<script lang="ts">
	import { getModalStore } from "@skeletonlabs/skeleton";
	import type { SvelteComponent } from "svelte";

	export let parent: SvelteComponent;

	const modalStore = getModalStore();

    
</script>

{#if $modalStore[0]}
    <div class="card-modal">
        <p>Thay đổi thông tin môn học</p>
        <p>ID: {$modalStore[0].meta.id}</p>
    </div>
{/if}
