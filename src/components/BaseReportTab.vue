<template>
	<div class="base_report_tab">
		<nav class="nav">
			<slot name="title"></slot>
		</nav>

		<div class="tab-content">
			<slot name="content"></slot>
		</div>
	</div>
</template>

<script>
	export default {
		name: "BaseReportTab",
	}
</script>