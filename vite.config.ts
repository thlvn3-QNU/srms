import { purgeCss } from 'vite-plugin-tailwind-purgecss';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit(), purgeCss()],
	optimizeDeps: {
		include: [
			'@supabase/auth-helpers-sveltekit',
			'@supabase/auth-ui-shared',
			'@supabase/auth-ui-svelte',
			'@skeletonlabs/skeleton',
			'svelte-awesome-icons',
			'@floating-ui/dom'
		]
	}
});
