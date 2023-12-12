<script lang="ts">
	import { enhance } from "$app/forms";
	import { getModalStore } from "@skeletonlabs/skeleton";
	import type { SupabaseClient } from "@supabase/supabase-js";
	import type { SvelteComponent } from "svelte";

	export let parent: SvelteComponent;

	const modalStore = getModalStore();

    const subjectId = $modalStore[0].meta.id
    const submitAction = subjectId > 0 ? '?/update' : '?/create';
    const subjectData = $modalStore[0].meta.data;

    const supabase: SupabaseClient = $modalStore[0].meta.supabase;

    let disabled = false;

    function formEnhance() {
        disabled = true;
        return async () => {
			disabled = false;
            modalStore.close();
		};
    }
</script>

{#if $modalStore[0]}
    <div class="card-modal">
        <h3 class="h3">{subjectId > 0 ? 'Thay đổi thông tin' : 'Tạo mới'} môn học</h3>
        {#if subjectId !== -1}
            <p>ID: {subjectId}</p>
        {/if}
        <form method="POST" action="{submitAction}" class="[&>*]:py-2" use:enhance={formEnhance}>
            <input type="hidden" name="id" value="{subjectId}">
            <div>
                <label for="subject">Tên môn học</label>
                <input type="text" id="subject" name="subject" value="{subjectData?.name || ""}" {disabled}>
            </div>
            <div>
                <label for="credits">Tín chỉ</label>
                <input type="number" id="credits" name="credits" value="{subjectData?.credits || 0}" {disabled}>
            </div>
            <div>
                <input type="submit" value="Lưu thông tin" class="w-min variant-filled" {disabled}>
                <button class="variant-filled-error" on:click={modalStore.close} {disabled}>Huỷ bỏ</button>
            </div>
        </form>
    </div>
{/if}
