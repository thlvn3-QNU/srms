<script>
	import {
		ArrowDownAZSolid,
		FileLinesRegular,
		PenToSquareRegular,
		TrashCanRegular,
		AngleLeftSolid,
		AngleRightSolid
	} from 'svelte-awesome-icons';

	let MenuDelete = false;
	let showMenuDelete = () => {
		MenuDelete = !MenuDelete;
	};
</script>

<main>
	<div class="">
		<div class="flex">
			<div class="" />

			<div class="flex-1">
				<div class="  m-[20px] py-[10px] pl-[10px] text-[18px] font-medium">
					Xem thông tin lớp học
				</div>

				<div class=" flex justify-between ml-[20px] mt-[70px]">
					<div class="mr-[24px]">
						<button
							class="px-[10px] py-[5px] bg-blue-400 hover:bg-blue-300 text-[16px] font-medium rounded-[5px] mr-[20px]"
						>
							Tìm kiếm
						</button>

						<input type="text" class="border shadow py-1 px-2 outline-none" />
					</div>
				</div>

				<div class=" m-[20px] flex">
					<table>
						<thead class="">
							<tr class="">
								<th class="w-[80px] py-1 px-2">
									<div class="float-left">STT</div>
									<div class="mt-1 float-right">
										<ArrowDownAZSolid size={'18px'} />
									</div>
								</th>
								<th class="w-[200px] py-1 px-2">
									<div class="float-left">Mã sinh viên</div>
									<div class="mt-1 float-right">
										<ArrowDownAZSolid size={'18px'} />
									</div>
								</th>
								<th class="w-[240px] py-1 px-2">
									<div class="float-left">Tên sinh viên</div>
									<div class="mt-1 float-right">
										<ArrowDownAZSolid size={'18px'} />
									</div>
								</th>
								<th class="w-[200px] py-1 px-2">
									<div class="float-left">Ngày sinh</div>
									<div class="mt-1 float-right">
										<ArrowDownAZSolid size={'18px'} />
									</div>
								</th>
								<th class="w-[220px] py-1 px-2">
									<div class="float-left">Địa chỉ</div>
									<div class="mt-1 float-right">
										<ArrowDownAZSolid size={'18px'} />
									</div>
								</th>
								<th class="w-[220px] py-1 px-2">
									<div class="float-left">Số điện thoại</div>
									<div class="mt-1 float-right">
										<ArrowDownAZSolid size={'18px'} />
									</div>
								</th>

								<th class="w-[100px] py-1 px-2">
									<div class=" ">Sửa</div>
								</th>
								<th class="w-[100px] py-1 px-2">
									<div class="">Xóa</div>
								</th>
							</tr>
						</thead>
						<tbody class="">
							<tr class="">
								<td>1</td>
								<td>445102484</td>
								<td>Nguyễn Văn A</td>
								<td>03-01-2003</td>
								<td>An Nhơn - Bình Định</td>
								<td>0304585834</td>

								<td>
									<div class="p-[10px] flex justify-center items-center">
										<PenToSquareRegular size={'18px'} />
									</div>
								</td>
								<td>
									<div class="p-[10px] flex justify-center items-center">
										<button on:click={showMenuDelete} class="hover:text-red-600">
											<TrashCanRegular size={'18px'} />
										</button>
									</div>
								</td>
							</tr>
						</tbody>
					</table>
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
								<div class="pt-1 mr-[5px]"><AngleLeftSolid size={'18px'} /></div>
								Trước
							</button>
						</div>

						<div class="class">
							<button
								class="min-w-[80px] flex justify-between px-[10px] py-[5px] bg-blue-400 hover:bg-blue-300 text-[16px] font-medium rounded-[5px]"
							>
								Sau
								<div class="pt-1 mr-[5px]"><AngleRightSolid size={'18px'} /></div>
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	{#if MenuDelete}
		<div class="fixed inset-0 z-10 overflow-y-auto">
			<div
				class="fixed inset-0 w-full h-full bg-black opacity-40"
				on:click={() => (MenuDelete = !MenuDelete)}
			/>
			<div class="flex items-center min-h-screen px-4 py-8">
				<div class="relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg h-[200px]">
					<div class="mt-3 sm:flex">
						<div class=" flex">
							<h4 class="  text-lg font-medium text-gray-800 ml-[20px] mt-[10px]">
								Bạn có chắc chắn muốn xóa ?
							</h4>
						</div>

						<div class="mt-2 text-center sm:ml-4 sm:text-left absolute bottom-2 right-3">
							<div class="items-center mt-3 font-bold">
								<button
									class="w-[150px] mt-2 p-2.5 flex-1 text-gray-800 rounded-md outline-none border ring-offset-2 ring-indigo-600 focus:ring-2 mr-5"
									on:click={showMenuDelete}
								>
									Hủy
								</button>
								<button
									class="w-[150px] mt-2 p-2.5 flex-1 text-white bg-red-600 rounded-md outline-none ring-offset-2 ring-red-600 focus:ring-2"
									on:click={showMenuDelete}
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
</main>
