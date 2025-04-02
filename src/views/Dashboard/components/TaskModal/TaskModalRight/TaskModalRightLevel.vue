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
						v-for="[ key, value ] in Object.entries(TASK_LEVEL_TYPE)"
						:key="key"
					>
						<label>
							<input
								type="radio"
								name="radioLevel"
								hidden
								:checked="$store.state.taskModalData.level === value"
								@change="ChangeLevel(value)"
							>

							<h5>{{ $t(`TASK_LEVEL_TYPE.${value}`) }}</h5>

							<div class="doer-check"></div>
						</label>
					</div>

				</div>
			</div>
		</div>

	</div>
</template>

<script>
import { TASK_LEVEL_TYPE } from '../../../../../constants';


export default {
	name: 'TaskModalRightLevel',
	data() {
		return {
			TASK_LEVEL_TYPE,
		};
	},
	methods: {
		ChangeLevel(value) {
			document.dispatchEvent(new Event('mousedown'));

			this.$api
				.put('/tasks/' + this.$store.state.taskModalData.id, {
					name: this.$store.state.taskModalData.name,
					level: value
				})
				.then(response => {
					this.$store.commit('setModalTaskLevelType', response.data.data.taskLevelType);
					this.$store.state.taskModalActionStarter++;
				});
		},
	},
};
</script>