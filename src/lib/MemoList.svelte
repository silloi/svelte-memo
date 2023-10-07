<script lang="ts">
	import type { User } from '@supabase/supabase-js';
	import Memo from "./Memo.svelte";
	import { supabase } from '$lib/db';
	import { Alert } from 'flowbite-svelte';
	import { getContext, onMount } from 'svelte';
	import type { MemoResponse } from '$lib/schema';

	// context から user store を取得します
	const user = getContext<User>('user');

	let memos = new Array<MemoResponse>();
	let newText = '';
	let errorText = '';

	onMount(() => {
		fetchMemos();
	});

	const fetchMemos = async () => {
		let { data, error } = await supabase.from('memos').select('*').order('id', { ascending: true });
		if (error) {
			console.log('error', error);
		} else {
			memos = data ?? [];
		}
	};

	const addMemo = async (inputText: string) => {
		let text = inputText.trim();
		if (text.length) {
			let { data: memo, error } = await supabase
				.from('memos')
				.insert({ text, user_id: $user.id })
				.select()
				.single();

			if (!memo) return;

			if (error) {
				errorText = error.message;
			} else {
				memos = [...memos, memo];
				newText = '';
			}
		}
	};

	const deleteMemo = async (id: number) => {
		try {
			await supabase.from('memos').delete().eq('id', id);
			memos = memos.filter((x) => x.id != id);
		} catch (error) {
			console.log('error', error);
		}
	};
</script>

<div class="w-full">
	<h1 class="mb-12">Memo List.</h1>
	<form on:submit|preventDefault={() => addMemo(newText)} class="flex gap-2 my-2">
		<input class="rounded w-full p-2" type="text" placeholder="make coffee" bind:value={newText} />
		<button type="submit" class="btn-black"> Add </button>
	</form>
	{#if !!errorText}
		<Alert>
			{errorText}
		</Alert>
	{/if}
	<div class="bg-white shadow overflow-hidden rounded-md">
		<ul>
			{#each memos as memo (memo.id)}
				<Memo {memo} onDelete={() => deleteMemo(memo.id)} />
			{/each}
		</ul>
	</div>
</div>
