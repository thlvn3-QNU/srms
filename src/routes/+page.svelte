<script lang="ts">
	import { Auth } from '@supabase/auth-ui-svelte';
	import { ThemeSupa } from '@supabase/auth-ui-shared';

	export let data;

	const formHeader = ['Đăng nhập', 'Đăng ký'];
	let formType: number = 0;
</script>

<svelte:head>
	<title>SRMS - Login</title>
</svelte:head>

<div class="flex flex-col justify-center items-center align-middle h-full">
    <img src="$lib/logo.jpg" alt="QNU Logo" class="w-32">
    <br />
	<div class="w-9/12 lg:w-1/3">
		<h2 class="h2 text-center">{formHeader[formType]}</h2>
		{#if formType === 0}
			<Auth
				supabaseClient={data.supabase}
				view="sign_in"
				redirectTo={`${data.url}/auth/callback`}
				showLinks={false}
				appearance={{ theme: ThemeSupa, style: { input: 'color: #fff' } }}
			/>
			<a
				href={'#'}
				on:click={() => {
					formType = 1;
				}}>Chưa có tài khoản? Đăng ký tại đây</a
			>
		{:else if formType === 1}
			<Auth
				supabaseClient={data.supabase}
				view="sign_up"
				redirectTo={`${data.url}/auth/callback`}
				showLinks={false}
				appearance={{ theme: ThemeSupa, style: { input: 'color: #fff' } }}
			/>
			<a
				href={'#'}
				on:click={() => {
					formType = 0;
				}}>Quay lại đăng nhập</a
			>
		{/if}
	</div>
</div>
