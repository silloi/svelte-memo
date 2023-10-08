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
				start_url: './app.html',
				background_color: '#ffffff',
				icons: [
					{
						src: '/icon-192x192.png',
						sizes: '192x192',
						type: 'image/png',
						purpose: 'any maskable'
					},
					{
						src: '/icon-512x512.png',
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
