<script lang="ts">
  import Drawer, { AppContent, Content } from '@smui/drawer';
	import MemoList from '$lib/MemoList.svelte';
</script>

<div class="drawer-container">

<Drawer>
  <Content>
		<MemoList />
	</Content>
</Drawer>

<AppContent class="main-content">
	<main class="mainpanel">
		<div class="w-full">hi!</div>
  </main>
</AppContent>

</div>

<style>
  .drawer-container {
    position: relative;
    display: flex;
    height: 100%;
    overflow-y: hidden;
  }

	/* .main-content {
		flex: 1;
	} */
</style>
