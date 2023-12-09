<script lang="ts">
	import { getModalStore } from "@skeletonlabs/skeleton";
	import type { SupabaseClient } from "@supabase/supabase-js";
	import type { SvelteComponent } from "svelte";

	export let parent: SvelteComponent;

	const modalStore = getModalStore();

    const subjectId = $modalStore[0].meta.id
    const submitAction = subjectId > 0 ? '?/update-subject' : '?/create-subject';
    const subjectData = $modalStore[0].meta.data;

    const supabase: SupabaseClient = $modalStore[0].meta.supabase;
</script>

{#if $modalStore[0]}
    <div class="card-modal">
        <h3 class="h3">{subjectId > 0 ? 'Thay đổi thông tin' : 'Tạo mới'} môn học</h3>
        {#if subjectId !== -1}
            <p>ID: {subjectId}</p>
        {/if}
        <form action="{submitAction}" class="[&>*]:py-2">
            <div>
                <label for="subject">Tên môn học</label>
                <input type="text" id="subject" name="subject" value="{subjectData?.name || ""}">
            </div>
            <div>
                <label for="credits">Tín chỉ</label>
                <input type="number" id="credits" name="credits" value="{subjectData?.credits || 0}">
            </div>
            <div>
                <input type="submit" value="Lưu thông tin" class="w-min variant-filled">
                <button class="variant-filled-error" on:click={modalStore.close}>Huỷ bỏ</button>
            </div>
        </form>
    </div>
{/if}
