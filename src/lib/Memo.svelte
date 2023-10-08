<script lang="ts">
	import { getContext } from 'svelte';
	import { supabase } from './db';
	import type { MemoResponse } from './schema';
	import type { User } from '@supabase/supabase-js';
	import Button, { Label } from '@smui/button';
	import Item from '@smui/list/src/Item.svelte';
	import Checkbox from '@smui/checkbox';
	import Actions from '@smui/card/src/Actions.svelte';
	import { createTimestampLabel } from './time';
	import { Meta, PrimaryText, SecondaryText, Text } from '@smui/list';

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

<Item draggable="true">
	<Text>
		<PrimaryText>
			{memo.text}
		</PrimaryText>
		<SecondaryText>
			{createTimestampLabel(new Date(memo.inserted_at))}
		</SecondaryText>
	</Text>
	<Meta>
		<input type="checkbox" on:change={toggle} bind:checked={isPinned} />
		<Button on:click={onDelete}>
			<Label>x</Label>
		</Button>
	</Meta>
</Item>
