<script lang="ts">
	import { type TableSource, Table, tableMapperValues } from '@skeletonlabs/skeleton';

	export let data;

	let { session, supabase, profiles } = data;
	$: ({ session, supabase, profiles } = data);

	let tableProfiles: TableSource;

	if (profiles) {
		console.log(profiles);
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

	function selectedEntry(meta: any) {
        const userid = meta.detail[0];

        console.log(userid);
	}
</script>

<h2 class="h2">Quản lý người dùng</h2>
<br />
<!-- TODO: use paginator -->
<!-- TODO: searchable entries -->
<Table source={tableProfiles} interactive={true} on:selected={selectedEntry} />
