<template>
	<div class="mw-menu__item mw-menu__copy custom-dropdown__main" data-custom-drop>
		<a href="#" data-custom-drop-btn>
			<div class="mw-menu__item__icon">
				<i class="fa fa-clone"></i>
			</div>
			<span>{{$t('copy')}}</span>
		</a>


		<div class="custom-dropdown right top w300" data-custom-drop-body>
			<div class="member-all__top">
				<h3>{{$t('copyCard')}}</h3>
			</div>


			<div class="menu-copy__content">
				<div class="menu-copy__inner mw-menu__copy__form">

					<div class="form-group">
						<label>{{$t('name')}}</label>
						<textarea class="form-control"
								  :class="{'is-invalid': $v.taskCopyName.$error}"
								  v-model="taskCopyName"
								  :placeholder="$t('newName')"
						></textarea>
					</div>


					<div class="form-group">
						<label class="mb-2">{{$t('copyTo')}}</label>
						<div class="dropdown copy-dropdown">
							<button type="button" data-toggle="dropdown" :class="{'invalid': $v.selectedProject.$error}">
								<p>{{ $tc('menu.project', 1) }}</p>
								<span class="d-block text-truncate" v-if="selectedProject">{{ selectedProject.name }}</span>
								<span v-else>{{$t('choose')}}</span>
							</button>


							<div class="dropdown-menu">
								<template v-if="$store.state.projectSelectionList.length > 0">
									<a class="dropdown-item"
									   href="#"
									   v-for="item in $store.state.projectSelectionList"
									   :key="item.id"
									   @click.prevent="selectedProject = item"
									>
										{{ item.name }}
									</a>
								</template>
								<div class="px-2 text-nowrap" v-else>{{$t('noList')}}</div>
							</div>
						</div>
					</div>


					<div class="form-group">
						<div class="dropdown copy-dropdown">
							<button type="button" data-toggle="dropdown" :class="{'invalid': $v.selectedColumn.$error}">
								<p>{{$t('column')}}</p>

								<span class="d-block text-truncate" v-if="selectedColumn">
									<template v-if="selectedColumn.projectType.value === $store.state.PROJECT_TYPE_KANBAN">
										{{ $t(selectedColumn.codeName) }}
									</template>
									<template v-else>{{ selectedColumn.name }}</template>
								</span>

								<span v-else>{{$t('choose')}}</span>
							</button>


							<div class="dropdown-menu">
								<template v-if="columnList.length > 0">
									<a class="dropdown-item"
									   href="#"
									   v-for="item in columnList"
									   :key="item.id"
									   @click.prevent="selectedColumn = item"
									>
										<template v-if="item.projectType.value === $store.state.PROJECT_TYPE_KANBAN">
											{{ $t(item.codeName) }}
										</template>
										<template v-else>{{ item.name }}</template>
									</a>
								</template>
								<div class="px-2 text-nowrap" v-else>{{$t('noList')}}</div>
							</div>
						</div>
					</div>


					<div class="form-group">
						<div class="dropdown copy-dropdown">
							<button type="button" data-toggle="dropdown">
								<p>{{$t('position')}}</p>
								<span v-if="selectedTask">{{ selectedTask.ordering + 1 }}</span>
								<span v-else>{{$t('choose')}}</span>
							</button>


							<div class="dropdown-menu">
								<template v-if="taskList.length > 0">
									<a class="dropdown-item"
									   href="#"
									   v-for="item in taskList"
									   :key="item.id"
									   @click.prevent="selectedTask = item"
									>
										{{ item.ordering + 1 }}
									</a>
								</template>
								<div class="px-2 text-nowrap" v-else>{{$t('noList')}}</div>
							</div>
						</div>
					</div>


					<div class="d-flex justify-content-end">
						<button type="button" class="create-card button-effect m-0" @click="TaskChange">{{$t('copy')}}</button>
					</div>

				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { required } from 'vuelidate/lib/validators';


	export default {
		name: 'TaskModalRightMove',
		data()
		{
			return {
				taskCopyName: null,

				selectedProject: null,
				selectedColumn: null,
				selectedTask: null,

				columnList: [],
				taskList: [],
			};
		},
		validations: {
			taskCopyName: {
				required,
			},
			selectedProject: {
				required,
			},
			selectedColumn: {
				required,
			},
		},
		watch: {
			'selectedProject'(val)
			{
				this.columnList = [];
				this.selectedColumn = null;

				if (val)
				{
					this.$api
						.get('projectColumns/selection', {
							params: {
								projectId: val.id,
							}
						})
						.then(response => {
							this.columnList = response.data.data;
						});
				}
			},
			'selectedColumn'(val)
			{
				this.taskList = [];
				this.selectedTask = null;

				if (val)
				{
					this.$api
						.get('tasks', {
							params: {
								projectId: this.selectedProject.id,
								columnId: val.id,
								sortBy: 'ordering',
								sortDirection: 'asc',
							}
						})
						.then(response => {
							this.taskList = response.data.data;
						});
				}
			},
		},
		methods: {
			TaskChange()
			{
				this.$v.$touch();
				if (this.$v.$invalid)
				{
					return;
				}


				this.$api
					.post('tasks/copy', {
						id: this.$store.state.taskModalData.id,
						name: this.taskCopyName,
						projectId: this.selectedProject.id,
						columnId: this.selectedColumn.id,
						ordering: this.selectedTask ? this.selectedTask.ordering : 0,
						withCheckLists: true,
					})
					.then(response => {
						this.$v.$reset();
						this.taskCopyName = null;
						this.selectedProject = null;
						this.$notification.success(this.$t('SuccessfullyCreated'));
					});
			}
		},
	};
</script>