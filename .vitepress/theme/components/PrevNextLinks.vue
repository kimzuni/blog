<script setup lang="ts">

import { usePrevNext } from '../composables/usePrevNext';

const control = usePrevNext();

</script>



<style scoped>

@reference "../styles/index.css";

footer {
	@apply mt-16;
} .prev-next {
	@apply pt-6 border-t-1 border-(--vp-c-divider);
	@apply grid gap-y-2 gap-x-4;
	@apply sm:grid-cols-[repeat(2,1fr)];
} .pager-link {
	@apply border-1 border-(--vp-c-divider);
	@apply block rounded-lg;
	@apply px-4 pt-2.75 pb-3.25;
	@apply w-full h-full;
	@apply hover:border-(--vp-c-brand-1) transition-[border-color];

	&.next {
		@apply ml-auto text-right;
	}
} .desc, .title {
	@apply block;
	@apply font-medium leading-[20px];
} .desc {
	@apply text-xs text-(--vp-c-text-2);
} .title {
	@apply text-sm text-(--vp-c-brand-1);
	@apply transition-[color];
}

</style>

<template>
	<footer>
		<nav
			v-if="control.prev?.link || control.next?.link"
			class="prev-next"
			aria-labelledby="doc-footer-aria-label"
		>
			<span class="sr-only" id="doc-footer-aria-label">Pager</span>

			<div class="pager">
				<a
					v-if="control.prev?.link"
					class="pager-link prev"
					:href="control.prev.link"
				>
					<span class="desc">Read Previous</span>
					<span class="title" v-html="control.prev.text"></span>
				</a>
			</div>
			<div class="pager">
				<a
					v-if="control.next?.link"
					class="pager-link next"
					:href="control.next.link"
				>
					<span class="desc">Read Next</span>
					<span class="title" v-html="control.next.text"></span>
				</a>
			</div>
		</nav>
	</footer>
</template>
