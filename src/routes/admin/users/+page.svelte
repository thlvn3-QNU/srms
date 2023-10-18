<script lang="ts">
	import UserDetails from './UserDetails.svelte';
	import { Table, tableMapperValues, getModalStore } from '@skeletonlabs/skeleton';
	import type { ModalComponent, ModalSettings, TableSource } from '@skeletonlabs/skeleton';

	export let data;

	let { session, supabase, profiles } = data;
	$: ({ session, supabase, profiles } = data);

	const modalStore = getModalStore();

	let tableProfiles: TableSource;

	if (profiles) {
		tableProfiles = {
			head: ['MSSV', 'Họ tên', 'Ngày sinh', 'Số điện thoại'],
			body: tableMapperValues(profiles, [
				'student_id',
				'full_name',
				'date_of_birth',
				'phone_number'
			]),
			meta: tableMapperValues(profiles, ['id'])
		};
	}

    // TODO: format this
	const modalComponent: ModalComponent = { ref: UserDetails };

	const modal: ModalSettings = {
		type: 'component',
		component: modalComponent
	};

	function selectedEntry(meta: any) {
		const userid = meta.id;
		console.log(userid);
        modalStore.trigger(modal);
	}
</script>

<h2 class="h2">Quản lý người dùng</h2>
<br />
<!-- TODO: use paginator -->
<!-- TODO: searchable entries -->
<Table source={tableProfiles} interactive={true} on:selected={selectedEntry} />
<br />
<p>Bấm chọn người dùng để xem và chỉnh sửa thông tin.</p>
