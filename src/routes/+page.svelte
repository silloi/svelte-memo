<script lang="ts">
	import MemoList from '$lib/MemoList.svelte';
</script>

<main class="h-full">
	<div class="sidebar">
		<MemoList />
	</div>
	<div class="mainpanel">
		<div class="w-full">hi!</div>
	</div>
</main>

<style>
	main {
		display: flex;
		flex-direction: row;
	}

	.sidebar {
		width: 300px;
	}

	.mainpanel {
		flex: 1;
	}
</style>
