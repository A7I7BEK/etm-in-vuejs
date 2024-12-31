<template>
	<div class="mw-menu__item mw-menu__copy mw-menu__delete custom-dropdown__main" data-custom-drop>
		<a href="#" data-custom-drop-btn>
			<div class="mw-menu__item__icon">
				<i class="fa fa-trash-o"></i>
			</div>
			<span>{{ $t('delete') }}</span>
		</a>


		<div class="custom-dropdown right top" data-custom-drop-body>
			<div class="member-all__top">
				<h3>{{ $t('areYouSure') }}</h3>
			</div>


			<div class="menu-copy__content">
				<div class="menu-copy__inner mw-menu__copy__form">

					<p class="az_task_delete_txt mb-3">{{ $t('cannotUndoAction') }}</p>

					<button type="button" class="btn az_base_btn btn-danger w-100" @click="Delete">{{ $t('deleteTask') }}</button>

				</div>
			</div>
		</div>
	</div>
</template>

<script>

	export default {
		name: 'TaskModalRightDelete',
		methods: {
			Delete()
			{
				this.$api
					.delete('tasks/' + this.$store.state.taskModalData.id)
					.then(response => {
						$('#board-modal').modal('hide');
						this.$notification.success(this.$t('successfullyDeleted'));
					});
			},
		},
	};
</script>