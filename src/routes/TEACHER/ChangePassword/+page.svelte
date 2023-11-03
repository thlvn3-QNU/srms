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
					Đổi mật khẩu
				</div>
				<div class="  m-[20px] p-[10px] bg-gray-100 text-[16px] w-[810px]">
					<div class="mb-[20px] flex">
						<label class=""> Mật khẩu cũ </label>
						<input type="text" class="edit-input" />
					</div>
					<div class="mb-[20px] flex">
						<label class=""> Mật khẩu mới </label>
						<input type="text" class="edit-input" />
					</div>
					<div class="mb-[20px] flex">
						<label>Nhập lại mật khẩu</label>
						<input type="text" class="edit-input" />
					</div>
				</div>

				<div class="text-center ml-[316px] my-[30px]">
					<button
						class="px-[20px] py-[5px] bg-blue-400 hover:bg-blue-300 text-[16px] font-medium rounded-[5px]"
					>
						Cập nhật
					</button>
				</div>
			</div>
		</div>
	</div>
</main>
