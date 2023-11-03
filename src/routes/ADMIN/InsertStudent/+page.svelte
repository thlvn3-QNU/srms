<script>
	import Topbar from '../Topbar/+page.svelte';
	import Sidebar from '../Sidebar/+page.svelte';
</script>

<main>
	<div class="">
		<Topbar />
		<div class="flex">
			<div class="">
				<Sidebar />
			</div>

			<div class="flex-1">
				<div class=" bg-gray-100 m-[20px] py-[10px] pl-[10px] text-[18px] font-medium">
					Thêm sinh viên
				</div>
				<div class="  m-[20px] p-[10px] bg-gray-100 text-[16px] w-[800px]">
					<div class="mb-[20px] flex">
						<label class=""> Họ và tên </label>
						<input type="text" class="edit-input" />
					</div>
					<div class="mb-[20px] flex">
						<label class=""> Mã sinh viên </label>
						<input type="text" class="edit-input" />
					</div>
					<div class="mb-[20px] flex">
						<label>Khoa</label>
						<select name="science" id="science" class="edit-input">
							<option value="">Chọn tên khoa</option>
						</select>
					</div>
					{' '}
					<div class="mb-[20px] flex">
						<label>Ngành</label>
						<select name="career" id="career" class="edit-input">
							<option value="">Chọn tên ngành</option>
						</select>
					</div>
					{' '}
					<div class="mb-[20px] flex">
						<label>Lớp</label>
						<select name="class" id="class" class="edit-input">
							<option value="">Chọn tên lớp</option>
						</select>
					</div>
					{' '}
					<div class="mb-[20px] flex">
						<label class=""> Email </label>
						<input type="text" class="edit-input" />
					</div>
					<div class="mb-[20px] flex">
						<label class=""> Địa chỉ </label>
						<input type="text" class="edit-input" />
					</div>
					<div class="mb-[20px] flex">
						<label class=""> Số điện thoại </label>
						<input type="text" class="edit-input" />
					</div>
					<div class="mb-[20px] flex">
						<label>Giới tính</label>
						<div class="mr-[20px]">
							<input type="checkbox" class=" h-[18px] w-[18px]" />{' '}
							<span class="">Nam</span>
						</div>
						<div class="mr-[20px]">
							<input type="checkbox" class="h-[18px] w-[18px]" />{' '}
							<span>Nữ</span>
						</div>
						{' '}
						<div class="">
							<input type="checkbox" class="h-[18px] w-[18px]" />{' '}
							<span>Khác</span>
						</div>
					</div>
					<div class="flex">
						<label>Ngày sinh</label>
						<input type="datetime-local" id="birthdaytime" name="birthdaytime" class="edit-input" />
					</div>
				</div>

				<div class="text-center ml-[280px] my-[30px]">
					<button
						class="px-[10px] py-[5px] bg-blue-400 hover:bg-blue-300 text-[16px] font-medium rounded-[5px]"
					>
						Thêm sinh viên
					</button>
				</div>
			</div>
		</div>
	</div>
</main>
