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
					Thêm kết quả học tập
				</div>

				<div class="  m-[20px] p-[10px] bg-gray-100 text-[16px] w-[800px]">
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
						<label>Mã sinh viên</label>
						<select name="studentCode" id="studentCode" class="edit-input">
							<option value="">Chọn mã sinh viên</option>
						</select>
					</div>
					{' '}
					<div class="mb-[20px] flex">
						<label>Tên sinh viên</label>
						<select name="name" id="name" class="edit-input">
							<option value="">Chọn tên sinh viên</option>
						</select>
					</div>
					{' '}
					<div class="mb-[20px] flex">
						<label>Môn học</label>
						<select name="subject" id="subject" class="edit-input">
							<option value="">Chọn môn học</option>
						</select>
					</div>
					{' '}
					<div class="mb-[20px] flex">
						<label class=""> Điểm quá trình </label>
						<input type="text" class="edit-input" />
					</div>
					<div class="mb-[20px] flex">
						<label class=""> Giữa kì </label>
						<input type="text" class="edit-input" />
					</div>
					<div class="mb-[20px] flex">
						<label class=""> Cuối kì </label>
						<input type="text" class="edit-input" />
					</div>
					<div class="mb-[20px] flex">
						<label class=""> Điểm 10 </label>
						<input type="text" class="edit-input" />
					</div>
					<div class="mb-[20px] flex">
						<label class=""> Điểm 4 </label>
						<input type="text" class="edit-input" />
					</div>
					<div class="mb-[20px] flex">
						<label class=""> Điểm chữ </label>
						<input type="text" class="edit-input" />
					</div>
					<div class="mb-[20px] flex">
						<label class=""> Kết quả </label>
						<input type="text" class="edit-input" />
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
