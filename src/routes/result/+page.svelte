<script lang="ts">
	import { Table, tableMapperValues, type TableSource } from '@skeletonlabs/skeleton';

	export let data;

	let { supabase, session, score } = data;
	$: ({ supabase, session, score } = data);

	let scoreTable: any[] = score as any[];

	const displayTable: TableSource = {
		head: ['Mã môn học', 'Tên môn học', 'Số tín chỉ', 'Điểm quá trình', 'Điểm giữa kì'],
		body: tableMapperValues(scoreTable, ['student_id', 'full_name', 'class_name', 'name', 'total']),
		meta: tableMapperValues(scoreTable, ['id'])
	};

	function entrySelect(meta: any) {}
</script>

<div class="[&>*]:py-4">
	<div class="header flex flex-row justify-between w-full">
		<span>
			<h2 class="h2">Điểm thi</h2>
		</span>
		<span>
			<input type="text" name="search-box" id="search-box" placeholder="Tìm kiếm..." disabled />
		</span>
	</div>
	<div class="content">
		<Table source={displayTable} interactive={true} on:selected={entrySelect} />
	</div>
	<div class="content">
		<Table source={displayTable} interactive={true} on:selected={entrySelect} />
	</div>
</div>

