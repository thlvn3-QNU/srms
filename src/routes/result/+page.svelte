<script lang="ts">
	import {
		getModalStore,
		Table,
		tableMapperValues,
		type ModalSettings,
		type TableSource
	} from '@skeletonlabs/skeleton';
	import DetailsModal from './Details.svelte';

	const modalStore = getModalStore();

	export let data;

	let { supabase, session, score } = data;
	$: ({ supabase, session, score } = data);

	let scoreTable: any[] = score as any[];

	const details: ModalSettings = {
		type: 'component',
		component: { ref: DetailsModal },
		meta: {}
	};

	const displayTable: TableSource = {
		head: ['Tên học phần', 'Tín chỉ', 'Điểm 10', 'Điểm 4', 'Đánh giá'],
		body: tableMapperValues(scoreTable, ['name', 'credits', 'total', 'total_four', 'total_rating']),
		// HACKS
		meta: tableMapperValues(scoreTable, [
			'name',
			'credits',
			'progress',
			'mid_term',
			'last_term',
			'total',
			'total_four',
			'total_rating'
		])
	};

	function entrySelect(meta: any) {
		details.meta = meta.detail;
		modalStore.trigger(details);
	}
</script>

<div class="[&>*]:py-4">
	{#if score && score?.length <= 0}
		<p class="text-center">Bạn chưa có điểm trên hệ thống.</p>
	{:else}
		<p class="text-center">Chọn điểm để xem chi tiết</p>
		<div class="content">
			<Table source={displayTable} interactive={true} on:selected={entrySelect} />
		</div>
	{/if}
</div>
