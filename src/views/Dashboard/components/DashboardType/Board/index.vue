<template>
	<section class="board-main">
		<div class="board-inner">

			<draggable
					:list="projectData.columns"
					group="draggableBoardColumn"
					ghost-class="ghost"
					class="d-flex align-items-start"
					animation="300"
					:move="DraggableMove"
					@end="DraggableEnd"
					v-if="projectData.projectType.value === $store.state.PROJECT_TYPE_TRELLO"
			>
				<board-column v-for="item in projectData.columns"
							  :key="item.id"
							  :column-item="item"
							  :data-ordering="item.ordering"
							  type-trello
				></board-column>
			</draggable>
			<template v-else>
				<board-column v-for="item in projectData.columns"
							  :key="item.id"
							  :column-item="item"
							  :data-ordering="item.ordering"
				></board-column>
			</template>


			<div class="board-item board-item__add__list" v-if="can('PROJECT_COLUMN_CREATE') && projectData.projectType.value === $store.state.PROJECT_TYPE_TRELLO">
				<div class="board-add__main button-effect" data-toggle="modal" data-target="#modalCreateColumn">
					<div class="addlist">
						<div class="addlist-icon">
							<i class="fa fa-plus"></i>
						</div>
						<span>{{$t('addList')}}</span>
					</div>
				</div>
			</div>

		</div>
	</section>
</template>


<script>
	import BoardColumn from './components/BoardColumn';
	import draggable from 'vuedraggable';


	export default {
		name: 'DashboardTypeBoard',
		components: {
			BoardColumn,
			draggable,
		},
		props: {
			projectData: {
				type: Object,
				required: true,
				default: {},
			},
		},
		data()
		{
			return {
				dragElem: null,
			};
		},
		methods: {
			DraggableMove(event)
			{
				this.dragElem = event.draggedContext.element;
			},
			DraggableEnd()
			{
				if (!this.dragElem ||
					this.projectData.columns.findIndex(x => x.id === this.dragElem.id)
					===
					this.dragElem.ordering)
				{
					return;
				}


				this.ReorderArray(this.projectData.columns);
				let elemOrder = this.projectData.columns.findIndex(x => x.id === this.dragElem.id);


				this.$api
					.post('projectColumns/move', {
						id: this.dragElem.id,
						projectId: this.dragElem.projectId,
						ordering: elemOrder,
					})
					.then(response => {
						this.dragElem = null;
					});
			},
			ReorderArray(array)
			{
				array.forEach((item, index) => {
					item.ordering = index;
				});
			},
		},
	};
</script>