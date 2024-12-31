<template>
	<div class="mw-menu__item custom-dropdown__main" data-custom-drop>
		<a href="#" data-custom-drop-btn>
			<div class="mw-menu__item__icon">
				<i class="fa fa-bookmark" aria-hidden="true"></i>
			</div>
			<span>{{$t('tags')}}</span>
		</a>

		<div class="custom-dropdown right w350" data-custom-drop-body>
			<div class="member-all__top">
				<h3>{{$t('addTags')}}</h3>
			</div>


			<div class="az_label_drop">

				<div v-show="tagViewMode">
					<ul class="az_label_ls us-n mb-3">

						<li v-for="item in projectTagList" :key="item.id">
							<div class="az_label_side_left">
								<template v-if="projectTagId === item.id">
									<form @submit.prevent="EditProjectTag(item)">
										<input type="text" class="form-control dn_text_area" v-model="projectTagName">
									</form>
								</template>

								<template v-else>
									<label class="az_label" :style="{ background: item.color }">
										<div class="az_label_txt">{{ item.name }}</div>
										<div class="az_label_tick">
											<input type="checkbox" hidden v-model="item.checked" @change="ProjectTagToggle(item)">
											<img src="/img/svg/check.svg" alt="">
										</div>
									</label>
								</template>
							</div>


							<div class="az_label_side_right">
								<div class="d-flex" v-if="projectTagId === item.id">
									<button type="button" class="btn btn-sm az_r_menu_ttl_btn" @click="EditProjectTag(item)">
										<b class="fa fa-check"></b>
									</button>
									<button type="button" class="btn btn-sm az_r_menu_ttl_btn" @click="projectTagId = 0">
										<b class="fa fa-close"></b>
									</button>
								</div>
								<div class="d-flex" v-else>
									<button type="button" class="btn btn-sm az_r_menu_ttl_btn" @click="projectTagId = item.id; projectTagName = item.name">
										<b class="fa fa-pencil"></b>
									</button>
									<button type="button" class="btn btn-sm az_r_menu_ttl_btn" @click="DeleteProjectTag(item.id)">
										<b class="fa fa-trash-o"></b>
									</button>
								</div>
							</div>
						</li>

					</ul>

					<button type="button"
							class="btn az_base_btn btn-default btn-block"
							@click="tagViewMode = false"
					>{{ $t('createLabel') }}
					</button>
				</div>

				<div v-show="!tagViewMode">
					<div class="mb-3">
						<label class="az_label_lbl">{{$t('name')}}</label>
						<input type="text" class="form-control dn_text_area az_label_inp" v-model="model.name">
					</div>


					<div class="mb-4">
						<label class="az_label_lbl">{{$t('color')}}</label>
						<div class="tags-checkbox__inner">
							<div class="mw-tags__item"
								 v-for="item in $store.state.colorList"
								 :style="{ background: item }"
							>
								<label class="tag-item__check">
									<input type="radio" hidden :value="item" v-model="model.color">
									<div class="tag-check__icon"></div>
								</label>
							</div>
						</div>
					</div>


					<div class="d-flex justify-content-between">
						<button type="button"
								class="btn az_base_btn btn-default"
								@click="tagViewMode = true; model.Reset()"
						>
							{{ $t('cancel') }}
						</button>

						<button type="button"
								class="btn az_base_btn btn-primary"
								@click="CreateProjectTag"
						>
							{{ $t('create') }}
						</button>
					</div>
				</div>

			</div>
		</div>

	</div>
</template>

<script>
	import FormService from '../../../../../services/FormService';


	export default {
		name: 'TaskModalRightLabel',
		data()
		{
			return {
				projectTagList: [],
				projectTagId: 0,
				projectTagName: '',

				tagViewMode: true,
				model: new FormService({
					name: '',
					color: '#7d97c7',
					projectId: this.$store.state.taskModalData.projectId,
				}),
			};
		},
		created()
		{
			this.GetProjectTagAll();
		},
		methods: {
			GetProjectTagAll()
			{
				this.$api
					.get('projectTags', {
						params: {
							projectId: this.$store.state.taskModalData.projectId,
							sortBy: 'id',
							sortDirection: 'asc',
						}
					})
					.then(response => {
						this.projectTagList = response.data.data.map(item => {
							if (this.$store.state.taskModalData.tags.findIndex(x => x.projectTagId === item.id) < 0)
							{
								return { ...item, 'checked': false };
							}
							return { ...item, 'checked': true };
						});
					});
			},
			CreateProjectTag()
			{
				this.$api
					.post('projectTags', this.model.GetData())
					.then(response => {
						this.GetProjectTagAll();
						this.tagViewMode = true;
						this.$notification.success(this.$t('SuccessfullyCreated'));
						this.model.Reset();
					});
			},
			EditProjectTag(item)
			{
				let postData = { ...item };
				postData.name = this.projectTagName;
				this.$api
					.put('projectTags/' + postData.id, postData)
					.then(response => {
						this.projectTagId = 0;
						this.GetTaskTagAll();
						this.GetProjectTagAll();
						this.$notification.success(this.$t('SuccessfullyChanged'));
					});
			},
			DeleteProjectTag(id)
			{
				if (confirm(this.$t('confirmDelete')))
				{
					this.$api
						.delete('projectTags/' + id)
						.then(response => {
							this.GetTaskTagAll();
							this.GetProjectTagAll();
							this.$notification.success(this.$t('successfullyDeleted'));
						});
				}
			},

			ProjectTagToggle(item)
			{
				if (item.checked)
				{
					this.AddTaskTag(item.id);
				}
				else
				{
					this.DeleteTaskTag(item.id);
				}
			},

			GetTaskTagAll()
			{
				this.$api
					.get('taskTags', {
						params: {
							taskId: this.$store.state.taskModalData.id,
						}
					})
					.then(response => {
						this.$store.state.taskModalData.tags = response.data.data;
						this.$store.state.taskModalActionStarter++;
					});
			},
			AddTaskTag(id)
			{
				this.$api
					.post('taskTags', {
						projectTagId: id,
						taskId: this.$store.state.taskModalData.id
					})
					.then(response => {
						this.GetTaskTagAll();
					});
			},
			DeleteTaskTag(id)
			{
				this.$api
					.delete('taskTags', {
						data: {
							projectTagId: id,
							taskId: this.$store.state.taskModalData.id
						}
					})
					.then(response => {
						this.GetTaskTagAll();
					});
			},
		}
	};
</script>