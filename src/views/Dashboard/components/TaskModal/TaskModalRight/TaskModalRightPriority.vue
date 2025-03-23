<template>
	<div class="mw-menu__item custom-dropdown__main" data-custom-drop>
		<a href="#" data-custom-drop-btn>
			<div class="mw-menu__item__icon">
				<i class="fa fa-align-left"></i>
			</div>
			<span>{{$t('priority')}}</span>
		</a>

		<div class="custom-dropdown right" data-custom-drop-body>
			<div class="member-all__top">
				<h3>{{$t('priority')}}</h3>
			</div>

			<div class="menu-priority__content">
				<div class="priority-search__inner">

					<div class="priority-search__item" v-for="item in $store.state.projectData.taskPriorityType" :key="item.id">
						<label>
							<input type="radio"
								   name="radioPriority"
								   hidden
								   :checked="$store.state.taskModalData.taskPriorityType && $store.state.taskModalData.taskPriorityType.id === item.id"
								   @change="ChangePriority(item)">

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
		name: 'TaskModalRightPriority',
		methods: {
			ChangePriority(item)
			{
				document.dispatchEvent(new Event('mousedown'));

				this.$api
					.put('tasks/' + this.$store.state.taskModalData.id, {
						name: this.$store.state.taskModalData.name,
						priority: item.id
					})
					.then(response => {
						this.$store.commit('setModalTaskPriorityType', response.data.data.taskPriorityType);
						this.$store.state.taskModalActionStarter++;
					});
			},
		},
	};
</script>