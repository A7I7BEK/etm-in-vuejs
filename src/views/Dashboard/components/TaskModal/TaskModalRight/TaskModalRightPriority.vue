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
			<span>{{ $t('priority') }}</span>
		</a>

		<div
			class="custom-dropdown right"
			data-custom-drop-body
		>
			<div class="member-all__top">
				<h3>{{ $t('priority') }}</h3>
			</div>

			<div class="menu-priority__content">
				<div class="priority-search__inner">

					<div
						class="priority-search__item"
						v-for="[ key, value ] in Object.entries(TASK_PRIORITY_TYPE)"
						:key="key"
					>
						<label>
							<input
								type="radio"
								name="radioPriority"
								hidden
								:checked="$store.state.taskModalData.priority === value"
								@change="ChangePriority(value)"
							>

							<h5>{{ $t(`TASK_PRIORITY_TYPE.${value}`) }}</h5>

							<div class="doer-check"></div>
						</label>
					</div>

				</div>
			</div>
		</div>

	</div>
</template>

<script>
import { TASK_PRIORITY_TYPE } from '../../../../../constants';


export default {
	name: 'TaskModalRightPriority',
	data() {
		return {
			TASK_PRIORITY_TYPE,
		};
	},
	methods: {
		ChangePriority(value) {
			document.dispatchEvent(new Event('mousedown'));

			this.$api
				.put('/tasks/' + this.$store.state.taskModalData.id, {
					name: this.$store.state.taskModalData.name,
					priority: value
				})
				.then(response => {
					this.$store.state.taskModalData.priority = value;
					this.$store.state.taskModalActionStarter++;
				});
		},
	},
};
</script>