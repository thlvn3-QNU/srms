<script lang="ts">
	import { page } from '$app/stores';
	import { links } from '$lib/Links.json';

	export let profile: any;

	$: path = $page.url.pathname;
	$: listboxItemActive = (href: string) =>
		$page.url.pathname === href ? 'bg-primary-active-token' : '';
</script>

<nav class="list-nav [&>*>*>*]:!no-underline">
	<ul>
		{#each links as link, i}
			{#if i !== 0} <hr /> {/if}
			{#each link as { label, href, permission }}
                {#if permission === -1 || permission === (profile?.permission > 0 ? 1 : 0)}
                    <li>
                        <a {href} class={listboxItemActive(href)} data-sveltekit-preload-data="hover">
                            <span class="flex-auto">{@html label}</span>
                        </a>
                    </li>
                {/if}
			{/each}
		{/each}
	</ul>
</nav>
