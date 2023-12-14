<script lang="ts">
	import {
		PlusSolid,
		PenToSquareRegular,
		FileLinesRegular,
		TrashCanRegular,
		AngleLeftSolid,
		AngleRightSolid,
		CircleXmarkSolid
	} from 'svelte-awesome-icons';

	import { goto } from '$app/navigation';
	import { Table, tableMapperValues, type TableSource } from '@skeletonlabs/skeleton';
	export let data;

	let { supabase, session, score, classData, profiles, subject } = data;
	$: ({ supabase, session, score, classData, profiles, subject } = data);

	let scoreTable: any[] = score as any[];
	const displayTable: TableSource = {
		head: ['Tên sinh viên', 'Điểm quá trình', 'Điểm giữa kì', 'Điểm cuối kì', 'Điểm tổng'],
		body: tableMapperValues(scoreTable, [
			'full_name',
			'progress',
			'mid_term',
			'last_term',
			'total'
		]),
		meta: tableMapperValues(scoreTable, ['id'])
	};

	let classTable: any[] = classData as any[];
	let profilesTable: any[] = profiles as any[];
	let subjectTable: any[] = subject as any[];

	let showModalInsert = false;
	let showModalDetails = false;
	let showModalEdit = false;
	let showModalDelete = false;

	function entrySelect(meta: any) {
		// goto(`result/details?id=${meta.detail[0]}`);
		const rowId = meta.target.closest('tr').dataset.id;
		goto(`result/details?id=${rowId}`);
	}
	let score_subject = '';
	scoreTable.filter((item) => {
		score_subject = item.name;
	});

	let toggleModalInsert = () => {
		showModalInsert = !showModalInsert;
	};

	let toggleModalDetails = () => {
		showModalDetails = !showModalDetails;
	};

	let toggleModalEdit = () => {
		showModalEdit = !showModalEdit;
	};

	let toggleModalDelete = () => {
		showModalDelete = !showModalDelete;
	};
	let student_id = '';
	let class_id = '';
	let subject_id = '';
	let progress = '';
	let mid_term = '';
	let last_term = '';
	let total = '';

	let handelInsertResult = async () => {
		const data = {
			student_id: student_id,
			class_id: class_id,
			subject_id: subject_id,
			progress: progress,
			mid_term: mid_term,
			last_term: last_term,
			total: total
		};
		const { data: result, error } = await supabase.from('score').insert([{ data }]);
		if (error) {
			alert('Thêm kết quả học tập thất bại!');
			showModalInsert = !showModalInsert;
		} else {
			alert('Thêm kết quả học tập thành công!');
			showModalInsert = !showModalInsert;
		}
	};
</script>

<div class="[&>*]:py-4">
	<div class="header flex flex-row justify-between w-full">
		<span>
			<h2 class="h2">Điểm thi</h2>
			<p>{score_subject}</p>
		</span>
		<span class="flex gap-4 py-3">
			<button class="variant-filled" on:click={toggleModalInsert}
				><PlusSolid size="16" class="outline-none" />Thêm</button
			>
			<input type="text" name="search-box" id="search-box" placeholder="Tìm kiếm..." />
		</span>
	</div>
	<div class="flex flex-col">
		<div class="overflow-x-auto rounded-md">
			<div class="inline-block min-w-full">
				<div class="overflow-hidden">
					<table class="min-w-full">
						<thead class="">
							<tr class="text-white font-bold bg-[#374151]">
								<th scope="col" class="text-sm px-6 py-4 text-left">MSSV</th>
								<th scope="col" class="text-sm px-6 py-4 text-left">Họ tên </th>
								<th scope="col" class="text-sm px-6 py-4 text-left"> Lớp </th>
								<th scope="col" class="text-sm px-6 py-4 text-left"> Tổng điểm </th>
								<th scope="col" class="text-sm px-6 py-4 text-left"> Chi tiết </th>
								<th scope="col" class="text-sm px-6 py-4 text-left"> Sửa </th>
								<th scope="col" class="text-sm px-6 py-4 text-left"> Xóa </th>
							</tr>
						</thead>
						<tbody>
							{#each scoreTable as item, index (item.id)}
								<tr
									class=" text-white transition duration-300 ease-in-out hover:bg-[#293648] bg-[#1f2937]"
								>
									<td class="px-6 py-4 whitespace-nowrap text-sm font-medium"
										>{item.student_id}
									</td>
									<td class="px-6 py-4 whitespace-nowrap text-sm font-medium">{item.full_name} </td>

									<td class="px-6 py-4 whitespace-nowrap text-sm font-medium">{item.name} </td>
									<td class="px-6 py-4 whitespace-nowrap text-sm font-medium">{item.total} </td>
									<td
										><button on:click={toggleModalDetails}>
											<FileLinesRegular size="16" /></button
										></td
									>
									<td
										><button on:click={toggleModalEdit}>
											<PenToSquareRegular size="16" /></button
										></td
									>
									<td
										><button on:click={toggleModalDelete}>
											<TrashCanRegular size="16" /></button
										></td
									>
								</tr>
							{/each}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</div>
	<div class="flex justify-between ml-[20px] mt-[70px]">
		<div class=" flex justify-between w-[120px]">
			<div class="shadow border-solid py-[8px] px-[16px] font-bold">1</div>
			<div class="p-[6px] text-[20px] font-semibold">/</div>

			<div class="shadow border-solid py-[8px] px-[16px] font-bold">1</div>
		</div>
		<div class="mr-[24px] flex">
			<div class="class mr-[30px]">
				<button
					class="min-w-[80px] flex justify-between px-[10px] py-[5px] bg-blue-400 hover:bg-blue-300 text-[16px] font-medium rounded-[5px]"
				>
					<div class="pt-1 mr-[5px]">
						<AngleLeftSolid size={'18px'} />
					</div>
					Trước
				</button>
			</div>

			<div class="class">
				<button
					class="min-w-[80px] flex justify-between px-[10px] py-[5px] bg-blue-400 hover:bg-blue-300 text-[16px] font-medium rounded-[5px]"
				>
					Sau
					<div class="pl-[4px] pt-1">
						<AngleRightSolid size={'18px'} />
					</div>
				</button>
			</div>
		</div>
	</div>
</div>

<!-- Modal Insert -->
{#if showModalInsert}
	<div class="fixed inset-0 z-10 overflow-y-auto">
		<div class="fixed inset-0 w-full h-full bg-black opacity-40" on:click={toggleModalInsert} />
		<div
			class="flex items-center min-h-screen px-4 py-8 fixed top-1/2 left-1/2 z-20 transform -translate-x-1/2 -translate-y-1/2 w-1/3"
		>
			<div class="relative rounded-lg shadow dark:bg-gray-700">
				<div
					class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 overflow-hidden"
				>
					<h3 class="text-xl font-semibold text-gray-900 dark:text-white">Sửa kết quả học tập</h3>
					<button
						type="button"
						class="outline-none mr-0 hover:text-red-400"
						on:click={toggleModalInsert}><CircleXmarkSolid class="outline-none" /></button
					>
				</div>

				<!-- Modal body -->
				<div class="p-4 md:p-5">
					<form
						class="space-y-4"
						method="POST"
						action="#"
						on:submit|preventDefault={handelInsertResult}
					>
						<div>
							<div class="flex gap-3">
								<div class="w-1/2">
									<label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
										>Tên sinh viên
									</label>

									<select
										class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
										bind:value={student_id}
									>
										<option value="">Chọn tên sinh viên</option>

										{#each profilesTable as item, index (item.id)}
											<option value={item.student_id}>{item.full_name}</option>
										{/each}
									</select>
								</div>
								<div class="w-1/2">
									<label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
										>Lớp học</label
									>
									<select
										class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
										bind:value={class_id}
										id="class_id"
									>
										<option value="">Chọn lớp học</option>

										{#each classTable as item, index (item.id)}
											<option value={item.id}>{item.name}</option>
										{/each}
									</select>
								</div>
							</div>
							<div class="flex gap-3">
								<div class="w-1/2">
									<label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
										>Môn học</label
									>
									<select
										class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
										bind:value={subject_id}
									>
										<option value="">Chọn môn học</option>
										{#each subjectTable as item, index (item.id)}
											<option value={item.id}>{item.name}</option>
										{/each}
									</select>
								</div>

								<div class="w-1/2">
									<label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
										>Điểm quá trình</label
									>
									<input
										type="text"
										bind:value={progress}
										class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
										required
									/>
								</div>
							</div>
							<div class="flex gap-3">
								<div class="w-1/2">
									<label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
										>Điểm giữa kì</label
									>
									<input
										type="text"
										bind:value={mid_term}
										class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
										required
									/>
								</div>
								<div class="w-1/2">
									<label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
										>Điểm cuối kì</label
									>
									<input
										type="text"
										bind:value={last_term}
										class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
										required
									/>
								</div>
							</div>
						</div>
						<div>
							<label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
								>Tổng điểm</label
							>
							<input
								type="text"
								bind:value={total}
								class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
								required
							/>
						</div>

						<button
							type="submit"
							class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
							>Thêm</button
						>
					</form>
				</div>
			</div>
		</div>
	</div>
{/if}

<!-- Modal Deltals -->

{#if showModalDetails}
	<div class="fixed inset-0 z-10 overflow-y-auto">
		<div class="fixed inset-0 w-full h-full bg-black opacity-40" on:click={toggleModalDetails} />
		<div class=" fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/2 bg-black">
			<div class="relative rounded-lg shadow dark:bg-gray-700">
				<div
					class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 overflow-hidden"
				>
					<h3 class="text-xl font-semibold text-gray-900 dark:text-white">
						Chi tiết kết quả học tập
					</h3>
					<button
						type="button"
						class="outline-none mr-0 hover:text-red-400"
						on:click={toggleModalDetails}><CircleXmarkSolid class="outline-none" /></button
					>
				</div>
				<Table source={displayTable} interactive={true} on:selected={entrySelect} />
			</div>
		</div>
	</div>
{/if}

<!-- Modal Edit -->
{#if showModalEdit}
	<div class="fixed inset-0 z-10 overflow-y-auto">
		<div class="fixed inset-0 w-full h-full bg-black opacity-40" on:click={toggleModalEdit} />
		<div
			class="flex items-center min-h-screen px-4 py-8 fixed top-1/2 left-1/2 z-20 transform -translate-x-1/2 -translate-y-1/2 w-1/3"
		>
			<div class="relative rounded-lg shadow dark:bg-gray-700">
				<div
					class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 overflow-hidden"
				>
					<h3 class="text-xl font-semibold text-gray-900 dark:text-white">Sửa kết quả học tập</h3>
					<button
						type="button"
						class="outline-none mr-0 hover:text-red-400"
						on:click={toggleModalEdit}><CircleXmarkSolid class="outline-none" /></button
					>
				</div>

				<!-- Modal body -->
				<div class="p-4 md:p-5">
					<form class="space-y-4" action="#">
						<div>
							<div class="flex gap-3">
								<div class="w-1/2">
									<label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
										>Tên sinh viên
									</label>

									<select
										class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
									>
										<option>Chọn tên sinh viên</option>

										{#each profilesTable as item, index (item.id)}
											<option>{item.full_name}</option>
										{/each}
									</select>
								</div>
								<div class="w-1/2">
									<label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
										>Lớp học</label
									>
									<select
										id="category"
										class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
									>
										<option>Chọn lớp học</option>

										{#each classTable as item, index (item.id)}
											<option value="TV">{item.name}</option>
										{/each}
									</select>
								</div>
							</div>
							<div class="flex gap-3">
								<div class="w-1/2">
									<label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
										>Môn học</label
									>
									<select
										class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
									>
										<option>Chọn môn học</option>
										{#each subjectTable as item, index (item.id)}
											<option value="TV">{item.name}</option>
										{/each}
									</select>
								</div>

								<div class="w-1/2">
									<label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
										>Điểm quá trình</label
									>
									<input
										type="text"
										name="password"
										id="password"
										class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
										required
									/>
								</div>
							</div>
							<div class="flex gap-3">
								<div class="w-1/2">
									<label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
										>Điểm giữa kì</label
									>
									<input
										type="text"
										name="password"
										id="password"
										class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
										required
									/>
								</div>
								<div class="w-1/2">
									<label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
										>Điểm cuối kì</label
									>
									<input
										type="text"
										name="password"
										id="password"
										class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
										required
									/>
								</div>
							</div>
						</div>
						<div>
							<label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
								>Tổng điểm</label
							>
							<input
								type="text"
								name=""
								id=""
								class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
								required
							/>
						</div>

						<button
							type="submit"
							class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
							>Thêm</button
						>
					</form>
				</div>
			</div>
		</div>
	</div>
{/if}

{#if showModalDelete}
	<div class="fixed inset-0 z-10 overflow-y-auto">
		<div class="fixed inset-0 w-full h-full bg-black opacity-40" on:click={toggleModalDelete} />
		<div class="flex items-center min-h-screen px-4 py-8">
			<div
				class="relative w-full max-w-lg p-4 mx-auto dark:bg-gray-700 rounded-md shadow-lg h-[200px]"
			>
				<div class="mt-3 sm:flex">
					<div class=" flex">
						<h4 class="  text-lg font-medium text-white ml-[20px] mt-[10px]">
							Bạn có chắc chắn muốn xóa ?
						</h4>
					</div>

					<div class="mt-2 text-center sm:ml-4 sm:text-left absolute bottom-2 right-3">
						<div class="items-center mt-3 font-bold">
							<button
								class="w-[150px] mt-2 p-2.5 flex-1 text-white rounded-md outline-none border ring-offset-2 ring-indigo-600 focus:ring-2 mr-5"
								on:click={toggleModalDelete}
							>
								Hủy
							</button>
							<button
								class="w-[150px] mt-2 p-2.5 flex-1 text-white bg-red-600 rounded-md outline-none ring-offset-2 ring-red-600 focus:ring-2"
								on:click={toggleModalDelete}
							>
								Xóa
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
{/if}
