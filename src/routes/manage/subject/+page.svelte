<script lang="ts">
	import type { ModalSettings, TableSource, ToastSettings } from '@skeletonlabs/skeleton';
	import { Table, tableMapperValues, getModalStore, getToastStore } from '@skeletonlabs/skeleton';
	import { PlusSolid } from 'svelte-awesome-icons';
	import DataModify from './DataModify.svelte';
	import type { PageData } from './$types';

	const modalStore = getModalStore();
	const toastStore = getToastStore();

	export let data: PageData;

	let { supabase, session, subject } = data;
	$: ({ supabase, session, subject } = data);

	let scoreTable: any[] = subject as any[];
	$: scoreTable = subject as any[];

	let displayTable: TableSource;
	$: displayTable = {
		head: ['ID', 'Môn học', 'Tín chỉ'],
		body: tableMapperValues(scoreTable, ['id', 'name', 'credits']),
		meta: tableMapperValues(scoreTable, ['id'])
	};

	const modal: ModalSettings = {
		type: 'component',
		component: { ref: DataModify },
		meta: { supabase, id: 0 }
	};

	let toast;
	let interactive = true;
	const t: ToastSettings = {
		message: 'Đang tải dữ liệu...',
		background: 'variant-filled-tertiary',
		hideDismiss: true,
		timeout: 99999
	};

	async function entrySelect(meta: any) {
		toast = toastStore.trigger(t);
		interactive = false;
		const { data: subjectData } = await supabase
			.from('subject')
			.select('name, credits')
			.eq('id', meta.detail[0])
			.single();
		modal.meta.id = meta.detail[0];
		modal.meta.data = subjectData;
		modalStore.trigger(modal);
		toastStore.close(toast);
		interactive = true;
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
			<p>Chọn một mục để chỉnh sửa.</p>
		</span>
		<span class="flex gap-4">
			<button class="variant-filled" on:click={addNew}><PlusSolid size="16" />Thêm</button>
		</span>
	</div>
	<div class="content">
		<Table source={displayTable} {interactive} on:selected={entrySelect} />
	</div>
</div>
