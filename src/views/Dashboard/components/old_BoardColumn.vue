<template>
	<div>
		<div class="board-item">
			<div class="board-item__main">
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
							<h5>{{ columnData.name }}</h5>
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
							<button type="button" class="btn btn-sm az_r_menu_ttl_btn" @click="columnNameEditMode = true; columnNameForEdit = columnData.name">
								<b class="fa fa-pencil"></b>
							</button>
							<button type="button" class="btn btn-sm az_r_menu_ttl_btn" @click="DeleteColumn">
								<b class="fa fa-trash-o"></b>
							</button>
						</div>
					</div>
				</div>



				<draggable
						:list="columnData.tasks"
						group="category"
						ghost-class="ghost"
						animation="300"
						:move="DragableTaskMove"
						@end="DragableTaskEnd"
						class="board-item__inner"
						:data-id="columnData.id"
						v-if="can('TASK_READ')"
				>
					<transition-group type="transition" name="flip-list" tag="div" class="board-item__inner_trs">

						<!-- CLASS: board-list__red -->
						<!-- CLASS: board-list__orange -->
						<!-- CLASS: board-list__green -->
						<div v-for="item in columnData.tasks" :key="item.id"
							 class="board-item__inner__list"
							 @dragstart="DragStart"
							 @mousedown="ApplyCustomDragGhost"
							 @click="$store.state.taskModalId = item.id"
							 :class="{'board-list__red': item.taskPriorityType && item.taskPriorityType.value === $store.state.TASK_PRIORITY_TYPE.HIGH}"
						>

							<h6>{{ item.name }}</h6>

							<div class="board-item__inner__list__settings">

								<div class="list-settings__date" v-if="$moment(item.deadLine).isValid()">
									<span
										:class="[
											 {'danger': item.status === $store.state.TASK_STATUS_TYPE.RED},
											 {'warning': item.status === $store.state.TASK_STATUS_TYPE.YELLOW},
											 {'success': item.status === $store.state.TASK_STATUS_TYPE.GREEN}
										 ]"
									>
										<template v-if="$moment().diff($moment(item.deadLine), 'years') > 0">
											{{ item.deadLine | filterDateMonth }}
										</template>
										<template v-else>
											{{ item.deadLine | filterMonthTime }}
										</template>
									</span>
								</div>

								<div class="list-settings_comment" v-if="item.commentCount > 0">
									<div>
										<img src="/img/svg/comment.svg" alt="">
									</div>
									<span>{{ item.commentCount }}</span>
								</div>

								<div class="list-settings__action__type" v-if="item.lastCommentType">
									<span class="success" v-if="item.lastCommentType.value === $store.state.TASK_COMMENT_TYPE.SOLUTION">{{$t('solution')}}</span>
									<span class="danger" v-else-if="item.lastCommentType.value === $store.state.TASK_COMMENT_TYPE.PROBLEM">{{$t('problem')}}</span>
									<span v-else>{{$t('information')}}</span>
								</div>

								<div class="list-settings_checkbox" v-if="item.checkListCount.totalCount > 0">
									<div>
										<img src="/img/svg/checkbox.svg" alt="">
									</div>
									<span>{{ item.checkListCount.checkedCount }} - {{ item.checkListCount.totalCount }}</span>
								</div>

								<div class="list-settings__users__main" v-if="item.members.length > 0">
									<div class="list-settings__user" v-for="item2 in item.members">
										<div v-if="item2.employee.photoUrl.trim() === ''">{{ item2.employee.firstName.charAt(0) + item2.employee.lastName.charAt(0) }}</div>
										<img v-else :src="$store.state.url + item2.employee.photoUrl" alt="">
									</div>
								</div>

								<div class="list-settings__users__colors" v-if="item.tagList.length > 0">
									<div class="list-color__main">
										<div class="list-color__main__item" v-for="item2 in item.tagList" :style="{ background: item2.color }"></div>
									</div>
								</div>

							</div>
						</div>

					</transition-group>
				</draggable>



				<div class="board-item__create__list button-effect"
					 data-toggle="modal"
					 data-target="#modalCreateTask"
					 @click="$store.state.createModalTaskId = columnData.id"
					 v-if="can('TASK_CREATE')">

					<div class="board-list__icon">
						<i class="fa fa-plus"></i>
					</div>
					<span>{{$t('boardColumn.addTask')}}</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import draggable from 'vuedraggable';
	import FormService from "../../../services/FormService";
	import { required } from 'vuelidate/lib/validators'

	export default {
		name: "BoardColumn",
		components: {
			draggable,
		},
		props: {
			columnData: {
				type: Object,
				required: true,
				default: {
					tasks: []
				},
			},
			typeTrello: {
				type: Boolean,
				default: false
			},
		},
		data() {
			return {
				dragData: new FormService({
					id: 0,
					projectId: 0,
					columnId: 0,
					ordering: 0,
				}),
				columnNameEditMode: false,
				columnNameForEdit: null,
			}
		},
		validations: {
			columnNameForEdit: {
				required,
			},
		},
		created() {
        },
		methods: {
			DragableTaskMove(event) {
				let tempOrdering = 0;
				let drag = event.draggedContext;
				let drop = event.relatedContext;

				if (drop.element) {
					if (drag.element.columnId === drop.component.$attrs['data-id']) {
						tempOrdering = drag.futureIndex;
					}
					else {
						tempOrdering = event.willInsertAfter ? drop.element.ordering + 1 : drop.element.ordering;
					}
				}

				this.dragData.SetData({
					id: drag.element.id,
					projectId: drag.element.projectId,
					columnId: drop.component.$attrs['data-id'],
					ordering: tempOrdering,
				});

				// console.log(this.dragData.GetData());
			},
			DragableTaskEnd() {
				if (this.dragData.id > 0) {
					this.$api
						.post('tasks/move', this.dragData.GetData())
						.then(response => {
							this.dragData.Reset();
						});
				}

				let dragGhost = document.getElementById('dragGhost');

				dragGhost.style.display = 'none';
				dragGhost.innerHTML = '';
			},


			EditColumn() {
				this.$v.columnNameForEdit.$touch();
				if (!this.$v.columnNameForEdit.$invalid) {
					let postData = {...this.columnData};
					postData.name = this.columnNameForEdit;
					postData.codeName = this.columnNameForEdit.toUpperCase().split(' ').join('_');
					delete postData.tasks;

					this.$api
						.put('projectColumns', postData)
						.then(response => {
							this.columnNameEditMode = false;
							this.columnData.name = this.columnNameForEdit;
							this.columnNameForEdit = null;
							this.$v.columnNameForEdit.$reset();
							this.$notification.success('Изменено');
						});
				}
			},
			DeleteColumn() {
				if (confirm(this.$t('confirmDelete'))) {
					this.$api
						.delete('projectColumns/' + this.columnData.id)
						.then(response => {
							this.$notification.success(this.$t('successfullyDeleted'));
						});
				}
			},



			DragStart(event) {
				event.dataTransfer.setDragImage(event.target.cloneNode(true), 0, 0);


				let dragGhost = document.getElementById('dragGhost');

				dragGhost.appendChild(event.target.cloneNode(true));
				dragGhost.style.width = event.target.offsetWidth + 'px';
				dragGhost.style.display = 'block';
			},
			ApplyCustomDragGhost(event) {
				let dragGhost = document.getElementById('dragGhost');

				let distanceLeft = event.clientX - event.target.getBoundingClientRect().left;
				let distanceTop = event.clientY - event.target.getBoundingClientRect().top;
				ghostMove(event);

				window.ondrag = (e) => {
					if (e.clientY > 0 && e.clientX > 0) {
						ghostMove(e);
					}
				};

				function ghostMove(e) {
					dragGhost.style.top = (e.clientY - distanceTop) + 'px';
					dragGhost.style.left = (e.clientX - distanceLeft) + 'px';
				}
			},
		},

	}
</script>