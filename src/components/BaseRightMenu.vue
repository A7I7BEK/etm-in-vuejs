<template>
	<div
		class="az_r_menu"
		data-custom-switch-body
		:id="id"
		:class="{ 'active': active }"
	>
		<div class="az_r_menu_ttl">
			<button
				type="button"
				class="az_r_menu_ttl_btn back"
				:data-custom-switch-btn="'#' + buttonBack"
				v-if="buttonBack.trim()"
			>
				<i class="fa fa-chevron-left"></i>
			</button>

			<div class="az_r_menu_ttl_txt">
				<slot name="title">Something</slot>
			</div>

			<button
				type="button"
				class="az_r_menu_ttl_btn cls"
				:data-custom-switch-btn="'#' + id"
				v-if="buttonClose"
			>
				<img
					src="/img/svg/close.svg"
					alt=""
				>
			</button>
		</div>


		<div class="az_r_menu_cnt">
			<slot name="content">
				Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad assumenda aut deleniti dicta fugiat
				incidunt ipsam ipsum magni maiores nam nesciunt odio optio quam quod repudiandae rerum sit unde,
				veritatis.
			</slot>
		</div>
	</div>
</template>

<script>
export default {
	name: "BaseRightMenu",
	props: {
		id: {
			type: String,
			required: true,
			default: '',
		},
		buttonClose: {
			type: Boolean,
			default: true,
		},
		buttonBack: {
			type: String,
			default: '',
		},
		active: {
			type: Boolean,
			default: false,
		},
	}
};
</script>