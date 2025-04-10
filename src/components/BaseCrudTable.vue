<template>
	<div class="table-responsive az_crud_tb">
		<table
			class="table"
			:class="tableClass"
		>
			<thead>
				<slot
					name="head"
					v-if="$slots.hasOwnProperty('head')"
				>
					SLOT: 'head'
				</slot>
			</thead>


			<tbody>
				<slot
					name="body"
					v-if="$slots.hasOwnProperty('body')"
				>
					SLOT: 'body'
				</slot>
			</tbody>
		</table>
	</div>
</template>

<script>
export default {
	name: 'BaseCrudTable',
	props: {
		tableClass: {
			type: [ String, Object, Array ],
			default: 'miw-700',
		}
	},
};
</script>