<script lang="ts">
	import { getModalStore, type ModalSettings } from '@skeletonlabs/skeleton';
	import { PlusSolid } from 'svelte-awesome-icons';

	export let data;
	const ADD_STUDENT_MODAL: number = 1,
		EDIT_STUDENT_MODAL: number = 2,
		DELETE_STUDENT_MODAL: number = 3;

	let { supabase, session, students } = data;
	$: ({ supabase, session, students } = data);

	let studentTable: any[];
	$: studentTable = students as any[]; // Making table auto-updated without reloading

	const modalStore = getModalStore();

	let fieldNames: any = [];
	fieldNames = [
		'STT',
		'MSV',
		'Họ tên',
		'Ngày sinh',
		'Giới tính',
		'Địa chỉ',
		'Số điện thoại',
		'Khoá',
		'Lớp',
		''
	];

	function openModal(type: number, index: number) {
		let UpcomingMeta: any;

		if (type === ADD_STUDENT_MODAL) {
			UpcomingMeta = {
				type: ADD_STUDENT_MODAL
			};
		} else if (type === EDIT_STUDENT_MODAL) {
			UpcomingMeta = {
				type: EDIT_STUDENT_MODAL,
				data: {
					id: studentTable[index].id,
					student_id: studentTable[index].student_id,
					full_name: studentTable[index].full_name,
					date_of_birth: studentTable[index].date_of_birth,
					gender: studentTable[index].gender,
					address: studentTable[index].address,
					phone_number: studentTable[index].phone_number,
					school_year: studentTable[index].school_year,
					class_name: studentTable[index].class_name
				}
			};
		} else {
			UpcomingMeta = {
				type: DELETE_STUDENT_MODAL,
				data: { id: studentTable[index].id }
			};
		}

		let DataModal: ModalSettings = {
			type: 'component',
			component: 'modalComponent',
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
</script>

<div class="[&>*]:py-4">
	<div class="header flex flex-row justify-between w-full">
		<span>
			<h2 class="h2">Danh sách sinh viên</h2>
		</span>
		<span class="flex gap-3">
			<button
				type="button"
				class="variant-filled"
				on:click={() => openModal(1, -1)}><PlusSolid size="16" /> Thêm</button
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

	<div class="table-container">
		<table class="table table-hover">
			<thead class="text-center">
				<tr>
					{#each fieldNames as fName}
						<th>{fName}</th>
					{/each}
				</tr>
			</thead>

			<tbody>
				{#each studentTable as studentRow, i}
					<tr>
						<td>{i + 1}</td>

						<!-- Don't blame me -->
						<td>{studentRow?.student_id ?? 'Trống'}</td>
						<td>{studentRow?.full_name ?? 'Trống'}</td>
						<td>{studentRow?.date_of_birth ?? 'Trống'}</td>
						<td>{studentRow?.gender ? 'Nữ' : 'Nam'}</td>
						<td>{studentRow?.address ?? 'Trống'}</td>
						<td>{studentRow?.phone_number ? '0' + studentRow?.phone_number : 'Trống'}</td>
						<td>{studentRow?.school_year ?? 'Trống'}</td>
						<td>{studentRow?.class_name ?? 'Trống'}</td>

						<td>
							<button
								type="button"
								class="hover:variant-filled-error bg-green-500"
								on:click={() => openModal(EDIT_STUDENT_MODAL, i)}>Sửa</button
							>

							<button
								type="button"
								class="hover:variant-filled-error bg-red-500"
								on:click={() => openModal(DELETE_STUDENT_MODAL, i)}>Xoá</button
							>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>
