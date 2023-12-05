<script lang="ts">
	import { Table, tableMapperValues, type TableSource } from '@skeletonlabs/skeleton';
	import { PlusSolid } from 'svelte-awesome-icons';

	export let data;

	let { supabase, session, subject } = data;
	$: ({ supabase, session, subject } = data);

	let scoreTable: any[] = subject as any[];

	const displayTable: TableSource = {
		head: ['ID', 'Môn học', 'Tín chỉ'],
		body: tableMapperValues(scoreTable, ['id', 'name', 'credits']),
		meta: tableMapperValues(scoreTable, ['id'])
	};

	function entrySelect(meta: any) {}
</script>

<div class="[&>*]:py-4">
	<div class="header flex flex-row justify-between w-full">
		<span>
			<h2 class="h2">Môn học</h2>
		</span>
		<span class="flex gap-4">
			<button class="variant-filled"><PlusSolid size="16"/>Thêm</button>
			<input type="text" name="search-box" id="search-box" placeholder="Tìm kiếm..." disabled />
		</span>
	</div>
	<div class="content">
		<Table source={displayTable} interactive={true} on:selected={entrySelect} />
	</div>
</div>
