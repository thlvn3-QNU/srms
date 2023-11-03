<script>
	import { AngleDownSolid, AngleUpSolid } from 'svelte-awesome-icons';
	let showClass = false;
	let showSubject = false;
	let showStudent = false;
	let showLearningResult = false;
</script>

<main>
	<div class="ml-5 my-5 w-[280px] h-[500px] p-4 shadow font-medium bg-gray-100 text-black text-lg">
		<div class="pb-[20px]">Thông tin cá nhân</div>

		<div class="flex ml-auto">
			<div class="pb-1">Lớp học</div>
			<span class="ml-auto pt-1">
				{#if showClass}
					<AngleUpSolid size={'20px'} class="outline-0" on:click={() => (showClass = !showClass)} />
				{:else}
					<AngleDownSolid size={'20px'} on:click={() => (showClass = !showClass)} />
				{/if}
			</span>
		</div>

		{#if showClass}
			<ul class="pl-[30px]">
				<li>
					<div class="pb-1 flex">Quản lí lớp học</div>
				</li>
			</ul>
		{/if}
		<div class="flex ml-auto">
			<div class="pb-1">Môn học</div>
			<span class="ml-auto pt-1">
				{#if showSubject}
					<AngleUpSolid
						size={'20px'}
						class="outline-none"
						on:click={() => (showSubject = !showSubject)}
					/>
				{:else}
					<AngleDownSolid size={'20px'} on:click={() => (showSubject = !showSubject)} />
				{/if}
			</span>
		</div>
		{#if showSubject}
			<ul class="pl-[30px]">
				<li>
					<div class="pb-1 flex">Quản lí môn học</div>
				</li>
			</ul>
		{/if}

		<div class="flex ml-auto">
			<div class="pb-1">Sinh viên</div>
			<span class="ml-auto pt-1">
				{#if showStudent}
					<AngleUpSolid
						size={'20px'}
						class="outline-none"
						on:click={() => (showStudent = !showStudent)}
					/>
				{:else}
					<AngleDownSolid size={'20px'} on:click={() => (showStudent = !showStudent)} />
				{/if}
			</span>
		</div>
		{#if showStudent}
			<ul class="pl-[30px]">
				<li>
					<div class="pb-1 flex">Quản lí sinh viên</div>
				</li>
			</ul>
		{/if}
		<div class="flex ml-auto">
			<div class="pb-1">Kết quả học tập</div>
			<span class="ml-auto pt-1">
				{#if showLearningResult}
					<AngleUpSolid
						size={'20px'}
						class="outline-none"
						on:click={() => (showLearningResult = !showLearningResult)}
					/>
				{:else}
					<AngleDownSolid
						size={'20px'}
						on:click={() => (showLearningResult = !showLearningResult)}
					/>
				{/if}
			</span>
		</div>
		{#if showLearningResult}
			<ul class="pl-[30px]">
				<li>
					<div class="pb-1 flex">Thêm kết quả học tập</div>
				</li>
				<li>
					<div class="pb-1 flex">Quản lí kết quả học tập</div>
				</li>
			</ul>
		{/if}
		<div class="pb-1 flex">Đổi mật khẩu</div>
	</div>
</main>
