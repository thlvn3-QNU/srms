<script lang="ts">
	import { type ModalSettings, getModalStore } from '@skeletonlabs/skeleton';
	import { ArrowDownAZSolid, PlusSolid } from 'svelte-awesome-icons';
	import modal from './modal.svelte'

	export let data;

	const modalStore = getModalStore();

	const ADD_DETAILS_MODAL = 1,
		DELETE_DETAILS_MODAL = 2;

	let { supabase, session, details, classDes, studentList } = data;
	$: ({ supabase, session, details, classDes, studentList } = data);

	let detailsTable: any[];
	$: detailsTable = details as any[];

	let classDescription: any = classDes;
	
	let fieldNames: string[] = ['Mã sinh viên', 'Tên', 'Ngày sinh'];
	let lmao: string[] = ['student_id', 'full_name', 'date_of_birth'];
	
	let sortBy = { col: 'id', ascending: false };

	function openModal(type: number, index: number) {
		let UpcomingMeta: any;

		if (type === ADD_DETAILS_MODAL) {
			UpcomingMeta = {
				type: ADD_DETAILS_MODAL,
				data: {
					students: studentList,
					class: classDescription[0].id
				}
			};
		} else {
			UpcomingMeta = {
				type: DELETE_DETAILS_MODAL,
				id: studentList?.find(x => x.student_id == detailsTable[index].student_id)?.id
			};
			console.log(UpcomingMeta);
		}

		let DataModal: ModalSettings = {
			type: 'component',
			component: { ref: modal },
			meta: UpcomingMeta
		};

		modalStore.trigger(DataModal);
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

		detailsTable = detailsTable.sort(compare);
		if (!sortBy.ascending) detailsTable = detailsTable.reverse();
	}

	//SortTable('id'); // Why did this cause Internal Error?????????
</script>

<div class="[&>*]:py-4">
	<div class="header flex flex-row justify-between w-full">
		<span>
			<h2 class="h2">Lớp: {classDescription[0].name}. Giáo viên: {classDescription[0].full_name ?? "Chưa có"}</h2>
		</span>
		<span class="flex gap-4">
			<button class="variant-filled" on:click={() => openModal(ADD_DETAILS_MODAL, -1)}><PlusSolid size="16" />Thêm</button>
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
				{#each detailsTable as detailsRow, i}
					<tr>
						<td>{detailsRow?.student_id ?? 'Trống'}</td>
						<td>{detailsRow?.full_name ?? 'Trống'}</td>
						<td>{detailsRow?.date_of_birth ?? 'Trống'}</td>
						<td>
							<button
								type="button"
								class="hover:variant-filled-error bg-red-500"
								on:click={() => openModal(DELETE_DETAILS_MODAL, i)}>Xoá</button
							>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>
