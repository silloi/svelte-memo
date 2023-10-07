<script lang="ts">
	import '../app.postcss';

	import { onMount } from 'svelte';
	import { supabase } from '$lib/db';
	import Auth from '$lib/Auth.svelte';
	import type { User } from '@supabase/supabase-js';
	// import Home from "$lib/Home.svelte";
	import { setContext } from 'svelte';
	import { writable } from 'svelte/store';

	const user = writable();
	let userData: User | null;

	onMount(() => {
		supabase.auth.getSession().then(({ data: { session } }) => {
			userData = session?.user ?? null;
		});

		const {
			data: { subscription: authListener }
		} = supabase.auth.onAuthStateChange((_, session) => {
			const currentUser = session?.user;
			userData = currentUser ?? null;
			user.set(userData);
		});

		return () => {
			authListener?.unsubscribe();
		};
	});

	setContext('user', user);
</script>

<div class="w-full h-screen bg-gray-200">
	{#if user}
		<slot />
	{:else}
		<div class="min-w-full min-h-screen flex items-center justify-center">
			<Auth />
		</div>
	{/if}
</div>
