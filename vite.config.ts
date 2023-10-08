import { sveltekit } from '@sveltejs/kit/vite';
import { SvelteKitPWA } from '@vite-pwa/sveltekit';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [
		sveltekit(),
		SvelteKitPWA({
			registerType: 'autoUpdate',
			manifest: {
				name: 'Svelte Menos',
				short_name: 'Menos',
				description: 'The missing link between memos and notes',
				display: 'standalone',
				background_color: '#ffffff',
				icons: [
					{
						src: './favicon-192x192.png',
						sizes: '192x192',
						type: 'image/png',
						purpose: 'any maskable'
					},
					{
						src: './favicon-512x512.png',
						sizes: '512x512',
						type: 'image/png',
						purpose: 'any maskable'
					}
				],
				share_target: {
					action: '/new',
					method: 'GET',
					params: {
						title: 'title',
						text: 'text',
						url: 'link'
					}
				}
			},
			devOptions: {
				enabled: true
			}
		})
	]
});
