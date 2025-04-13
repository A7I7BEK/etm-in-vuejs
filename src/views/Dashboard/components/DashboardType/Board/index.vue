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
				v-if="projectData.projectType === PROJECT_TYPE.TRELLO"
			>
				<board-column
					v-for="item in projectData.columns"
					:key="item.id"
					:column-item="item"
					:data-ordering="item.ordering"
					type-trello
				></board-column>
			</draggable>
			<template v-else>
				<board-column
					v-for="item in projectData.columns"
					:key="item.id"
					:column-item="item"
					:data-ordering="item.ordering"
				></board-column>
			</template>


			<div
				class="board-item board-item__add__list"
				v-if="can(PERMISSION_TYPE.PROJECT_COLUMN.CREATE) &&
					projectData.projectType === PROJECT_TYPE.TRELLO"
			>
				<div
					class="board-add__main button-effect"
					data-toggle="modal"
					data-target="#modalCreateColumn"
				>
					<div class="addlist">
						<div class="addlist-icon">
							<i class="fa fa-plus"></i>
						</div>
						<span>{{ $t('addList') }}</span>
					</div>
				</div>
			</div>

		</div>
	</section>
</template>


<script>
import draggable from 'vuedraggable';
import { PERMISSION_TYPE, PROJECT_TYPE } from '../../../../../constants';
import BoardColumn from './components/BoardColumn';


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
	data() {
		return {
			PROJECT_TYPE,
			PERMISSION_TYPE,
			dragElem: null,
		};
	},
	methods: {
		DraggableMove(event) {
			this.dragElem = event.draggedContext.element;
		},
		DraggableEnd() {
			if (!this.dragElem ||
				this.projectData.columns.findIndex(a => a.id === this.dragElem.id)
				===
				this.dragElem.ordering) {
				return;
			}


			this.ReorderArray(this.projectData.columns);
			let elemOrder = this.projectData.columns.findIndex(a => a.id === this.dragElem.id);


			this.$api
				.post('/project-columns/move', {
					id: this.dragElem.id,
					projectId: this.projectData.id,
					ordering: elemOrder,
				})
				.then(response => {
					this.dragElem = null;
				});
		},
		ReorderArray(array) {
			array.forEach((item, index) => {
				item.ordering = index;
			});
		},
	},
};
</script>