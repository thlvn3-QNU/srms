<script lang="ts">
	import { CircleXmarkSolid } from 'svelte-awesome-icons';

	export let showModalDetails: boolean;
	export let toggle: any;

	import { Table, tableMapperValues, type TableSource } from '@skeletonlabs/skeleton';

	let data;

	let { supabase, session, score } = data;
	$: ({ supabase, session, score } = data);
	``;

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
		<div class=" fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/3 bg-black">
			<div class="relative rounded-lg shadow dark:bg-gray-700">
				<div
					class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 overflow-hidden"
				>
					<h3 class="text-xl font-semibold text-gray-900 dark:text-white">Kết quả học tập</h3>
					<button type="button" class="outline-none mr-0 hover:text-red-400" on:click={toggle}
						><CircleXmarkSolid class="outline-none" /></button
					>
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
{/if}
