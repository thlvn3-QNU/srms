<script lang="ts">
	import { getModalStore, getToastStore } from '@skeletonlabs/skeleton';
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
		  DELETE_DETAILS_MODAL: number = 2,
		  ID_LIST: number = 3,
		  NAME_LIST: number = 4;

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

	//$: currentID = studentList?.[0].id;
	//$: currentStudentName = studentList?.find(x => x.id == currentStudentID).full_name;

	labels = ['Mã sinh viên', 'Họ tên'];
	inputNames = ['id', 'full_name'];

	if (type === ADD_DETAILS_MODAL) {
		modalTitle = 'Thêm sinh viên';
	} else {
		modalTitle = 'Xoá sinh viên';
		labels = ['Bạn có chắc chắn?'];
	}			

	let choosingStudent: StudentData = new StudentData;
	let autocompleteList: AutocompleteOption<string>[] = BuildArrayForAutocomplete();

	$: searchQuery = `${choosingStudent.student_id} ${choosingStudent.full_name}`;

	function BuildArrayForAutocomplete() {
		let builder: { label: string, value: string, keywords: string }[] = [];

		studentList.forEach(function (student) {
			let inserting = { 
				label: `${student.student_id} - ${student.full_name}`, 
				value: student.id, 
				keywords: `${student.student_id}, ${student.full_name}, ${ConvertToNoAccentVietnamese(student.full_name)}`
			};
			builder.push(inserting);
		});

		console.log(builder[0].keywords);
			
			// studentList.forEach(function (student) {
			// 	let inserting = { label: student.full_name, value: student.full_name, keywords: student.student_id };
			// 	builder.push(inserting);
			// })
		return builder;
	}

	function onStudentSelection(event: CustomEvent<AutocompleteOption<string>>): void {
		choosingStudent.id = event.detail.value;
		console.log(choosingStudent.id);

		UpdateChoosingStudent();
	}

	function UpdateChoosingStudent() {
		let daStudent = studentList?.find(x => x.id == choosingStudent.id);

		if (daStudent) {
			choosingStudent.student_id = daStudent?.student_id;
			choosingStudent.full_name = daStudent?.full_name;

			UpdateInputStatus(true);
		}
		else {
			UpdateInputStatus(false);
		}

		return true;
	}

	function UpdateChoosingStudent_SID() {
		let daStudent = studentList?.find(x => x.student_id == choosingStudent.student_id);
		if (daStudent) {
			choosingStudent.id = daStudent?.id;
			choosingStudent.full_name = daStudent?.full_name;
		}
		else {
			choosingStudent.id = '';
			choosingStudent.full_name = '';
			UpdateInputStatus(false);
		}

		FilterAutocompleteList();

		return true;
	}

	function UpdateChoosingStudent_SNAME() {
		let daStudent = studentList?.find(x => x.full_name == choosingStudent.full_name);
		if (daStudent) {
			choosingStudent.id = daStudent?.id;
			choosingStudent.student_id = daStudent?.student_id;
		}
		else {
			choosingStudent.id = '';
			choosingStudent.student_id = '';
			UpdateInputStatus(false);
		}

		return true;
	}

	function UpdateInputStatus(status: boolean) {
		//TODO: Disable confirmation button if false data
	}

	function ChangeFocusVisibility(type: number) {
		if (type === ID_LIST) {

		}
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
				<div>
					<div class="w-1/2 p-2 float-left">
						<span>Mã sinh viên</span>
						<input 
							class="input" 
							type="search" 
							name="student_id" 
							bind:value={choosingStudent.student_id}
							on:input={() => UpdateChoosingStudent_SID()}
							placeholder="Mã sinh viên..."
						/>
					</div>
					
					<div class="w-1/2 p-2 float-right">
						<span>Họ tên</span>
						<input 
							class="input" 
							type="search" 
							name="full_name" 
							bind:value={choosingStudent.full_name}
							on:input={() => UpdateChoosingStudent_SNAME()}
							placeholder="Họ tên sinh viên..." 
						/>
					</div>

					<Autocomplete 
						class="card border border-surface-500 mt-3 w-full max-w-sm max-h-48 p-4 overflow-y-auto"
						bind:input={searchQuery} 
						options={autocompleteList} 
						on:selection={onStudentSelection} 
					/>
				</div>

				<div class="button-base-styles ml-96">
					<input name="class" type="hidden" bind:value={currentClass}/>
					<input name="id" type="hidden" bind:value={choosingStudent.id}/>
	
					<div class={parent.regionFooter}>
						<button class="btn {parent.buttonNeutral}" on:click={parent.onClose}>Huỷ</button>
						<button class="btn {parent.buttonPositive}" formaction="?/upsert">Lưu</button>
					</div>
				</div>
			</form>
		{/if}
	</div>
{/if}
