<template>
	<div class="az_base_box">

		<div class="az_crud_ttl mb-5">
			<div class="az_crud_ttl_left">
				<router-link class="btn az_base_btn btn-default icon mr-3" :to="backUrl">
					<i class="fa fa-arrow-left"></i>
				</router-link>

				<i18n class="az_crud_ttl_txt" tag="h3" path="crudRead">
					<template #table>{{ titleTable.toLowerCase() }}</template>
					<template #name>{{ titleName }}</template>
				</i18n>
			</div>
		</div>



		<div class="maw-700 m-auto">
			<slot name="table" v-if="$slots.hasOwnProperty('table')">SLOT: 'table'</slot>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'BaseCrudPageRead',
		props: {
			titleTable: {
				type: String,
				required: true,
			},
			titleName: {
				type: String,
				required: true,
			},
			backUrl: {
				type: Object,
				required: true,
			},
		},
	};
</script>