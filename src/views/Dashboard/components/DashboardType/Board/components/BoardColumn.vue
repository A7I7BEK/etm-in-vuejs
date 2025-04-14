<template>
	<div
		class="board-item"
		:data-column-ordering="columnItem.ordering"
		:data-column-id="columnItem.id"
	>
		<div class="d-flex align-items-center board-item__title_bx">
			<div style="width: calc(100% - 66px);">
				<div
					class="p-1"
					v-if="columnNameEditMode"
				>
					<form @submit.prevent="EditColumn">
						<input
							type="text"
							class="form-control dn_text_area"
							:class="{ 'is-invalid': $v.columnNameForEdit.$error }"
							v-model="columnNameForEdit"
						>
					</form>
				</div>
				<div
					class="board-item__title"
					v-else
				>
					<h5 v-if="typeTrello">{{ columnItem.name }}</h5>
					<h5 v-else>{{ $t(columnItem.name) }}</h5>
				</div>
			</div>


			<div
				style="width: 66px;"
				v-if="can(PERMISSION_TYPE.PROJECT_COLUMN.UPDATE) &&
					typeTrello"
			>
				<div
					class="d-flex"
					v-if="columnNameEditMode"
				>
					<button
						type="button"
						class="btn btn-sm az_r_menu_ttl_btn"
						@click="EditColumn"
					>
						<b class="fa fa-check"></b>
					</button>
					<button
						type="button"
						class="btn btn-sm az_r_menu_ttl_btn"
						@click="columnNameEditMode = false;"
					>
						<b class="fa fa-close"></b>
					</button>
				</div>
				<div
					class="d-flex"
					v-else
				>
					<button
						type="button"
						class="btn btn-sm az_r_menu_ttl_btn"
						@click="columnNameEditMode = true; columnNameForEdit = columnItem.name"
					>
						<b class="fa fa-pencil"></b>
					</button>
					<button
						type="button"
						class="btn btn-sm az_r_menu_ttl_btn"
						@click="DeleteColumn"
					>
						<b class="fa fa-trash-o"></b>
					</button>
				</div>
			</div>
		</div>


		<draggable
			:list="columnItem.tasks"
			group="draggableBoardTask"
			ghost-class="ghost"
			class="board-item__inner"
			animation="300"
			@change="DraggableChange"
			v-if="can(PERMISSION_TYPE.TASK.READ)"
		>
			<transition-group
				type="transition"
				name="flip-list"
				tag="div"
				class="board-item__inner_trs"
			>

				<board-task
					v-for="item in columnItem.tasks"
					:key="item.id"
					:task-item="item"
				></board-task>

			</transition-group>
		</draggable>


		<div
			class="board-item__create__list button-effect"
			data-toggle="modal"
			data-target="#modalCreateTask"
			@click="$store.state.createTaskColumnId = columnItem.id"
			v-if="can(PERMISSION_TYPE.TASK.CREATE)"
		>

			<div class="board-list__icon">
				<i class="fa fa-plus"></i>
			</div>
			<span>{{ $t('boardColumn.addTask') }}</span>
		</div>
	</div>
</template>

<script>
import draggable from 'vuedraggable';
import { required } from 'vuelidate/lib/validators';
import { PERMISSION_TYPE } from '../../../../../../constants';
import BoardTask from './BoardTask';



export default {
	name: 'BoardColumn',
	components: {
		BoardTask,
		draggable,
	},
	props: {
		columnItem: {
			type: Object,
			required: true,
			default: {},
		},
		typeTrello: {
			type: Boolean,
			default: false
		},
	},
	data() {
		return {
			PERMISSION_TYPE,
			columnNameEditMode: false,
			columnNameForEdit: null,
		};
	},
	validations: {
		columnNameForEdit: {
			required,
		},
	},
	methods: {
		async EditColumn() {
			this.$v.$touch();
			if (this.$v.$invalid) {
				return;
			}


			await this.$api.put('/project-columns/' + this.columnItem.id, {
				name: this.columnNameForEdit,
			});

			this.columnItem.name = this.columnNameForEdit;
			this.columnNameEditMode = false;
			this.columnNameForEdit = null;
			this.$v.columnNameForEdit.$reset();
		},
		async DeleteColumn() {
			if (!confirm(this.$t('confirmDelete'))) {
				return;
			}
			await this.$api.delete('/project-columns/' + this.columnItem.id);
		},



		async DraggableChange(event) {
			this.ReorderArray(this.columnItem.tasks);

			if (event.removed) {
				return;
			}

			let element = null;

			if (event.added) {
				element = event.added.element;
			}
			else if (event.moved) {
				element = event.moved.element;
			}

			const elemOrder = this.columnItem.tasks.findIndex(a => a.id === element.id);

			await this.$api.post('/tasks/move', {
				id: element.id,
				projectId: this.$store.state.projectData.id,
				columnId: this.columnItem.id,
				ordering: elemOrder,
			});
		},
		ReorderArray(array) {
			array.forEach((item, index) => {
				item.ordering = index;
			});
		},
	}
};
</script>