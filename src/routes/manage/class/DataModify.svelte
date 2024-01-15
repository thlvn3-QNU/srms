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

	const scoreId = $modalStore[0].meta.id;

	const student_id = $modalStore[0].meta.data.student_id;

	const submitAction = student_id > 0 ? '?/update' : '?/create';

	const supabase: SupabaseClient = $modalStore[0].meta.supabase;
	const scoreData = $modalStore[0].meta.data;

	const subject_id = $modalStore[0].meta.data.subject_id;
	let studentsTable = $modalStore[0].meta.studentsTable;
	let subjectTable = $modalStore[0].meta.subjectTable;

	let disabled = false;
	export let form: ActionData;
	$: console.log(form);
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
				invalidate('score:reload');
				modalStore.close();
			}
		};
	}

	async function deleteEntry() {
		disabled = true;
		await supabase.from('score').delete().eq('id', scoreId);

		toastStore.trigger({
			message: 'Xoá thành công!',
			background: 'variant-filled-secondary',
			hideDismiss: true
		});
		invalidate('score:reload');
		modalStore.close();
	}

	let progress = student_id > 0 ? scoreData?.progress : 0;
	let midTerm = student_id > 0 ? scoreData?.mid_term : 0;
	let lastTerm = student_id > 0 ? scoreData?.last_term : 0;
	let total = student_id > 0 ? progress * 0.1 + midTerm * 0.2 + lastTerm * 0.7 : 0;
	function calculateTotal() {
		total = progress * 0.1 + midTerm * 0.2 + lastTerm * 0.7;
		return total;
	}
</script>

{#if $modalStore[0]}
	<div class="card-modal">
		<h3 class="h3">{student_id > 0 ? 'Thay đổi thông tin' : 'Tạo mới'} kết quả học tập</h3>
		{#if student_id !== -1}
			<p>ID: {student_id}</p>
		{/if}
		{#if student_id > 0}
			<form method="POST" action={submitAction} class="[&>*]:py-2" use:enhance={formEnhance}>
				<input type="hidden" readonly name="score_id" value={scoreId} />

				<div>
					<label for="student_name">Tên sinh viên</label>
					<input
						type="text"
						id="student_name"
						name="student_name"
						value={scoreData?.full_name || ''}
						{disabled}
						required
						readonly
					/>
				</div>
				<input type="hidden" readonly name="subject_id" value={subject_id} />
				<div>
					<label for="subject_name">Môn học</label>
					<input
						type="text"
						id="student_name"
						name="subject_name"
						value={scoreData?.name || ''}
						{disabled}
						required
						readonly
					/>
				</div>

				<div>
					<label for="progress">Điểm quá trình</label>
					<input
						type="number"
						id="progress"
						name="progress"
						bind:value={progress}
						on:input={calculateTotal}
						{disabled}
						required
					/>
				</div>
				<div>
					<label for="mid_term">Điểm giữa kì</label>
					<input
						type="number"
						id="mid_term"
						name="mid_term"
						bind:value={midTerm}
						on:input={calculateTotal}
						{disabled}
						required
					/>
				</div>
				<div>
					<label for="last_term">Điểm cuối kì</label>
					<input
						type="number"
						id="last_term"
						name="last_term"
						bind:value={lastTerm}
						on:input={calculateTotal}
						{disabled}
						required
					/>
				</div>
				<div>
					<label for="total">Tổng điểm</label>
					<input
						type="number"
						id="total"
						name="total"
						bind:value={total}
						{disabled}
						readonly
						required
					/>
				</div>
				<div>
					<input type="submit" value="Lưu thông tin" class="w-min variant-filled" {disabled} />
					<button type="button" class="variant-filled-error" on:click={modalStore.close} {disabled}
						>Huỷ bỏ</button
					>
				</div>
				{#if scoreId !== -1}
					<hr />
					<Accordion regionCaret="w-10">
						<AccordionItem>
							<svelte:fragment slot="lead"><TrashCanRegular /></svelte:fragment>
							<svelte:fragment slot="summary"
								><h3 class="h3">Xoá kết quả học tập</h3></svelte:fragment
							>
							<svelte:fragment slot="content">
								<div>
									<br />
									<button
										type="button"
										on:click={deleteEntry}
										class="variant-filled-error"
										{disabled}
										>Xoá
									</button>
									<br />
									<br />
								</div>
							</svelte:fragment>
						</AccordionItem>
					</Accordion>
				{/if}
			</form>
		{:else}
			<form method="POST" action={submitAction} class="[&>*]:py-2" use:enhance={formEnhance}>
				<div>
					<label for="student_name">Tên sinh viên</label>

					<select name="student_id">
						<option>Chọn tên sinh viên</option>
						{#each studentsTable as item, id}
							<option value={item.id}>{item.full_name}</option>
						{/each}
					</select>
				</div>
				<div>
					<label for="class">Môn học</label>
					<select name="subject_id">
						<option>Chọn môn học</option>
						{#each subjectTable as item, id}
							<option value={item.id}>{item.name}</option>
						{/each}
					</select>
				</div>

				<div>
					<label for="progress">Điểm quá trình</label>
					<input
						type="number"
						id="progress"
						name="progress"
						bind:value={progress}
						on:input={calculateTotal}
						{disabled}
						required
					/>
				</div>
				<div>
					<label for="mid_term">Điểm giữa kì</label>
					<input
						type="number"
						id="mid_term"
						name="mid_term"
						bind:value={midTerm}
						on:input={calculateTotal}
						{disabled}
						required
					/>
				</div>
				<div>
					<label for="last_term">Điểm cuối kì</label>
					<input
						type="number"
						id="last_term"
						name="last_term"
						bind:value={lastTerm}
						on:input={calculateTotal}
						{disabled}
						required
					/>
				</div>
				<div>
					<label for="credits">Tổng điểm</label>
					<input
						type="number"
						id="total"
						name="total"
						bind:value={total}
						required
						readonly
						{disabled}
					/>
				</div>
				<div>
					<input type="submit" value="Lưu thông tin" class="w-min variant-filled" {disabled} />
					<button type="button" class="variant-filled-error" on:click={modalStore.close} {disabled}
						>Huỷ bỏ</button
					>
				</div>
			</form>
		{/if}
	</div>
{/if}
