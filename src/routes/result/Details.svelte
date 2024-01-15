<!-- test comment -->
<script lang="ts">
	import { getModalStore } from '@skeletonlabs/skeleton';
	import type { SvelteComponent } from 'svelte';

	const modalStore = getModalStore();
	export let parent: SvelteComponent;

	let data = $modalStore[0].meta;

	console.log(data);
</script>

{#if $modalStore[0]}
	<div class="card-modal p-0">
		<table class="table !m-0">
			<thead>
				<tr>
					<th>Tên học phần:</th>
                    <!-- HACK -->
					<th class="flex items-center justify-between">
						<span>
							{data[0]}
						</span>
						<span>
							<button class="btn-icon variant-filled right-0" on:click={parent.onClose}>×</button>
						</span>
					</th>
				</tr>
				<tr>
					<th>Số tín chỉ:</th>
					<th>{data[1]}</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>Điểm quá trình:</td>
					<td>{data[2]}</td>
				</tr>
				<tr>
					<td>Điểm giữa kỳ:</td>
					<td>{data[3]}</td>
				</tr>
				<tr>
					<td>Điểm cuối kỳ:</td>
					<td>{data[4]}</td>
				</tr>
				<tr>
					<td>Tổng điểm: </td>
					<td>{data[5]}</td>
				</tr>
				<tr>
					<td>Tổng điểm 4: </td>
					<td>{data[6]}</td>
				</tr>
			</tbody>
			<tfoot>
				<tr>
					<th>Đánh giá:</th>
					<th class="text-xl">{data[7]}</th>
				</tr>
			</tfoot>
		</table>
	</div>
{/if}
