<template>
	<div class="az_base_box">

		<div class="az_crud_ttl mb-5">
			<div class="az_crud_ttl_left">
				<h3 class="az_crud_ttl_txt">{{ title }}</h3>
			</div>

			<div
				class="az_crud_ttl_right"
				v-if="createShow"
			>
				<router-link
					class="btn az_base_btn btn-primary"
					:to="createUrl"
				>
					<i class="fa fa-plus"></i>
					{{ $t('create') }}
				</router-link>
			</div>
		</div>


		<div
			class="az_crud_ftr mb-4"
			data-custom-accordion
			v-if="filterShow"
		>
			<div
				class="az_crud_ftr_ttl"
				data-custom-accordion-btn
				:class="{ 'active': filterOpen }"
			>
				<p>{{ $t('filter') }}</p>

				<i class="fa fa-angle-down"></i>
			</div>


			<div
				class="az_crud_ftr_cnt"
				data-custom-accordion-body
				:style="filterOpen ? '' : 'display: none;'"
			>
				<div class="az_crud_ftr_cnt_inr">
					<div class="d-flex flex-wrap">

						<slot
							name="filter"
							v-if="$slots.hasOwnProperty('filter')"
						>
							SLOT: 'filter'
						</slot>

					</div>
				</div>
			</div>
		</div>


		<slot
			name="table"
			v-if="$slots.hasOwnProperty('table')"
		>
			SLOT: 'table'
		</slot>


		<div
			class="az_crud_nav_ft mt-4"
			v-if="footerShow"
		>
			<div class="az_crud_nav_ft_qty">

				<slot
					name="range"
					v-if="$slots.hasOwnProperty('range')"
				>
					SLOT: 'range'
				</slot>

			</div>


			<div class="az_crud_nav_ft_pag">

				<slot
					name="pagination"
					v-if="$slots.hasOwnProperty('pagination')"
				>
					SLOT: 'pagination'
				</slot>

			</div>
		</div>

	</div>
</template>

<script>
export default {
	name: 'BaseCrudPageList',
	props: {
		title: {
			type: String,
			required: true,
		},
		createUrl: {
			type: Object,
			required: true,
		},
		createShow: {
			type: Boolean,
			default: true,
		},
		filterShow: {
			type: Boolean,
			default: true,
		},
		filterOpen: {
			type: Boolean,
			default: true,
		},
		footerShow: {
			type: Boolean,
			default: true,
		},
	},
};
</script>