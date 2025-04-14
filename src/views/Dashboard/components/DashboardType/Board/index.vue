<template>
	<section class="board-main">
		<div class="board-inner">

			<draggable
				:list="projectData.columns"
				group="draggableBoardColumn"
				ghost-class="ghost"
				class="d-flex align-items-start"
				animation="300"
				@change="DraggableChange"
				v-if="projectData.projectType === PROJECT_TYPE.TRELLO"
			>
				<board-column
					v-for="item in projectData.columns"
					:key="item.id"
					:column-item="item"
					type-trello
				></board-column>
			</draggable>
			<template v-else>
				<board-column
					v-for="item in projectData.columns"
					:key="item.id"
					:column-item="item"
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
		};
	},
	methods: {
		async DraggableChange(event) {
			this.ReorderArray(this.projectData.columns);

			const element = event.moved.element;
			const elemOrder = this.projectData.columns.findIndex(a => a.id === element.id);

			await this.$api.post('/project-columns/move', {
				id: element.id,
				projectId: this.projectData.id,
				ordering: elemOrder,
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