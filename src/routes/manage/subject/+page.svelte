<script lang="ts">
	import type { ModalSettings, TableSource } from '@skeletonlabs/skeleton';
	import { Table, tableMapperValues, getModalStore } from '@skeletonlabs/skeleton';
	import { PlusSolid } from 'svelte-awesome-icons';
	import DataModify from './DataModify.svelte';

	const modalStore = getModalStore();
	export let data;

	let { supabase, session, subject } = data;
	$: ({ supabase, session, subject } = data);

	let scoreTable: any[] = subject as any[];

	// TODO: Reload table
	const displayTable: TableSource = {
		head: ['ID', 'Môn học', 'Tín chỉ'],
		body: tableMapperValues(scoreTable, ['id', 'name', 'credits']),
		meta: tableMapperValues(scoreTable, ['id'])
	};
	
	const modal: ModalSettings = {
		type: 'component',
		component: { ref: DataModify },
		meta: { supabase: supabase, id: 0 }
	};

	async function entrySelect(meta: any) {
        const { data: subjectData } = await supabase.from('subject').select('name, credits').eq('id', meta.detail[0]).single();
		modal.meta.id = meta.detail[0];
		modal.meta.data = subjectData
		modalStore.trigger(modal);
	}

	function addNew() {
		modal.meta.id = -1;
		modal.meta.data = {};
		modalStore.trigger(modal);
	}
</script>

<div class="[&>*]:py-4">
	<div class="header flex flex-row justify-between w-full">
		<span>
			<h2 class="h2">Môn học</h2>
		</span>
		<span class="flex gap-4">
			<button class="variant-filled" on:click={addNew}><PlusSolid size="16" />Thêm</button>
			<input type="text" name="search-box" id="search-box" placeholder="Tìm kiếm..." disabled />
		</span>
	</div>
	<div class="content">
		<Table source={displayTable} interactive={true} on:selected={entrySelect} />
	</div>
</div>
