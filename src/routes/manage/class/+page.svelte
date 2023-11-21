<script lang="ts">
	import { goto } from '$app/navigation';
	import { Paginator, Table, tableMapperValues, type TableSource } from '@skeletonlabs/skeleton';

	export let data;

	let { supabase, session, classes } = data;
	$: ({ supabase, session, classes } = data);

	let classTable: any[] = classes as any[];

	const tableSimple: TableSource = {
		head: ['Khoa/Môn học', 'Giáo viên', 'Lớp'],
		body: tableMapperValues(classTable, ['subject_id', 'teacher_id', 'class_name']),
		meta: tableMapperValues(classTable, ['id', 'subject_id', 'teacher_id', 'class_name'])
	};

	function entry(meta: any) {
		goto(`class/details?id=${meta.detail[0]}`);
	}
</script>

<div class="[&>*]:py-4">
	<div class="header flex flex-row justify-between w-full">
		<span>
			<button class="variant-filled">Thêm lớp học</button>
		</span>
		<span>
			<input type="text" name="search-box" id="search-box" placeholder="Tìm kiếm..." disabled/>
		</span>
	</div>
	<div class="content">
		<Table source={tableSimple} interactive={true} on:selected={entry} />
	</div>
	<div class="footer">
		<span>Hiển thị: </span>
		<Paginator />
	</div>
</div>