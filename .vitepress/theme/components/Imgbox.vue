<style>

@reference "../styles/index.css";

.imgbox {
	@apply bg-(--vp-c-bg-soft);
	@apply overflow-auto;

	&, & > p {
		@apply flex items-center-safe gap-4;
		@apply m-0;
	} img {
		@apply max-w-[95%] max-h-none;
	}
}

</style>

<template>
	<div class="imgbox">
		<slot></slot>
	</div>
</template>
