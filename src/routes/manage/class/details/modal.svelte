<script lang="ts">
	import { getModalStore, getToastStore, popup } from '@skeletonlabs/skeleton';
	import type { SvelteComponent } from 'svelte';
	import type { ActionData } from './$types';
	import { enhance } from '$app/forms';
	import { invalidate } from '$app/navigation';
	import { Autocomplete } from '@skeletonlabs/skeleton';
	import type { AutocompleteOption } from '@skeletonlabs/skeleton';
	import { ConvertToNoAccentVietnamese } from '$lib';

	const modalStore = getModalStore();
	const toastStore = getToastStore();

	const ADD_DETAILS_MODAL: number = 1,
		  DELETE_DETAILS_MODAL: number = 2;

	export let parent: SvelteComponent;
	export let form: ActionData;

	let modalTitle: any;
	let labels: any = [];
	let inputNames: any = [];
	let type: any = $modalStore[0].meta.type;
	let currentClass: any = $modalStore[0].meta.data?.class;
	let studentList: any[] = $modalStore[0].meta.data?.students;
	
	var collator = new Intl.Collator('en', {numeric: true, sensitivity: 'base'});
	studentList?.sort((a: any,b: any) => collator.compare(a.full_name, b.full_name));

	class StudentData {
		id: string = '';
		student_id: string = '';
		full_name: string = '';

		toString(): string {
			return `${this.student_id} + ${this.full_name}`;
		}
	};

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

	labels = ['Mã sinh viên', 'Họ tên'];
	inputNames = ['id', 'full_name'];

	if (type === ADD_DETAILS_MODAL) {
		modalTitle = 'Thêm sinh viên';
	} else {
		modalTitle = 'Xoá sinh viên';
		labels = ['Bạn có chắc chắn?'];
	}			

	let currentStudent: StudentData = new StudentData;
	let autocompleteList: AutocompleteOption<string>[];

	currentStudent.id = $modalStore[0]?.meta.id ?? '';
	if (type === ADD_DETAILS_MODAL) {
		autocompleteList = BuildArrayForAutocomplete();
	}
	
	// For `Autocomplete` element filtering
	// TODO: actually fix this crap.
	let searchQuery: string;
	$: {
		searchQuery = `${currentStudent.student_id} ${currentStudent.full_name}`;

		// Workaround to fix showing `No Results Found.` when inputs have correct information.
		const checkSomethingIDK = document.getElementById("submit-button") as HTMLInputElement;
		if (checkSomethingIDK && checkSomethingIDK.disabled == false) {
			searchQuery = `${currentStudent.student_id} - ${currentStudent.full_name}`;
		}
	}

	function BuildArrayForAutocomplete() {
		let daList: { label: string, value: string, keywords: string }[] = [];

		studentList.forEach(function (student) {
			let inserting = { 
				label: `${student.student_id} - ${student.full_name}`, 
				value: student.id, 
				keywords: `${student.student_id}, ${student.full_name}, ${ConvertToNoAccentVietnamese(student.full_name)}`
			};
			daList.push(inserting);
		});

		return daList;
	}

	function onStudentSelection(event: CustomEvent<AutocompleteOption<string>>): void {
		currentStudent.id = event.detail.value;

		UpdatecurrentStudent();
	}

	function UpdatecurrentStudent() {
		let daStudent = studentList?.find(x => x.id == currentStudent.id);

		if (daStudent) {
			currentStudent.student_id = daStudent?.student_id;
			currentStudent.full_name = daStudent?.full_name;

			SetSubmissionStatus(true);
		}
		else {
			SetSubmissionStatus(false);
		}

		return true;
	}

	function UpdatecurrentStudent_SID() {
		let daStudent = studentList?.find(x => x.student_id == currentStudent.student_id);
		if (daStudent) {
			currentStudent.id = daStudent?.id;
			currentStudent.full_name = daStudent?.full_name;

			SetSubmissionStatus(true);
		}
		else {
			currentStudent.id = '';
			currentStudent.full_name = '';
			SetSubmissionStatus(false);
		}

		return true;
	}

	function UpdatecurrentStudent_SNAME() {
		let daStudent = studentList?.find(x => x.full_name == currentStudent.full_name);
		if (daStudent) {
			currentStudent.id = daStudent?.id;
			currentStudent.student_id = daStudent?.student_id;

			SetSubmissionStatus(true);
		}
		else {
			currentStudent.id = '';
			currentStudent.student_id = '';
			SetSubmissionStatus(false);
		}

		return true;
	}

	function SetSubmissionStatus(state: boolean) {
		const daButton = document.getElementById("submit-button") as HTMLInputElement;
		if (daButton) daButton.disabled = !state;
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
			<form class={cForm} method="POST" action="?/delete" use:enhance={formEnhance}>
				<label for="id" class="label">{labels[0]}</label>
				<input type="hidden" name="id" value={currentStudent.id}/>
				<div class={parent.regionFooter}>
					<button 
						type="button" 
						class="btn {parent.buttonNeutral}" 
						on:click={parent.onClose}
					>
						Huỷ
					</button>

					<button 
						type="submit" 
						class="btn {parent.buttonPositive}"
					>
						Xoá
					</button>
				</div>
			</form>
		{:else}
			<form class={cForm} method="POST" action="?/upsert" use:enhance={formEnhance}>
				<div>
					<div class="w-1/2 p-2 float-left">
						<span>Mã sinh viên</span>
						<input 
							class="input" 
							type="search"
							name="student_id"
							bind:value={currentStudent.student_id}
							on:input={() => UpdatecurrentStudent_SID()}
							placeholder="Mã sinh viên..."
							autocomplete="off"
						/>
					</div>
					
					<div class="w-1/2 p-2 float-right">
						<span>Họ tên</span>
						<input 
							class="input" 
							type="search" 
							name="full_name" 
							bind:value={currentStudent.full_name}
							on:input={() => UpdatecurrentStudent_SNAME()}
							placeholder="Họ tên sinh viên..." 
							autocomplete="off"
						/>
					</div>
					
					<div class="card border border-surface-500 w-full max-h-48 p-2 overflow-y-auto">
						<Autocomplete 
							bind:input={searchQuery} 
							options={autocompleteList} 
							on:selection={onStudentSelection} 
						/>
					</div>
				</div>

				<div class="button-base-styles ml-96">
					<input name="class" type="hidden" bind:value={currentClass}/>
					<input name="id" type="hidden" bind:value={currentStudent.id}/>
	
					<div class={parent.regionFooter}>
						<button 
							type="button"
							class="btn {parent.buttonNeutral}" 
							on:click={parent.onClose}
						>
							Huỷ
						</button>

						<button 
							type="submit"
							id="submit-button" 
							class="btn {parent.buttonPositive}"
							disabled
						>
							Lưu
						</button>
					</div>
				</div>
			</form>
		{/if}
	</div>
{/if}
