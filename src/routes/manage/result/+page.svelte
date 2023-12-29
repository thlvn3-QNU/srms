<script lang="ts">
	import type { ModalSettings, TableSource, ToastSettings } from '@skeletonlabs/skeleton';
	import { Table, tableMapperValues, getModalStore, getToastStore } from '@skeletonlabs/skeleton';
	import { PlusSolid } from 'svelte-awesome-icons';
	import DataModify from './DataModify.svelte';
	import type { PageData } from './$types';

	const modalStore = getModalStore();
	const toastStore = getToastStore();

	export let data: PageData;

	let { supabase, session, score, students, subject } = data;
	$: ({ supabase, session, score, students, subject } = data);

	let scoreTable: any[] = score as any[];
	$: scoreTable = score as any[];

	let studentsTable: any[] = students as any[];
	$: studentsTable = students as any[];

	let subjectTable: any[] = subject as any[];
	$: subjectTable = subject as any[];

	let displayTable: TableSource;
	$: displayTable = {
		head: ['ID', 'MSSV', 'Họ tên', 'Môn học', 'Quá trình', 'Giữa kì', 'Cuối kì', 'Tổng điểm'],
		body: tableMapperValues(scoreTable, [
			'id',
			'student_id',
			'full_name',
			'name',
			'progress',
			'mid_term',
			'last_term',
			'total'
		])
	};

	const modal: ModalSettings = {
		type: 'component',
		component: { ref: DataModify },
		meta: { supabase, id: 0, studentsTable: studentsTable, subjectTable: subjectTable }
	};

	let toast;
	let interactive = true;
	const t: ToastSettings = {
		message: 'Đang tải dữ liệu....',
		background: 'variant-filled-tertiary',
		hideDismiss: true,
		timeout: 99999
	};

	async function entrySelect(meta: any) {
		toast = toastStore.trigger(t);
		interactive = false;
		const { data: scoreData } = await supabase
			.from('score')
			.select(
				'id, id_student ,...id_student(student_id, full_name),subject_id, ...subject_id(name) ,progress , mid_term , last_term, total '
			)
			.eq('id', meta.detail[0])
			.single();
		modal.meta.id = meta.detail[0];
		modal.meta.data = scoreData;
		modalStore.trigger(modal);
		toastStore.close(toast);
		interactive = true;
	}

	function handelInsertResult() {
		modal.meta.id = -1;
		modal.meta.data = {};
		modalStore.trigger(modal);
	}

	let SearchQuery: string = '';

	function searchTable() {
		let query = SearchQuery.toUpperCase().trim();

		let RowList = document.getElementsByTagName('tr');

		for (let i = 0; i < RowList.length; i++) {
			let CellList = RowList[i].getElementsByTagName('td');

			for (let j = 0; j < CellList.length; j++) {
				if (CellList[j] && CellList[j].innerHTML.toUpperCase().indexOf(query) > -1) {
					RowList[i].style.display = '';
					break;
				} else {
					RowList[i].style.display = 'none';
				}
			}
		}
	}
</script>

<div class="[&>*]:py-4">
	<div class="header flex flex-row justify-between w-full">
		<span>
			<h2 class="h2">Điểm thi</h2>
		</span>
		<span class="flex gap-4">
			<button class="variant-filled" on:click={handelInsertResult}
				><PlusSolid size="16" />Thêm</button
			>
			<input
				type="text"
				name="search-box"
				id="search-box"
				placeholder="Tìm kiếm..."
				bind:value={SearchQuery}
				on:input={searchTable}
			/>
		</span>
	</div>
	<div class="content">
		<Table source={displayTable} {interactive} on:selected={entrySelect} />
	</div>
</div>
