<script lang="ts">
	import { getModalStore, getToastStore } from '@skeletonlabs/skeleton';
	import type { SvelteComponent } from 'svelte';
	import type { ActionData } from './$types';
	import { enhance } from '$app/forms';
	import { invalidate } from '$app/navigation';

	const modalStore = getModalStore();
	const toastStore = getToastStore();

	const ADD_DETAILS_MODAL: number = 1,
		  DELETE_DETAILS_MODAL: number = 2;

	const ID_INDEX: number = 10;

	export let parent: SvelteComponent;
	export let form: ActionData;

	let modalTitle: any;
	let labels: any = [];
	let inputNames: any = [];
	let type: any = $modalStore[0].meta.type;
	let studentID: any = $modalStore[0].meta.id;
	let currentClass: any = $modalStore[0].meta.data?.class;
	let studentList: any[] = $modalStore[0].meta.data?.students;
	
	var collator = new Intl.Collator('en', {numeric: true, sensitivity: 'base'});
	studentList?.sort((a: any,b: any) => collator.compare(a.full_name, b.full_name));

	function formEnhance() {
		return async () => {
			if (form?.error) {
				toastStore.trigger({
					message: 'Không thể xử lí yêu cầu',
					background: 'variant-filled-error',
					hideDismiss: true
				});
			} else {
				toastStore.trigger({
					message: 'Thao tác thành công',
					background: 'variant-filled-secondary',
					hideDismiss: true
				});
				invalidate('details:reload');
				modalStore.close();
			}
		};
	}

	let currentStudentID = studentList?.[0].id;
	$: currentStudentName = studentList?.find(x => x.id == currentStudentID).full_name;

	labels = ['Mã sinh viên', 'Họ tên'];
	inputNames = ['id', 'full_name'];

	if (type === ADD_DETAILS_MODAL) {
		modalTitle = 'Thêm sinh viên';
	} else {
		modalTitle = 'Xoá sinh viên';
		labels = ['Bạn có chắc chắn?'];
	}

	const cBase = 'card p-4 w-modal shadow-xl space-y-4';
	const cHeader = 'text-2xl font-bold';
	const cForm = 'border border-surface-500 p-4 space-y-4 rounded-container-token';
</script>

{#if $modalStore[0]}
	<div class={cBase}>
		<header class={cHeader}>{modalTitle}</header>
		<article />

		{#if type === DELETE_DETAILS_MODAL}
			<form class={cForm} method="POST" action="/" use:enhance={formEnhance}>
				<label for="id" class="label">{labels[0]}</label>
				<input type="hidden" name="id" value={studentID}/>
				<div class={parent.regionFooter}>
					<button class="btn {parent.buttonNeutral}" on:click={parent.onClose}>Huỷ</button>
					<button class="btn {parent.buttonPositive}" formaction="?/delete">Xoá</button>
				</div>
			</form>
		{:else}
			<form class={cForm} method="POST" action="/" use:enhance={formEnhance}>
				<label for="df" class="label">
					<span>Mã sinh viên</span>
					<select 
						name="student_id" 
						class="select" 
						bind:value={currentStudentID}
						required
					>
						{#each studentList as student, i}
							<option value={student.id}>{student.student_id}</option>
						{/each}
					</select>
					
					<span>Họ tên</span>
					<input
						class="input"
						type="text"
						bind:value={currentStudentName}
						placeholder="Không có"
						required
						disabled
					/>
				</label>

				<input name="class" type="hidden" value={currentClass}/>

				<div class={parent.regionFooter}>
					<button class="btn {parent.buttonNeutral}" on:click={parent.onClose}>Huỷ</button>
					<button class="btn {parent.buttonPositive}" formaction="?/upsert">Lưu</button>
				</div>
			</form>
		{/if}
	</div>
{/if}
