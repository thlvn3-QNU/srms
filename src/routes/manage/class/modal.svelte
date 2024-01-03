<script lang="ts">
	import { getModalStore, getToastStore } from '@skeletonlabs/skeleton';
	import type { SvelteComponent } from 'svelte';
	import type { ActionData } from './$types';
	import { enhance } from '$app/forms';
	import { invalidate } from '$app/navigation';

	const modalStore = getModalStore();
	const toastStore = getToastStore();

	const ADD_CLASS_MODAL: number = 1,
		EDIT_CLASS_MODAL: number = 2,
		DELETE_CLASS_MODAL: number = 3;

	const ID_INDEX: number = 10;

	export let parent: SvelteComponent;
	export let form: ActionData;

	let modalTitle: any;
	let labels: any = [];
	let inputNames: any = [];
	let classData: any = [];
	let type: any = $modalStore[0].meta.type;
	let classID: any = $modalStore[0].meta.data.id;
	let subjectList: any[];
	let teacherList: any[];
	let selectedTeacher: any = $modalStore[0].meta.data.current_teacher;
	let selectedSubject: any = $modalStore[0].meta.data.current_subject;
	teacherList = $modalStore[0].meta.data.teachers;
	subjectList = $modalStore[0].meta.data.subjects;
	
	// https://codepen.io/TimPietrusky/pen/rKzoGN
	var collator = new Intl.Collator('en', {numeric: true, sensitivity: 'base'});
	subjectList.sort((a,b) => collator.compare(a.name, b.name));
	teacherList.sort((a,b) => collator.compare(a.full_name, b.full_name));

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
				invalidate('class:reload');
				modalStore.close();
			}
		};
	}

	labels = ['Mã lớp học phần', 'Tên học phần', 'Giáo viên'];
	inputNames = ['id', 'subject_name', 'teacher_name'];

	if (type === EDIT_CLASS_MODAL) {
		modalTitle = 'Chỉnh sửa thông tin';
		classData = [
			$modalStore[0].meta.data.id,
			$modalStore[0].meta.data.name,
			$modalStore[0].meta.data.full_name
		];
	} else if (type === ADD_CLASS_MODAL) {
		modalTitle = 'Thêm thông tin';
	} else {
		modalTitle = 'Xoá thông tin';
		labels = ['Bạn có chắc chắn về việc xoá lớp này?'];
	}

	const cBase = 'card p-4 w-modal shadow-xl space-y-4';
	const cHeader = 'text-2xl font-bold';
	const cForm = 'border border-surface-500 p-4 space-y-4 rounded-container-token';
</script>

{#if $modalStore[0]}
	<div class={cBase}>
		<header class={cHeader}>{modalTitle}</header>
		<article />

		{#if type === DELETE_CLASS_MODAL}
			<form class={cForm} method="POST" action="/" use:enhance={formEnhance}>
				<label for="id" class="label">{labels[0]}</label>
				<input type="text" name="id" value={classID} hidden />
				<div class={parent.regionFooter}>
					<button class="btn {parent.buttonNeutral}" on:click={parent.onClose}>Huỷ</button>
					<button class="btn {parent.buttonPositive}" formaction="?/delete">Xoá</button>
				</div>
			</form>
		{:else}
			<form class={cForm} method="POST" action="/" use:enhance={formEnhance}>
				{#each labels as label, i}
					<label for="df" class="label">
						<span>{label}</span>
						{#if inputNames[i] === 'subject_name'}
							<select name="subject_id" class="select" value={selectedSubject} required>
								{#each subjectList as subject}
									<option value={subject.id}>{subject.name}</option>
								{/each}
							</select>
						{:else if inputNames[i] === 'teacher_name'}
							<select name="teacher_id" class="select" value={selectedTeacher} required>
								{#each teacherList as teacher}
									<option value={teacher.id}>{teacher.full_name}</option>
								{/each}
							</select>
						{:else}
							<input
								class="input"
								type="text"
								name={inputNames[i]}
								bind:value={classData[i]}
								placeholder="Không có"
								required
							/>
						{/if}
					</label>
				{/each}

				<input name="id" class="input" type="hidden" value={classData[ID_INDEX]} />

				<div class={parent.regionFooter}>
					<button class="btn {parent.buttonNeutral}" on:click={parent.onClose}>Huỷ</button>
					<button class="btn {parent.buttonPositive}" formaction="?/upsert">Lưu</button>
				</div>
			</form>
		{/if}
		<!-- prettier-ignore -->
	</div>
{/if}
