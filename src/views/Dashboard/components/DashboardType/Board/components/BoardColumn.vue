<template>
	<div class="board-item">
		<div class="d-flex align-items-center board-item__title_bx">
			<div style="width: calc(100% - 66px);">
				<div class="p-1" v-if="columnNameEditMode">
					<form @submit.prevent="EditColumn">
						<input type="text"
							   class="form-control dn_text_area"
							   :class="{'is-invalid': $v.columnNameForEdit.$error}"
							   v-model="columnNameForEdit"
						>
					</form>
				</div>
				<div class="board-item__title" v-else>
					<h5 v-if="typeTrello">{{ columnItem.name }}</h5>
					<h5 v-else>{{ $t(columnItem.codeName) }}</h5>
				</div>
			</div>


			<div style="width: 66px;" v-if="can('PROJECT_COLUMN_UPDATE') && typeTrello">
				<div class="d-flex" v-if="columnNameEditMode">
					<button type="button" class="btn btn-sm az_r_menu_ttl_btn" @click="EditColumn">
						<b class="fa fa-check"></b>
					</button>
					<button type="button" class="btn btn-sm az_r_menu_ttl_btn" @click="columnNameEditMode = false;">
						<b class="fa fa-close"></b>
					</button>
				</div>
				<div class="d-flex" v-else>
					<button type="button" class="btn btn-sm az_r_menu_ttl_btn" @click="columnNameEditMode = true; columnNameForEdit = columnItem.name">
						<b class="fa fa-pencil"></b>
					</button>
					<button type="button" class="btn btn-sm az_r_menu_ttl_btn" @click="DeleteColumn">
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
				:move="DraggableMove"
				@end="DraggableEnd"
				:data-id="columnItem.id"
				v-if="can('TASK_READ')"
		>
			<transition-group type="transition" name="flip-list" tag="div" class="board-item__inner_trs">

				<board-task v-for="item in columnItem.tasks" :key="item.id" :task-item="item" :data-ordering="item.ordering"></board-task>

			</transition-group>
		</draggable>


		<div class="board-item__create__list button-effect"
			 data-toggle="modal"
			 data-target="#modalCreateTask"
			 @click="$store.state.createModalTaskId = columnItem.id"
			 v-if="can('TASK_CREATE')">

			<div class="board-list__icon">
				<i class="fa fa-plus"></i>
			</div>
			<span>{{$t('boardColumn.addTask')}}</span>
		</div>
	</div>
</template>

<script>
	import BoardTask from './BoardTask';
	import draggable from 'vuedraggable';
	import { required } from 'vuelidate/lib/validators';



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
		data()
		{
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
			EditColumn()
			{
				this.$v.$touch();
				if (this.$v.$invalid)
				{
					return;
				}


				let postData = { ...this.columnItem };
				postData.name = this.columnNameForEdit;
				postData.codeName = this.columnNameForEdit.toUpperCase().split(' ').join('_');
				delete postData.tasks;

				this.$api
					.put('projectColumns/' + postData.id, postData)
					.then(response => {
						this.columnNameEditMode = false;
						this.columnNameForEdit = null;
						this.$v.columnNameForEdit.$reset();
					});
			},
			DeleteColumn()
			{
				if (confirm(this.$t('confirmDelete')))
				{
					this.$api.delete('projectColumns/' + this.columnItem.id);
				}
			},



			DraggableMove(event)
			{
				this.dragEvent = {
					drag: event.draggedContext,
					drop: event.relatedContext,
				};
			},
			DraggableEnd()
			{
				if (!this.dragEvent ||
					this.columnItem.tasks.findIndex(x => x.id === this.dragEvent.drag.element.id)
					===
					this.dragEvent.drag.element.ordering)
				{
					return;
				}


				this.ReorderArray(this.columnItem.tasks);
				if (this.dragEvent.drag.element.columnId !== this.dragEvent.drop.component.$attrs['data-id'])
				{
					this.ReorderArray(this.dragEvent.drop.list);
					this.dragEvent.drag.element.columnId = this.dragEvent.drop.component.$attrs['data-id'];
				}


				let elemOrder = this.dragEvent.drop.list.findIndex(x => x.id === this.dragEvent.drag.element.id);

				this.$api
					.post('tasks/move', {
						id: this.dragEvent.drag.element.id,
						projectId: this.dragEvent.drag.element.projectId,
						columnId: this.dragEvent.drag.element.columnId,
						ordering: elemOrder < 0 ? 0 : elemOrder,
					})
					.then(response => {
						this.dragEvent = null;
					});
			},
			ReorderArray(array)
			{
				array.forEach((item, index) => {
					item.ordering = index;
				});
			},
		}
	};
</script>