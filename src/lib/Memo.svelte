<script lang="ts">
	import { getContext } from 'svelte';
	import { supabase } from './db';
	import type { MemoResponse } from './schema';
	import type { User } from '@supabase/supabase-js';
  import Button, { Label } from '@smui/button';
	import Card, { Content } from '@smui/card';
  import Checkbox from '@smui/checkbox';
	import Actions from '@smui/card/src/Actions.svelte';
	import { createTimestampLabel } from './time';

	export let memo: MemoResponse;
	export let onDelete = () => {};

	// context から user store を取得します
	const user = getContext<User>('user');

	let isPinned = memo.is_pinned;

	const toggle = async () => {
		try {
			const { data, error } = await supabase
				.from('memos')
				.update({ user_id: $user.id, is_pinned: !isPinned })
				.eq('id', memo.id)
				.select('is_pinned')
				.single();
			if (error) {
				throw error;
			}
			isPinned = data.is_pinned;
		} catch (error) {
			console.log('error', error);
		}
	};
</script>

<li
	class="w-full block cursor-pointer hover:bg-gray-200 focus:outline-none focus:bg-gray-200 transition duration-150 ease-in-out"
>
	<Card variant="outlined">
		<Content>
      <h2 class="mdc-typography--headline6">{memo.text}</h2>  
      <h3 class="mdc-typography--subtitle2">{createTimestampLabel(new Datememo.inserted_at)}</h3>  
    </Content>
    <Actions>
      <input type="checkbox" on:change={toggle} bind:checked={isPinned} />
      <Button on:click={onDelete}>
        <Label>x</Label>
      </Button>
    </Actions>
	</Card>
</li>

<style lang="scss">
  @use '../Typography';
</style>
