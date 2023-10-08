import { sveltekit } from '@sveltejs/kit/vite';
import { SvelteKitPWA } from '@vite-pwa/sveltekit';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [
		sveltekit(),
		SvelteKitPWA({
			manifest: {
				share_target: {
					action: '/new',
					method: 'GET',
					params: {
						title: 'title',
						text: 'text',
						url: 'link'
					}
				}
			}
		})
	]
});
