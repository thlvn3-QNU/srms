<script lang="ts">
	import {
		Paginator,
		Table,
		tableMapperValues,
		type TableSource
	} from '@skeletonlabs/skeleton';

	export let data;

	let { supabase, session, students } = data;
	$: ({ supabase, session, students } = data);

	let studentTable: any[] = students as any[];

	const displayTable: TableSource = {
		head: ['MSSV', 'Họ tên', 'Khoá'],
		body: tableMapperValues(studentTable, ['student_id', 'full_name', 'school_year']),
		meta: tableMapperValues(studentTable, ['id', 'student_id', 'full_name'])
	};

	function entrySelect(meta: any) {
		console.log(meta);
	}
</script>

<div class="[&>*]:py-4">
	<div class="header flex flex-row justify-between w-full">
		<span>
			<button class="variant-filled">Thêm lớp học</button>
		</span>
		<span>
			<input type="text" name="search-box" id="search-box" placeholder="Tìm kiếm..." disabled />
		</span>
	</div>
	<div class="content">
		<Table source={displayTable} interactive={true} on:selected={entrySelect} />
	</div>
</div>
