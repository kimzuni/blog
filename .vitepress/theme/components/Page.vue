<style scoped>

@reference "../styles/index.css";

.page-content-wrapper {
	@apply px-6 sm:px-12 vp:px-16!;
	@apply mb-24 md:mb-32;
} .page-content {
	@apply mx-auto max-w-[1152px];
}

</style>

<template>
	<div class="page-content-wrapper">
		<div class="page-content">
			<slot></slot>
		</div>
	</div>
</template>
