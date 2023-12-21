<script lang="ts">
	import { CircleXmarkSolid } from 'svelte-awesome-icons';
	import { Table, tableMapperValues, type TableSource } from '@skeletonlabs/skeleton';

	export let showModalDetails: boolean;
	export let toggle: any;

	export let data: any;

	let { supabase, session, score } = data;
	$: ({ supabase, session, score } = data);

	let scoreTable: any[] = score as any[];

	const displayTable: TableSource = {
		head: ['Mã môn học', 'Số tín chỉ', 'Điểm chữ'],
		body: tableMapperValues(scoreTable, ['id', 'credits', 'total', '', '', '']),
		meta: tableMapperValues(scoreTable, ['id'])
	};
	function entrySelect(meta: any) {
		// goto(`result/details?id=${meta.detail[0]}`);
	}
</script>

{#if showModalDetails}
	<div class="">
		<div class="relative rounded-lg shadow dark:bg-gray-700">
			<div
				class="flex items-center justify-between p-4 overflow-hidden"
			>
				<h3 class="h3">Kết quả học tập</h3>
				<button type="button" on:click={toggle}><CircleXmarkSolid /></button>
			</div>

			<!-- Modal body -->
			<div class="p-4 md:p-5">
				<form class="space-y-4" action="#">
					<div class="content">
						<div class="content">
							<Table source={displayTable} interactive={true} on:selected={entrySelect} />
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>
{/if}
