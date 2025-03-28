<template>
	<div class="mw-description">
		<div class="mw-description__top">
			<div class="mw-description__title">
				<div class="mw-description__icon">
					<i class="fa fa-file"></i>
				</div>
				<h3>{{ $t('description') }}</h3>
			</div>
		</div>


		<div class="mw-description__content">
			<form action="">
				<div class="mw-description__text">
					<p
						contenteditable
						v-if="can('TASK_UPDATE')"
						:data-placeholder="$t('taskDescription')"
						@focusout="SaveDescription"
					>{{ $store.state.taskModalData.description }}</p>
					<p
						v-else
						:data-placeholder="$t('taskDescription')"
					>{{ $store.state.taskModalData.description }}</p>

					<!--<div class="mw-description__bottom">-->
					<!--<div class="mw-description__save button-effect">Сохранить</div>-->
					<!--</div>-->
				</div>
			</form>
		</div>
	</div>
</template>

<script>
export default {
	name: "TaskModalLeftDescription",
	data() {
		return {

		};
	},
	created() {

	},
	mounted() {

	},
	methods: {
		SaveDescription(e) {
			this.$api
				.put('/tasks/' + this.$store.state.taskModalData.id, {
					name: this.$store.state.taskModalData.name,
					description: e.target.innerText,
				})
				.then(response => {
					this.$store.state.taskModalActionStarter++;

					// this.$notification.success('Успешно сохранен!');
				});
		}
	}
};
</script>