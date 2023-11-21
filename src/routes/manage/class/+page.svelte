<script lang="ts">
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
		console.log(meta);
	}
</script>

<div class="[&>*]:py-4">
	<div class="header">
		<button class="variant-filled">Thêm lớp học</button>
	</div>
	<div class="content">
		<Table source={tableSimple} interactive={true} on:selected={entry} />
	</div>
	<div class="footer">
		<span>Hiển thị: </span>
		<Paginator />
	</div>
</div>