<template>
	<div class="ln_board_list">

		<draggable
			:list="projectData.columns"
			group="draggableListColumn"
			ghost-class="ghost"
			animation="300"
			@change="DraggableChange"
			v-if="projectData.projectType === PROJECT_TYPE.TRELLO"
		>
			<list-column
				v-for="item in projectData.columns"
				:key="item.id"
				:column-item="item"
				type-trello
			></list-column>
		</draggable>
		<template v-else>
			<list-column
				v-for="item in projectData.columns"
				:key="item.id"
				:column-item="item"
			></list-column>
		</template>


		<template v-if="can(PERMISSION_TYPE.PROJECT_COLUMN.CREATE) &&
			projectData.projectType === PROJECT_TYPE.TRELLO">
			<button
				type="button"
				class="ln_board_item_add button-effect"
				data-toggle="modal"
				data-target="#modalCreateColumn"
			>
				<i class="fa fa-plus"></i>
				<span>{{ $t('addList') }}</span>
			</button>
		</template>
	</div>
</template>


<script>
import draggable from 'vuedraggable';
import { PERMISSION_TYPE, PROJECT_TYPE } from '../../../../../constants';
import ListColumn from './components/ListColumn';


export default {
	name: 'DashboardTypeList',
	components: {
		ListColumn,
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