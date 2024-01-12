<script lang="ts">
	import { enhance } from '$app/forms';
	import {
		Accordion,
		AccordionItem,
		getModalStore,
		getToastStore,
		type ModalSettings
	} from '@skeletonlabs/skeleton';
	import type { SupabaseClient } from '@supabase/supabase-js';
	import type { SvelteComponent } from 'svelte';
	import type { ActionData } from './$types';
	import { invalidate } from '$app/navigation';
	import { TrashCanRegular } from 'svelte-awesome-icons';

	const modalStore = getModalStore();
	const toastStore = getToastStore();

	const subjectId = $modalStore[0].meta.id;
	const submitAction = subjectId > 0 ? '?/update' : '?/create';
	const subjectData = $modalStore[0].meta.data;

	const supabase: SupabaseClient = $modalStore[0].meta.supabase;

	// FIXME: form is null.
	export let form: ActionData;
	$: console.log(form);

	let disabled = false;

	function formEnhance() {
		disabled = true;
		return async () => {
			disabled = false;
			console.log(form);
			if (form?.error) {
				toastStore.trigger({
					message: 'Không thể xử lý yêu cầu.',
					background: 'variant-filled-error',
					hideDismiss: true
				});
			} else {
				toastStore.trigger({
					message: 'Cập nhật thành công!',
					background: 'variant-filled-secondary',
					hideDismiss: true
				});
				invalidate('subject:reload');
				modalStore.close();
			}
		};
	}

	async function deleteEntry() {
		disabled = true;
		await supabase.from('subject').delete().eq('id', subjectId);
		toastStore.trigger({
			message: 'Xoá thành công!',
			background: 'variant-filled-secondary',
			hideDismiss: true
		});
		invalidate('subject:reload');
		modalStore.close();
	}
</script>

{#if $modalStore[0]}
	<div class="card-modal">
		<h3 class="h3">{subjectId > 0 ? 'Thay đổi thông tin' : 'Tạo mới'} môn học</h3>
		{#if subjectId !== -1}
			<p>ID: {subjectId}</p>
		{/if}
		<form method="POST" action={submitAction} class="[&>*]:py-2" use:enhance={formEnhance}>
			<input type="hidden" name="id" value={subjectId || form?.id} />
			<div>
				<label for="subject">Tên môn học</label>
				<input
					type="text"
					id="subject"
					name="subject"
					value={subjectData?.name || form?.name || ''}
					{disabled}
					required
				/>
			</div>
			<div>
				<label for="credits">Tín chỉ</label>
				<input
					type="number"
					id="credits"
					name="credits"
					value={subjectData?.credits || form?.credits || 0}
					{disabled}
					required
				/>
			</div>
			<div>
				<input type="submit" value="Lưu thông tin" class="w-min variant-filled" {disabled} />
				<button type="button" class="variant-filled-error" on:click={modalStore.close} {disabled}
					>Huỷ bỏ</button
				>
			</div>
			{#if subjectId !== -1}
				<hr />
				<Accordion regionCaret="w-10">
					<AccordionItem>
						<svelte:fragment slot="lead"><TrashCanRegular /></svelte:fragment>
						<svelte:fragment slot="summary"><h3 class="h3">Xoá môn học</h3></svelte:fragment>
						<svelte:fragment slot="content">
							<div>
								<br />
								<button type="button" on:click={deleteEntry} class="variant-filled-error" {disabled}
									>Xoá môn học</button
								>
								<br />
								<br />
								<p>Xoá môn học này sẽ không xoá các lớp trùng môn học này.</p>
							</div>
						</svelte:fragment>
					</AccordionItem>
				</Accordion>
			{/if}
		</form>
	</div>
{/if}
