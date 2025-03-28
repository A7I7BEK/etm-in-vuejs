<template>
	<div
		class="mw-menu__item custom-dropdown__main"
		data-custom-drop
	>
		<a
			href="#"
			data-custom-drop-btn
		>
			<div class="mw-menu__item__icon">
				<i class="fa fa-align-left"></i>
			</div>
			<span>{{ $t('difficultyLevel') }}</span>
		</a>

		<div
			class="custom-dropdown right"
			data-custom-drop-body
		>
			<div class="member-all__top">
				<h3>{{ $t('difficultyLevel') }}</h3>
			</div>

			<div class="menu-difficulty__content">
				<div class="priority-search__inner">

					<div
						class="priority-search__item"
						v-for="item in $store.state.projectData.taskLevelType"
						:key="item.id"
					>
						<label>
							<input
								type="radio"
								name="radioLevel"
								hidden
								:checked="$store.state.taskModalData.taskLevelType && $store.state.taskModalData.taskLevelType.id === item.id"
								@change="ChangeLevel(item)"
							>

							<h5>{{ $t(item.value) }}</h5>

							<div class="doer-check"></div>
						</label>
					</div>

				</div>
			</div>
		</div>

	</div>
</template>

<script>
export default {
	name: 'TaskModalRightLevel',
	methods: {
		ChangeLevel(item) {
			document.dispatchEvent(new Event('mousedown'));

			this.$api
				.put('/tasks/' + this.$store.state.taskModalData.id, {
					name: this.$store.state.taskModalData.name,
					level: item.id
				})
				.then(response => {
					this.$store.commit('setModalTaskLevelType', response.data.data.taskLevelType);
					this.$store.state.taskModalActionStarter++;
				});
		},
	},
};
</script>