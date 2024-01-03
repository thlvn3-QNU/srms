<script lang="ts">
	import { goto } from '$app/navigation';
	import { type ModalSettings, getModalStore } from '@skeletonlabs/skeleton';
	import { ArrowDownAZSolid, PlusSolid } from 'svelte-awesome-icons';
	import modal from './modal.svelte'

	export let data;

	const modalStore = getModalStore();

	const ADD_CLASS_MODAL = 1,
		  EDIT_CLASS_MODAL = 2,
		  DELETE_CLASS_MODAL = 3;

	let { supabase, session, classes, subjects, teachers } = data;
	$: ({ supabase, session, classes, subjects, teachers } = data);

	let classTable: any[];
	$: classTable = classes as any[];

	
	let fieldNames: string[] = ['Mã lớp học phần', 'Tên học phần', 'Giáo viên'];
	let lmao: string[] = ['id', 'name', 'full_name'];
	
	let sortBy = { col: 'id', ascending: true };

	function entry(index: number) {
		goto(`class/details?id=${index}`);
	}

	function openModal(type: number, index: number) {
		let UpcomingMeta: any;

		if (type === ADD_CLASS_MODAL) {
			UpcomingMeta = {
				type: ADD_CLASS_MODAL,
				data: {
					subjects: subjects,
					teachers: teachers
				}
			};
		} else if (type === EDIT_CLASS_MODAL) {
			UpcomingMeta = {
				type: EDIT_CLASS_MODAL,
				data: {
					id: classTable[index].id,
					current_subject: classTable[index].subject_id,
					current_teacher: classTable[index].teacher_id,
					subjects: subjects,
					teachers: teachers
				}
			};
		} else {
			UpcomingMeta = {
				type: DELETE_CLASS_MODAL,
				data: { id: classTable[index].id }
			};
		}

		let DataModal: ModalSettings = {
			type: 'component',
			component: { ref: modal },
			meta: UpcomingMeta
		};

		modalStore.trigger(DataModal);
	}

	let SearchQuery: string = '';

	// A pure Javascript function. The dev is dumb. Deal with it lol
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

	function SortTable(column: any) {
		if (sortBy.col === column) {
			sortBy.ascending = !sortBy.ascending;
		}
		else {
			sortBy.col = column;
			sortBy.ascending = true;
		}

		var collator = new Intl.Collator('en', {numeric: true, sensitivity: 'base'});
		let compare = (a: any, b: any) => collator.compare(a[column], b[column]);

		classTable = classTable.sort(compare);
		if (!sortBy.ascending) classTable = classTable.reverse();
	}

	//SortTable('id'); // Why did this cause Internal Error?????????
</script>

<div class="[&>*]:py-4">
	<div class="header flex flex-row justify-between w-full">
		<span>
			<h2 class="h2">Danh sách lớp học</h2>
		</span>
		<span class="flex gap-4">
			<button class="variant-filled" on:click={() => openModal(ADD_CLASS_MODAL, -1)}><PlusSolid size="16" />Thêm</button>
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
		<table class="table table-hover">
			<thead class="text-center">
				<tr>
					{#each fieldNames as fName, i}
						<th>{fName}<ArrowDownAZSolid on:click={() => SortTable(lmao[i])} class="float-right"/></th>
					{/each}
				</tr>
			</thead>

			<tbody>
				{#each classTable as classRow, i}
					<tr>
						<!-- Don't blame me -->
						<td on:click={() => entry(classRow.id)}>{classRow?.id ?? 'Trống'}</td>
						<td on:click={() => entry(classRow.id)}>{classRow?.name ?? 'Trống'}</td>
						<td on:click={() => entry(classRow.id)}>{classRow?.full_name ?? 'Trống'}</td>
						<td>
							<button
								type="button"
								class="hover:variant-filled-error bg-green-500"
								on:click={() => openModal(EDIT_CLASS_MODAL, i)}>Sửa</button
							>

							<button
								type="button"
								class="hover:variant-filled-error bg-red-500"
								on:click={() => openModal(DELETE_CLASS_MODAL, i)}>Xoá</button
							>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>
