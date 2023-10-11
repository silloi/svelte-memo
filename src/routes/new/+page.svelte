<script lang="ts">
	import { supabase } from '$lib/db';
	import Button from '@smui/button/src/Button.svelte';
	import Card, { MediaContent } from '@smui/card';
	import Textfield from '@smui/textfield';
	import type { User } from '@supabase/supabase-js';
	import { getContext } from 'svelte';
	import { page } from '$app/stores';
	import { fetchOgImage } from '$lib/opengraph';

	let linkTitle = $page.url.searchParams.get('title') ?? '';
	let linkUrl = $page.url.searchParams.get('text') ?? '';

	let promiseLinkUrl = fetchOgImage(linkUrl);
	let imageRef: HTMLImageElement;

	// context から user store を取得します
	const user = getContext<User>('user');

	let newText = '';
	let errorText = '';

	const addMemo = async () => {
		let text = newText.trim();
		let linkImage = imageRef?.src;
		if (text.length) {
			let { data: memo, error } = await supabase
				.from('memos')
				.insert({
					text,
					user_id: $user.id,
					link_url: linkUrl,
					link_title: linkTitle,
					link_image: linkImage
				})
				.select()
				.single();

			if (!memo) return;

			if (error) {
				errorText = error.message;
			}
		}
	};
</script>

<main>
	<form on:submit|preventDefault={addMemo} class="flex gap-2 my-2">
		<Textfield
			style="width: 100%;"
			helperLine$style="width: 100%;"
			textarea
			bind:value={newText}
			label="create a memo"
		/>
		{#if linkTitle || linkUrl}
			<Card variant="outlined" padded>
				{#await promiseLinkUrl then linkImage}
					<!-- svelte-ignore a11y-img-redundant-alt -->
					<img bind:this={imageRef} src={linkImage} alt="link image" />
				{/await}
				<h2 class="mdc-typography--headline6">
					{linkTitle}
				</h2>
				<h3 class="mdc-typography--subtitle2">
					{linkUrl}
				</h3>
			</Card>
		{/if}
		<div class="button-wrap">
			<Button type="submit">Submit</Button>
		</div>
	</form>
	{#if !!errorText}
		<p>
			{errorText}
		</p>
	{/if}
</main>

<style lang="scss">
	@use './src/_Typography';

	main {
		margin: 60px auto;
		max-width: 600px;
	}

	img {
		width: 60px;
		height: 60px;
		object-fit: cover;
	}

	.button-wrap {
		display: flex;
		justify-content: flex-end;
	}
</style>
