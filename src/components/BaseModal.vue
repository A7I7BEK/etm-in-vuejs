<template>
	<div
		class="modal fade az_modal"
		:id="id"
		:class="{ 'd-block show': active }"
	>
		<div
			class="modal-dialog modal-dialog-centered"
			:class="[ modalSize.trim() ? 'modal-' + modalSize : '' ]"
		>
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title">
						<slot name="title">Something</slot>
					</h5>

					<button
						type="button"
						class="az_modal_close"
						data-dismiss="modal"
					>
						<span class="txt">{{ $t('close') }}</span>
						<img
							src="@/assets/img/svg/close.svg"
							alt=""
							class="img"
						>
					</button>
				</div>


				<div class="modal-body p-0">
					<slot name="content">
						Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad assumenda aut deleniti dicta fugiat
						incidunt ipsam ipsum magni maiores nam nesciunt odio optio quam quod repudiandae rerum sit unde,
						veritatis.
					</slot>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "BaseModal",
	props: {
		id: {
			type: String,
			required: true,
			default: '',
		},
		modalSize: {
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