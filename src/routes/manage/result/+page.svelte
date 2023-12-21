<script lang="ts">
	import {
		PlusSolid,
		PenToSquareRegular,
		FileLinesRegular,
		TrashCanRegular,
		CircleXmarkSolid
	} from 'svelte-awesome-icons';
	import { onMount } from 'svelte';
	import { getModalStore, type ModalSettings } from '@skeletonlabs/skeleton';

	let modalStore = getModalStore();

	export let data;

	let { supabase, session, score, classData, profiles, subject } = data;
	$: ({ supabase, session, score, classData, profiles, subject } = data);

	let scoreTable: any[] = score as any[];

	let classTable: any[] = classData as any[];
	let profilesTable: any[] = profiles as any[];
	let subjectTable: any[] = subject as any[];

	let showModalInsert = false;
	let showModalDetails = false;
	let showModalEdit = false;
	let showModalDelete = false;

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

	onMount(async () => {
		await getAllScores();
	});

	let getAllScores = async () => {
		try {
			let { data, error } = await supabase.from('score').select();
		} catch (err) {
			console.log(err);
		}
	};
	let handelInsertResult = async () => {
		const { data, error } = await supabase.from('score').insert([
			{
				student_id: student_id,
				class_id: class_id,
				subject_id: subject_id,
				progress: progress,
				mid_term: mid_term,
				last_term: last_term,
				total: total
			}
		]);
		if (error) {
			alert('Thêm kết quả học tập thất bại!');
			showModalInsert = !showModalInsert;
		} else {
			alert('Thêm kết quả học tập thành công!');
			getAllScores();
			showModalInsert = !showModalInsert;
		}
	};

	let selectScoreId = '';
	let setSelectScoreId = (id: any) => {
		selectScoreId = id;
		modalStore.trigger(modal);
	};
	let handleDeleteResult = async (id: any) => {
		const { error } = await supabase.from('score').delete().eq('id', id);

		if (error) {
			alert('Xóa kêt quả học tập thất bại ! ');
		} else {
			alert('Xóa kết quả học tập thành công');
		}
	};

	let selectScoreDetails = '';
	let handleFetchDetails = (id: any) => {
		selectScoreDetails = id;
		toggleModalDetails();
	};

	let selectEditScoreId = '';
	let handleEditScore = (id: any) => {
		selectEditScoreId = id;
		console.log('a', selectEditScoreId);
		toggleModalEdit();
	};

	let handleEditResult = async () => {
		const { data, error } = await supabase
			.from('score')
			.update({
				student_id: student_id,
				class_id: class_id,
				subject_id: subject_id,
				progress: progress,
				mid_term: mid_term,
				last_term: last_term,
				total: total
			})
			.eq('id', selectEditScoreId);
		if (error) {
			alert('Cập nhật kết quả học tập thất bại!');
			showModalEdit = !showModalEdit;
		} else {
			alert('Cập nhật kết quả học tập thành công!');
			getAllScores();
			showModalEdit = !showModalEdit;
		}
	};

	const modal: ModalSettings = {
		type: 'confirm',
		title: 'Bạn có chắc chắn muốn xóa?',
		response: (r: boolean) => {
			if (r === true) {
				handleDeleteResult(selectScoreId);
			}
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
				><PlusSolid size="16" />Thêm</button
			>
			<input type="text" name="search-box" id="search-box" placeholder="Tìm kiếm..." />
		</span>
	</div>
	<div>
		<div>
			<div>
				<div>
					<table class="table">
						<thead>
							<tr>
								<th>MSSV</th>
								<th>Họ tên</th>
								<th>Lớp</th>
								<th>Tổng điểm</th>
								<th>Chi tiết</th>
								<th>Sửa</th>
								<th>Xóa</th>
							</tr>
						</thead>
						<tbody>
							{#each scoreTable as item}
								<tr>
									<td>{item.student_id}</td>
									<td>{item.full_name}</td>
									<td>{item.name} </td>
									<td>{item.total} </td>
									<td
										><button on:click={() => handleFetchDetails(item.id)}>
											<FileLinesRegular size="16" /></button
										></td
									>
									<td
										><button on:click={() => handleEditScore(item.id)}>
											<PenToSquareRegular size="16" /></button
										></td
									>
									<td
										><button on:click={() => setSelectScoreId(item.id)}>
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
</div>

<!-- Modal Insert -->
{#if showModalInsert}
	<div>
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
								<div class="">
									<label for="student_name">Tên sinh viên </label>
									<select bind:value={student_id} name="student_name">
										<option value="">Chọn tên sinh viên</option>
										{#each profilesTable as item}
											<option value={item.id}>{item.full_name}</option>
										{/each}
									</select>
								</div>
								<div class="w-1/2">
									<label for="class_name">Lớp học</label>
									<select bind:value={class_id} id="class_id" name="class_name">
										<option value="">Chọn lớp học</option>
										{#each classTable as item}
											<option value={item.id}>{item.name}</option>
										{/each}
									</select>
								</div>
							</div>
							<div class="flex gap-3">
								<div class="w-1/2">
									<label for="subject_name">Môn học</label>
									<select bind:value={subject_id} name="subject_name">
										<option value="">Chọn môn học</option>
										{#each subjectTable as item}
											<option value={item.id}>{item.name}</option>
										{/each}
									</select>
								</div>

								<div class="w-1/2">
									<label for="score-1">Điểm quá trình</label>
									<input name="score-1" type="text" bind:value={progress} required />
								</div>
							</div>
							<div class="flex gap-3">
								<div class="w-1/2">
									<label for="score-2">Điểm giữa kì</label>
									<input name="score-2" type="text" bind:value={mid_term} required />
								</div>
								<div class="w-1/2">
									<label for="score-3">Điểm cuối kì</label>
									<input name="score-3" type="text" bind:value={last_term} required />
								</div>
							</div>
						</div>
						<div>
							<label for="total-score">Tổng điểm</label>
							<input name="total-score" type="text" bind:value={total} required />
						</div>

						<button type="submit" class="variant-filled-primary w-full">Thêm</button>
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
				<div class="flex flex-col">
					<div class="overflow-x-auto rounded-md">
						<div class="inline-block min-w-full">
							<div class="overflow-hidden">
								<table class="min-w-full">
									<thead class="">
										<tr class="text-white font-bold bg-[#374151]">
											<th>Mã sinh viên</th>
											<th>Điểm quá trình</th>
											<th>Điểm giữa kì </th>
											<th>Điểm cuối kì</th>
											<th>Điểm tổng</th>
										</tr>
									</thead>
									<tbody>
										{#each scoreTable as item, index (item.id)}
											{#if item.id === selectScoreDetails}
												<tr
													class=" text-white transition duration-300 ease-in-out hover:bg-[#293648] bg-[#1f2937]"
												>
													<td class="px-6 py-4 whitespace-nowrap text-sm font-medium"
														>{item.student_id}
													</td>
													<td class="px-6 py-4 whitespace-nowrap text-sm font-medium"
														>{item.progress}
													</td>

													<td class="px-6 py-4 whitespace-nowrap text-sm font-medium"
														>{item.mid_term}
													</td>
													<td class="px-6 py-4 whitespace-nowrap text-sm font-medium"
														>{item.last_term}
													</td>
													<td class="px-6 py-4 whitespace-nowrap text-sm font-medium"
														>{item.total}
													</td>
												</tr>
											{/if}
										{/each}
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
{/if}
