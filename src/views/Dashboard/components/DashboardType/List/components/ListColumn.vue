<template>
	<div
		class="ln_board_item1"
		data-custom-accordion
	>
		<div class="ln_board_item1_header">

			<div
				class="px-2 flex-fill"
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
				class="ln_board_item1_header_left"
				data-custom-accordion-btn
				v-else
			>
				<div class="ln_board_item1_header_img1">
					<img src="/img/dotss.png">
				</div>
				<div class="ln_board_item1_header_left_cont1">
					<div class="ln_board_item1_header_left_icon1">
						<img src="/img/rom4.png">
					</div>
					<p class="ln_board_item1_header_left_ppp">
						<b v-if="typeTrello">{{ columnItem.name }}</b>
						<b v-else>{{ $t(columnItem.name) }}</b>
						<span>({{ columnItem.tasks.length }})</span>
					</p>
				</div>
			</div>


			<div
				class="pl-2 pr-3 flex-shrink-0"
				v-if="can('PROJECT_COLUMN_UPDATE') && typeTrello"
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


		<div
			data-custom-accordion-body
			style="display: none;"
		>
			<div
				class="ln_board_item1_body"
				v-if="can('TASK_READ')"
			>

				<draggable
					:list="columnItem.tasks"
					group="draggableListTask"
					ghost-class="ghost"
					animation="300"
					:move="DraggableMove"
					@end="DraggableEnd"
					:data-id="columnItem.id"
				>
					<list-task
						v-for="item in columnItem.tasks"
						:key="item.id"
						:task-item="item"
					></list-task>
				</draggable>

			</div>


			<div
				class="ln_board_item1_body_footer"
				v-if="can('TASK_CREATE')"
			>
				<button
					type="button"
					class="ln_board_item1_body_footer_btn"
					data-toggle="modal"
					data-target="#modalCreateTask"
					@click="$store.state.createModalTaskId = columnItem.id"
				>
					<img src="/img/rom2.png">
					<span>{{ $t('boardColumn.addTask') }}</span>
				</button>
			</div>
		</div>
	</div>
</template>

<script>
import draggable from 'vuedraggable';
import { required } from 'vuelidate/lib/validators';
import ListTask from './ListTask';



export default {
	name: 'ListColumn',
	components: {
		ListTask,
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
			dragEvent: null,
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
		EditColumn() {
			this.$v.$touch();
			if (this.$v.$invalid) {
				return;
			}


			this.$api
				.put('/project-columns/' + this.columnItem.id, {
					name: this.columnNameForEdit,
				})
				.then(response => {
					this.columnNameEditMode = false;
					this.columnNameForEdit = null;
					this.$v.columnNameForEdit.$reset();
				});
		},
		DeleteColumn() {
			if (confirm(this.$t('confirmDelete'))) {
				this.$api.delete('/project-columns/' + this.columnItem.id);
			}
		},


		DraggableMove(event) {
			this.dragEvent = {
				drag: event.draggedContext,
				drop: event.relatedContext,
			};
		},
		DraggableEnd() {
			if (!this.dragEvent ||
				this.columnItem.tasks.findIndex(a => a.id === this.dragEvent.drag.element.id)
				===
				this.dragEvent.drag.element.ordering) {
				return;
			}


			this.ReorderArray(this.columnItem.tasks);
			if (this.dragEvent.drag.element.column.id !== this.dragEvent.drop.component.$attrs[ 'data-id' ]) {
				this.ReorderArray(this.dragEvent.drop.list);
				this.dragEvent.drag.element.column.id = this.dragEvent.drop.component.$attrs[ 'data-id' ];
			}


			let elemOrder = this.dragEvent.drop.list.findIndex(a => a.id === this.dragEvent.drag.element.id);


			this.$api
				.post('/tasks/move', {
					id: this.dragEvent.drag.element.id,
					projectId: this.dragEvent.drag.element.projectId,
					columnId: this.dragEvent.drag.element.column.id,
					ordering: elemOrder < 0 ? 0 : elemOrder,
				})
				.then(response => {
					this.dragEvent = null;
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