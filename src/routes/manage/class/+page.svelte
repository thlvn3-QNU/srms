<script lang="ts">
	import { goto } from '$app/navigation';
	import { Table, tableMapperValues, type TableSource } from '@skeletonlabs/skeleton';
	import { PlusSolid } from 'svelte-awesome-icons';

	export let data;

	let { supabase, session, classes } = data;
	$: ({ supabase, session, classes } = data);

	let classTable: any[] = classes as any[];

	const tableSimple: TableSource = {
		head: ['Môn học', 'Giáo viên'],
		body: tableMapperValues(classTable, ['name', 'full_name']),
		meta: tableMapperValues(classTable, ['id'])
	};

	function entry(meta: any) {
		goto(`class/details?id=${meta.detail[0]}`);
	}
</script>

<div class="[&>*]:py-4">
	<div class="header flex flex-row justify-between w-full">
		<span>
			<h2 class="h2">Danh sách lớp học</h2>
		</span>
		<span class="flex gap-4">
			<button class="variant-filled"><PlusSolid size="16"/>Thêm</button>
			<input type="text" name="search-box" id="search-box" placeholder="Tìm kiếm..." disabled/>
		</span>
	</div>
	<div class="content">
		<Table source={tableSimple} interactive={true} on:selected={entry} />
	</div>
</div>