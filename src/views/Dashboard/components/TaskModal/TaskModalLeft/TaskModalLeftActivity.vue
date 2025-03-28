<template>
	<div class="mw-actions">
		<div class="mw-actions__home">

			<div
				class="mw-accordion"
				data-custom-accordion
			>
				<div
					class="link px-0 d-flex align-items-center justify-content-between"
					data-custom-accordion-btn
				>
					<div>
						<i class="fa fa-list-ul accordion-icon"></i>
						{{ $t('actionsAndComments') }}
					</div>
					<i class="fa fa-chevron-up accordion-rotating__icon position-static"></i>
				</div>


				<div
					class="mw-submenu__main_bx"
					style="display: none;"
					data-custom-accordion-body
				>
					<div class="mw-submenu__main">

						<div
							class="action__content__top"
							v-if="can('TASK_UPDATE') && can('TASK_COMMENT_CREATE')"
						>
							<div
								class="mw-action__ava"
								v-if="$store.state.userProfile.photoUrl"
							>
								<img
									:src="$store.state.url + $store.state.userProfile.photoUrl"
									alt=""
								>
							</div>

							<div class="action__content__top__form">
								<form @submit.prevent="SaveComment">
									<div class="form-group">
										<textarea
											class="form-control"
											:placeholder="$t('writeAComment')"
											rows="5"
											v-model.trim="commentText"
											:class="{ 'is-invalid': $v.commentText.$error }"
										></textarea>
									</div>

									<div class="action-save">
										<div class="d-flex align-items-center">
											<div class="form-group mb-0">
												<select
													class="form-control"
													v-model="commentTypeSelectedId"
												>
													<option
														v-for="[ key, value ] in Object.entries(TASK_COMMENT_TYPE)"
														:key="key"
														:value="value"
													>
														{{ $t(`TASK_COMMENT_TYPE.${value}`) }}
													</option>
												</select>
											</div>

											<div
												class="member-invite custom-dropdown__main us-n"
												data-custom-drop
											>
												<div
													class="mw-checklist__findUser button-effect mt-0 d-flex align-items-center"
													data-custom-drop-btn
												>
													@{{ $t('workers') }}<strong
														class="num"
														v-if="employeeListChecked.length > 0"
													>{{ employeeListChecked.length }}</strong>
												</div>


												<div
													class="custom-dropdown"
													data-custom-drop-body
												>
													<div class="member-invite__top">
														<h3>{{ $t('tagSomeone') }}:</h3>
													</div>

													<div class="member-invite__content">
														<div class="form-group">
															<label class="mb-0">{{ $t('taskParticipants') }}</label>
														</div>


														<div class="d-flex flex-wrap">

															<label
																class="boardofusers__item mb-0 cur-p"
																v-for="item in storeTaskMemberList"
																:key="item.employee.id"
																:title="item.employee.firstName + ' ' + item.employee.lastName"
															>
																<input
																	type="checkbox"
																	:value="item.employee.id"
																	hidden
																	v-model="employeeListChecked"
																>

																<div class="boardofusers-ava">
																	<strong v-if="item.employee.photoUrl.trim() === ''">
																		{{ item.employee.firstName.charAt(0) + item.employee.lastName.charAt(0) }}
																	</strong>
																	<img
																		v-else
																		:src="$store.state.url + item.employee.photoUrl"
																	>
																</div>

																<div class="user-checkbox__main">
																	<div class="boardofusers__checkbox"></div>
																</div>
															</label>

														</div>
													</div>
												</div>
											</div>
										</div>


										<div class="d-flex">
											<button
												type="button"
												class="modal-btn__save cancel button-effect mr-3"
												@click="ClearSaveData"
											>{{ $t('cancel') }}</button>
											<button
												type="submit"
												class="modal-btn__save button-effect"
											>{{ $t('save') }}</button>
										</div>
									</div>
								</form>
							</div>
						</div>


						<ul
							class="mw-submenu mw-comment__main"
							v-if="can('TASK_COMMENT_READ')"
						>
							<li
								class="mw-action__item mw-comment__item"
								v-for="item in $store.state.taskModalData.comments"
								:key="item.id"
							>
								<div class="mw-action__ava">
									<div
										class="txt"
										v-if="item.photoUrl.trim() === ''"
									>
										{{ item.firstName.charAt(0) + item.lastName.charAt(0) }}
									</div>
									<img
										v-else
										:src="$store.state.url + item.photoUrl"
										alt=""
									>
								</div>

								<div class="mw-action__content">
									<div class="mw-action__content__top align-items-center">
										<strong>{{ item.firstName }} {{ item.lastName }}</strong>
										<span>
											<template v-if="$moment().diff($moment(item.createdAt), 'years') > 0">
												{{ item.createdAt | filterDateMonth }}
											</template>
											<template v-else>
												{{ item.createdAt | filterTimeMonth }}
											</template>
										</span>
										<span
											class="mw-action__type"
											:class="commentClass[ item.commentType ]"
										>
											{{ $t(`TASK_COMMENT_TYPE.${item.commentType}`) }}
										</span>

										<div
											class="d-flex"
											v-if="item.userId === $store.state.userProfile.id"
										>
											<button
												type="button"
												class="btn btn-sm az_r_menu_ttl_btn"
												@click="CopyObjectForEdit(item)"
											>
												<b class="fa fa-pencil"></b>
											</button>

											<button
												type="button"
												class="btn btn-sm az_r_menu_ttl_btn"
												@click="DeleteComment(item.id)"
											>
												<b class="fa fa-trash-o"></b>
											</button>
										</div>
									</div>

									<p class="mw-action__content__comment">
										{{ item.commentText }}
										<strong
											v-for="item2 in item.members"
											:title="item2.employee.firstName + ' ' + item2.employee.lastName"
										>
											@{{ item2.employee.userName }}
										</strong>
									</p>


									<div
										class="action__content__top__form mt-3"
										v-if="item.id === commentEditModal.id"
									>
										<form @submit.prevent="EditComment">
											<div class="form-group">
												<textarea
													class="form-control"
													:placeholder="$t('writeAComment')"
													rows="5"
													v-model.trim="commentEditModal.text"
													:class="{ 'is-invalid': $v.commentEditModal.text.$error }"
												></textarea>
											</div>

											<div class="action-save">
												<div class="d-flex align-items-center">
													<div class="form-group mb-0">
														<select
															class="form-control"
															v-model="commentEditModal.typeId"
														>
															<option
																v-for="[ key, value ] in Object.entries(TASK_COMMENT_TYPE)"
																:key="key"
																:value="value"
															>
																{{ $t(`TASK_COMMENT_TYPE.${value}`) }}
															</option>
														</select>
													</div>

													<div
														class="member-invite custom-dropdown__main us-n"
														data-custom-drop
													>
														<div
															class="mw-checklist__findUser button-effect mt-0 d-flex align-items-center"
															data-custom-drop-btn
														>
															@{{ $t('workers') }}
															<strong
																class="num"
																v-if="commentEditModal.employee.length > 0"
															>
																{{ commentEditModal.employee.length }}
															</strong>
														</div>


														<div
															class="custom-dropdown"
															data-custom-drop-body
														>
															<div class="member-invite__top">
																<h3>{{ $t('tagSomeone') }}:</h3>
															</div>

															<div class="member-invite__content">
																<div class="form-group">
																	<label
																		class="mb-0">{{ $t('taskParticipants') }}</label>
																</div>


																<div class="d-flex flex-wrap">

																	<label
																		class="boardofusers__item mb-0 cur-p"
																		v-for="item in storeTaskMemberList"
																		:key="item.employee.id"
																		:title="item.employee.firstName + ' ' + item.employee.lastName"
																	>
																		<input
																			type="checkbox"
																			:value="item.employee.id"
																			hidden
																			v-model="commentEditModal.employee"
																		>

																		<div class="boardofusers-ava">
																			<strong
																				v-if="item.employee.photoUrl.trim() === ''"
																			>
																				{{ item.employee.firstName.charAt(0) + item.employee.lastName.charAt(0) }}
																			</strong>
																			<img
																				v-else
																				:src="$store.state.url + item.employee.photoUrl"
																			>
																		</div>

																		<div class="user-checkbox__main">
																			<div class="boardofusers__checkbox"></div>
																		</div>
																	</label>

																</div>
															</div>
														</div>
													</div>
												</div>


												<div class="d-flex">
													<button
														type="button"
														class="modal-btn__save cancel button-effect mr-3"
														@click="ClearEditData"
													>{{ $t('cancel') }}
													</button>
													<button
														type="submit"
														class="modal-btn__save button-effect"
													>{{ $t('save') }}</button>
												</div>
											</div>
										</form>
									</div>
								</div>
							</li>


							<li
								class="d-flex justify-content-end mt-3"
								v-if="paramsComment.totalCount > paramsComment.pageSize"
							>
								<button
									type="button"
									class="btn az_base_btn btn-default btn-block"
									style="color: #495E75;"
									@click="GetTaskComments(10)"
								>
									{{ $t('more') }}
								</button>
							</li>
						</ul>


						<hr v-if="can('TASK_COMMENT_READ') && can('TASK_ACTION_READ')">


						<ul
							class="mw-submenu mw-action__main"
							v-if="can('TASK_ACTION_READ')"
						>
							<li
								class="mw-action__item"
								v-for="item in $store.state.taskModalData.actions"
								:key="item.id"
							>
								<div class="mw-action__ava">
									<div
										class="txt"
										v-if="item.photoUrl.trim() === ''"
									>
										{{ item.firstName.charAt(0) + item.lastName.charAt(0) }}
									</div>
									<img
										v-else
										:src="$store.state.url + item.photoUrl"
										alt=""
									>
								</div>

								<div class="mw-action__content__bottom">
									<strong>{{ item.firstName }} {{ item.lastName }}</strong>
									<action-item
										:action="item"
										:clickable="false"
									></action-item>
									<br>
									<span>
										<template v-if="$moment().diff($moment(item.createdAt), 'years') > 0">
											{{ item.createdAt | filterDateMonth }}
										</template>
										<template v-else>
											{{ item.createdAt | filterTimeMonth }}
										</template>
									</span>
								</div>
							</li>

							<li
								class="d-flex justify-content-end mt-3"
								v-if="paramsAction.totalCount > paramsAction.pageSize"
							>
								<button
									type="button"
									class="btn az_base_btn btn-default btn-block"
									style="color: #495E75;"
									@click="GetTaskActions(10)"
								>
									{{ $t('more') }}
								</button>
							</li>
						</ul>

					</div>
				</div>
			</div>

		</div>
	</div>
</template>

<script>
import { required } from 'vuelidate/lib/validators';
import { ORDER, TASK_COMMENT_TYPE } from '../../../../../constants';
import ActionItem from '../../ActionItem';


export default {
	name: 'TaskModalLeftActivity',
	components: {
		ActionItem,
	},
	data() {
		return {
			TASK_COMMENT_TYPE,
			commentClass: {
				[ TASK_COMMENT_TYPE.INFORMATION ]: '',
				[ TASK_COMMENT_TYPE.SOLUTION ]: 'success',
				[ TASK_COMMENT_TYPE.PROBLEM ]: 'danger',
			},
			commentTypeSelectedId: 0,
			commentText: null,
			employeeListChecked: [],


			commentEditModal: {
				id: 0,
				typeId: 0,
				text: null,
				employee: [],
			},

			paramsComment: {
				pageSize: 10,
				totalCount: 0,
			},
			paramsAction: {
				pageSize: 10,
				totalCount: 0,
			},
		};
	},
	validations: {
		commentText: {
			required,
		},
		commentEditModal: {
			text: {
				required,
			}
		}
	},
	computed: {
		storeTaskMemberList() {
			this.employeeListChecked = [];
			return this.$store.state.taskModalData.members;
		},
	},
	watch: {
		'$store.state.taskModalActionStarter'(val) {
			this.GetTaskActions();
		},
	},
	created() {
		this.CommentTypeSelect();

		this.paramsComment.totalCount = this.$store.state.taskModalData.commentsCount;
		this.paramsAction.totalCount = this.$store.state.taskModalData.actionsCount;
	},
	methods: {
		CommentTypeSelect() {
			this.commentTypeSelectedId = this.$store.state.projectData.taskCommentTypes.find(x => x.value === this.$store.state.TASK_COMMENT_TYPE.INFORMATION).id;
		},
		SaveComment() {
			this.$v.commentText.$touch();
			if (!this.$v.commentText.$invalid) {

				let userIdList = [];
				if (this.employeeListChecked.length > 0) {
					userIdList = this.employeeListChecked.map(x => ({ id: x }));
				}

				this.$api
					.post('/task-comments', {
						'commentText': this.commentText,
						'commentType': {
							'id': this.commentTypeSelectedId
						},
						'members': userIdList,
						'taskId': this.$store.state.taskModalData.id
					})
					.then(response => {
						this.GetTaskComments();
						this.ClearSaveData();
						this.$notification.success(this.$t('Added'));
					});
			}
		},
		EditComment() {
			this.$v.commentEditModal.$touch();
			if (!this.$v.commentEditModal.$invalid) {

				let userIdList = [];
				if (this.commentEditModal.employee.length > 0) {
					userIdList = this.commentEditModal.employee.map(x => ({ id: x }));
				}

				this.$api
					.put('/task-comments/' + this.commentEditModal.id, {
						'commentText': this.commentEditModal.text,
						'commentType': {
							'id': this.commentEditModal.typeId
						},
						'members': userIdList,
					})
					.then(response => {
						this.GetTaskComments();
						this.ClearEditData();
						this.$notification.success(this.$t('EditedBy'));
					});
			}
		},
		CopyObjectForEdit(obj) {
			this.commentEditModal.id = obj.id;
			this.commentEditModal.typeId = obj.commentType.id;
			this.commentEditModal.text = obj.commentText;
			this.commentEditModal.employee = obj.members.map(x => x.employee.id);
		},
		ClearSaveData() {
			this.commentText = null;
			this.$v.commentText.$reset();
			this.CommentTypeSelect();
			this.employeeListChecked = [];
		},
		ClearEditData() {
			this.commentEditModal.id = 0;
			this.$v.commentEditModal.$reset();
		},
		DeleteComment(id) {
			if (confirm(this.$t('confirmDelete'))) {
				this.$api
					.delete('/task-comments/' + id)
					.then(response => {
						this.GetTaskComments();
						this.$notification.success(this.$t('successfullyDeleted'));
					});
			}
		},



		GetTaskComments(step = 0) {
			this.paramsComment.pageSize += step;

			this.$api
				.get('/task-comments', {
					params: {
						'taskId': this.$store.state.taskModalData.id,
						'pageSize': this.paramsComment.pageSize,
						'page': 0,
						'sortBy': 'id',
						'sortDirection': ORDER.DESC,
					}
				})
				.then(response => {
					this.$store.state.taskModalData.comments = response.data.data;
					this.paramsComment.totalCount = response.data.totalCount;
					this.$store.state.taskModalActionStarter++;
				});
		},
		GetTaskActions(step = 0) {
			this.paramsAction.pageSize += step;

			this.$api
				.get('/actions', {
					params: {
						'taskId': this.$store.state.taskModalData.id,
						'pageSize': this.paramsAction.pageSize,
						'page': 0,
						'sortBy': 'id',
						'sortDirection': ORDER.DESC,
					}
				})
				.then(response => {
					this.$store.state.taskModalData.actions = response.data.data;
					this.paramsAction.totalCount = response.data.totalCount;
				});
		},
	}
};
</script>