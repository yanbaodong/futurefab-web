<template>
	<ff-basic-no-page id="demo-404" class="cardItem" @goHome="handleHome"></ff-basic-no-page>
</template>
<script lang="ts" setup>
	import store from '@/store/store';
	const handleHome = () => {
		window.location.href = `${store.state.portalUrl}/home`;
	};
</script>
