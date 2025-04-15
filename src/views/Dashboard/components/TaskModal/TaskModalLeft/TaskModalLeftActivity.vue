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
					<i class="fa fa-chevron-down accordion-rotating__icon position-static"></i>
				</div>


				<div
					class="mw-submenu__main_bx"
					data-custom-accordion-body
				>
					<div class="mw-submenu__main">

						<div
							class="action__content__top"
							v-if="can(PERMISSION_TYPE.TASK_COMMENT.CREATE)"
						>
							<div
								class="mw-action__ava"
								v-if="$store.state.userProfile.employee.photoFile"
							>
								<img
									:src="$store.state.url + $store.state.userProfile.employee.photoFile.url"
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
											:class="{ 'is-invalid': $v.cCreateModel.commentText.$error }"
											v-model.trim="$v.cCreateModel.commentText.$model"
										></textarea>
									</div>

									<div class="action-save">
										<div class="d-flex align-items-center">
											<div class="form-group mb-0">
												<select
													class="form-control"
													:class="{ 'is-invalid': $v.cCreateModel.commentType.$error }"
													v-model="$v.cCreateModel.commentType.$model"
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
														v-if="cCreateModel.employeeIds.length > 0"
													>
														{{ cCreateModel.employeeIds.length }}
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
															<label class="mb-0">{{ $t('taskParticipants') }}</label>
														</div>


														<div class="d-flex flex-wrap">

															<label
																class="boardofusers__item mb-0 cur-p"
																v-for="item in storeTaskMemberList"
																:key="item.projectMember.employee.id"
																:title="item.projectMember.employee.firstName + ' ' + item.projectMember.employee.lastName"
															>
																<input
																	type="checkbox"
																	:value="item.projectMember.employee.id"
																	hidden
																	v-model="cCreateModel.employeeIds"
																>

																<div class="boardofusers-ava">
																	<img
																		v-if="item.projectMember.employee.photoFile"
																		:src="$store.state.url + item.projectMember.employee.photoFile.url"
																	>
																	<strong v-else>
																		{{ item.projectMember.employee.firstName.charAt(0) + item.projectMember.employee.lastName.charAt(0) }}
																	</strong>
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
												@click="cCreateModelReset"
											>
												{{ $t('cancel') }}
											</button>
											<button
												type="submit"
												class="modal-btn__save button-effect"
											>
												{{ $t('save') }}
											</button>
										</div>
									</div>
								</form>
							</div>
						</div>


						<ul
							class="mw-submenu mw-comment__main"
							v-if="can(PERMISSION_TYPE.TASK_COMMENT.READ)"
						>
							<li
								class="mw-action__item mw-comment__item"
								v-for="item in $store.state.taskModalData.comments"
								:key="item.id"
							>
								<div class="mw-action__ava">
									<img
										v-if="item.author.photoFile"
										:src="$store.state.url + item.author.photoFile.url"
									>
									<div
										v-else
										class="txt"
									>
										{{ item.author.firstName.charAt(0) + item.author.lastName.charAt(0) }}
									</div>
								</div>

								<div class="mw-action__content">
									<div class="mw-action__content__top align-items-center">
										<strong>
											{{ item.author.firstName }} {{ item.author.lastName }}
										</strong>
										<span>
											<template v-if="$moment().diff($moment(item.updatedAt), 'years') > 0">
												{{ item.updatedAt | filterDateMonth }}
											</template>
											<template v-else>
												{{ item.updatedAt | filterTimeMonth }}
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
											v-if="item.author.user.id === $store.state.userProfile.id"
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
											v-for="item2 in item.employees"
											:title="item2.firstName + ' ' + item2.lastName"
										>
											@{{ item2.user.userName }}
										</strong>
									</p>


									<div
										class="action__content__top__form mt-3"
										v-if="item.id === cUpdateModel.id"
									>
										<form @submit.prevent="EditComment">
											<div class="form-group">
												<textarea
													class="form-control"
													:placeholder="$t('writeAComment')"
													rows="5"
													:class="{ 'is-invalid': $v.cUpdateModel.commentText.$error }"
													v-model.trim="$v.cUpdateModel.commentText.$model"
												></textarea>
											</div>

											<div class="action-save">
												<div class="d-flex align-items-center">
													<div class="form-group mb-0">
														<select
															class="form-control"
															:class="{ 'is-invalid': $v.cUpdateModel.commentType.$error }"
															v-model="$v.cUpdateModel.commentType.$model"
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
																v-if="cUpdateModel.employeeIds.length > 0"
															>
																{{ cUpdateModel.employeeIds.length }}
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
																		v-for="item2 in storeTaskMemberList"
																		:key="item2.projectMember.employee.id"
																		:title="item2.projectMember.employee.firstName + ' ' + item2.projectMember.employee.lastName"
																	>
																		<input
																			type="checkbox"
																			:value="item2.projectMember.employee.id"
																			hidden
																			v-model="cUpdateModel.employeeIds"
																		>

																		<div class="boardofusers-ava">
																			<img
																				v-if="item2.projectMember.employee.photoFile"
																				:src="$store.state.url + item2.projectMember.employee.photoFile.url"
																			>
																			<strong v-else>
																				{{ item2.projectMember.employee.firstName.charAt(0) + item2.projectMember.employee.lastName.charAt(0) }}
																			</strong>
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
														@click="cUpdateModelReset"
													>
														{{ $t('cancel') }}
													</button>
													<button
														type="submit"
														class="modal-btn__save button-effect"
													>
														{{ $t('save') }}
													</button>
												</div>
											</div>
										</form>
									</div>
								</div>
							</li>


							<li
								class="d-flex justify-content-end mt-3"
								v-if="cParams.totalItems > cParams.pageSize"
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


						<hr v-if="can(PERMISSION_TYPE.TASK_COMMENT.READ) && can(PERMISSION_TYPE.ACTION.READ)">


						<ul
							class="mw-submenu mw-action__main"
							v-if="can(PERMISSION_TYPE.ACTION.READ)"
						>
							<li
								class="mw-action__item"
								v-for="item in $store.state.taskModalData.actions"
								:key="item.id"
							>
								<div class="mw-action__ava">
									<div
										class="txt"
										v-if="!item.employee"
									>
										UN
									</div>
									<div
										class="txt"
										v-else-if="!item.employee.photoFile"
									>
										{{ item.employee.firstName.charAt(0) + item.employee.lastName.charAt(0) }}
									</div>
									<img
										v-else
										:src="$store.state.url + item.employee.photoFile.url"
									>
								</div>

								<div class="mw-action__content__bottom">
									<strong v-if="item.employee">
										{{ item.employee.firstName }}
										{{ item.employee.lastName }}
									</strong>
									<strong v-else>
										{{ $t('unknown') }}
									</strong>

									<base-action
										:action="item"
										:clickable="false"
									></base-action>

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
								v-if="aParams.totalItems > aParams.pageSize"
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
import BaseAction from '../../../../../components/actions/base-action.vue';
import { ORDER, PERMISSION_TYPE, TASK_COMMENT_TYPE } from '../../../../../constants';
import FormService from '../../../../../services/FormService';


export default {
	name: 'TaskModalLeftActivity',
	components: {
		BaseAction,
	},
	data() {
		return {
			TASK_COMMENT_TYPE,
			PERMISSION_TYPE,
			commentClass: {
				[ TASK_COMMENT_TYPE.INFORMATION ]: '',
				[ TASK_COMMENT_TYPE.SOLUTION ]: 'success',
				[ TASK_COMMENT_TYPE.PROBLEM ]: 'danger',
			},

			cCreateModel: new FormService({
				commentText: '',
				commentType: TASK_COMMENT_TYPE.INFORMATION,
				employeeIds: [],
				taskId: this.$store.state.taskModalData.id,
			}),
			cUpdateModel: new FormService({
				commentText: '',
				commentType: '',
				employeeIds: [],
				id: 0,
			}),

			cParams: {
				pageSize: 10,
				totalItems: this.$store.state.taskModalData.commentsCount,
			},
			aParams: {
				pageSize: 10,
				totalItems: this.$store.state.taskModalData.actionsCount,
			},
		};
	},
	validations: {
		cCreateModel: {
			commentText: {
				required,
			},
			commentType: {
				required,
			},
		},
		cUpdateModel: {
			commentText: {
				required,
			},
			commentType: {
				required,
			},
		},
	},
	computed: {
		storeTaskMemberList() {
			this.cCreateModel.employeeIds = [];
			return this.$store.state.taskModalData.members;
		},
	},
	watch: {
		'$store.state.taskModalActionStarter'(val) {
			this.GetTaskActions();
		},
	},
	methods: {
		async GetTaskComments(step = 0) {
			this.cParams.pageSize += step;

			const { data: { data, meta } } = await this.$api.get('/task-comments', {
				params: {
					page: 1,
					pageSize: this.cParams.pageSize,
					sortBy: 'id',
					sortDirection: ORDER.DESC,
					projectId: this.$store.state.projectData.id,
					taskId: this.$store.state.taskModalData.id,
				}
			});

			this.$store.state.taskModalData.comments = data;
			this.cParams.totalItems = meta.totalItems;
			this.$store.state.taskModalActionStarter++;
		},
		async GetTaskActions(step = 0) {
			this.aParams.pageSize += step;

			const { data: { data, meta } } = await this.$api.get('/actions', {
				params: {
					page: 1,
					pageSize: this.aParams.pageSize,
					sortBy: 'id',
					sortDirection: ORDER.DESC,
					projectId: this.$store.state.projectData.id,
					taskId: this.$store.state.taskModalData.id,
				}
			});

			this.$store.state.taskModalData.actions = data;
			this.aParams.totalItems = meta.totalItems;
		},
		async SaveComment() {
			this.$v.cCreateModel.$touch();
			if (this.$v.cCreateModel.$invalid) {
				return;
			}

			await this.$api.post('/task-comments', this.cCreateModel.GetData());
			await this.GetTaskComments();

			this.cCreateModelReset();
			this.$notification.success(this.$t('Added'));
		},
		async EditComment() {
			this.$v.cUpdateModel.$touch();
			if (this.$v.cUpdateModel.$invalid) {
				return;
			}

			await this.$api.put('/task-comments/' + this.cUpdateModel.id, this.cUpdateModel.GetData());
			await this.GetTaskComments();

			this.cUpdateModelReset();
			this.$notification.success(this.$t('EditedBy'));
		},
		CopyObjectForEdit(obj) {
			this.cUpdateModel.commentText = obj.commentText;
			this.cUpdateModel.commentType = obj.commentType;
			this.cUpdateModel.employeeIds = obj.employees.map(a => a.id);
			this.cUpdateModel.id = obj.id;
		},
		async DeleteComment(id) {
			if (!confirm(this.$t('confirmDelete'))) {
				return;
			}

			await this.$api.delete('/task-comments/' + id);
			await this.GetTaskComments();

			this.$notification.success(this.$t('successfullyDeleted'));
		},
		cCreateModelReset() {
			this.cCreateModel.Reset();
			this.$v.cCreateModel.$reset();
		},
		cUpdateModelReset() {
			this.cUpdateModel.Reset();
			this.$v.cUpdateModel.$reset();
		},
	}
};
</script>