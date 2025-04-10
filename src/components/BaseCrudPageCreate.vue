<template>
	<div class="az_base_box">

		<div class="az_crud_ttl mb-5">
			<div class="az_crud_ttl_left">
				<router-link
					class="btn az_base_btn btn-default icon mr-3"
					:to="backUrl"
				>
					<i class="fa fa-arrow-left"></i>
				</router-link>

				<i18n
					class="az_crud_ttl_txt"
					tag="h3"
					path="crudCreate"
				>
					<template #text>{{ title.toLowerCase() }}</template>
				</i18n>
			</div>
		</div>



		<div class="maw-700 m-auto">
			<slot
				name="form"
				v-if="$slots.hasOwnProperty('form')"
			>
				SLOT: 'form'
			</slot>
		</div>
	</div>
</template>

<script>
export default {
	name: 'BaseCrudPageCreate',
	props: {
		title: {
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