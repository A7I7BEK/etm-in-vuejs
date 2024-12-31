<template>
	<div class="table-responsive base_report_table">
		<table class="table">
			<thead>
			<slot name="head"></slot>
			</thead>

			<tbody>
			<slot name="body"></slot>
			</tbody>

			<tfoot v-if="showFoot">
			<slot name="foot">
				<tr>
					<td>Mark</td>
					<td>Otto</td>
				</tr>
			</slot>
			</tfoot>
		</table>
	</div>
</template>

<script>
	export default {
		name: "BaseReportTable",
		props: {
			showFoot: {
				type: Boolean,
				default: false,
			},
		}
	}
</script>