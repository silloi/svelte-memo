<script lang="ts">
	import { supabase } from '$lib/db';
	import Button from '@smui/button/src/Button.svelte';
  import Card from '@smui/card';
	import Textfield from '@smui/textfield';
	import type { User } from '@supabase/supabase-js';
	import { getContext } from 'svelte';
  import { page } from '$app/stores';

  let title = $page.url.searchParams.get('title') ?? '';
  let text = $page.url.searchParams.get('text') ?? '';

	// context から user store を取得します
	const user = getContext<User>('user');

	let newText = text;
	let errorText = '';

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
			}
		}
	};
</script>

<main>
	<form on:submit|preventDefault={() => addMemo(newText)} class="flex gap-2 my-2">
		<Textfield
			style="width: 100%;"
			helperLine$style="width: 100%;"
			textarea
			bind:value={newText}
			label="create a memo"
		/>
    {#if title || text}
      <Card variant="outlined" padded>
        <h2 class="mdc-typography--headline6">
          {title}
        </h2>
        <h3 class="mdc-typography--subtitle2">
          {text}
        </h3>
      </Card>
    {/if}
    <div class="button-wrap">
      <Button type="submit">
        Submit
      </Button>
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

  .button-wrap {
    display: flex;
    justify-content: flex-end;
  }
</style>
