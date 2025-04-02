<template>
	<div class="mw-checklist">
		<div class="mw-checklist__top">
			<div class="mw-checklist__title">
				<div class="mw-checklist__icon">
					<i
						class="fa fa-check-square"
						aria-hidden="true"
					></i>
				</div>
				<h3>{{ $t('checkList') }} - {{ checkListData.name }}</h3>
			</div>

			<div class="mw-checklist__edit us-n">
				<div
					class="mw-checklist__edit__inner mw-checklist__hide"
					@click="checkedItemToggle = !checkedItemToggle"
				>
					<span v-if="checkedItemToggle">{{ $t('hideSelected') }}</span>
					<span v-else>{{ $t('showTagged') }} ({{ computedUncheckData.checkedCount }})</span>

					<div class="mw-checklist__edit__icon">
						<i
							class="fa fa-eye-slash"
							v-if="checkedItemToggle"
						></i>
						<i
							class="fa fa-eye"
							v-else
						></i>
					</div>
				</div>

				<div
					class="ml-3 mw-checklist__edit__inner mw-checklist__delete"
					@click="DeleteGroup(checkListData.id)"
					v-if="can('TASK_UPDATE') && can('CHECKLIST_GROUP_DELETE')"
				>
					<span>{{ $t('delete') }}</span>
					<div class="mw-checklist__edit__icon">
						<i
							class="fa fa-trash"
							aria-hidden="true"
						></i>
					</div>
				</div>
			</div>
		</div>


		<div class="mw-checklist__content">
			<div class="mw-checklist__progressbar">
				<div>
					<span>{{ checkListData.percent }}%</span>
				</div>

				<div class="mw-checklist__progressbar__main">
					<div class="erj-progress">
						<div
							class="progress-value"
							:style="{ 'width': checkListData.percent + '%' }"
						></div>
					</div>
				</div>
			</div>


			<div v-if="can('TASK_CHECK_READ')">
				<template v-if="checkedItemToggle">
					<div
						class="mw-checklist__item"
						v-for="item in checkListData.checkList"
						:key="item.id"
					>
						<div class="mw-checklist__item__inner">
							<label class="form-check-label us-n cur-p">
								<input
									type="checkbox"
									hidden
									v-model="item.checked"
									@change="Update(item)"
									:disabled="!can('TASK_UPDATE') || !can('TASK_CHECK_UPDATE')"
								>
								<div class="checklist-icon"></div>
								<p>
									{{ item.text }}
									<strong
										v-for="item2 in item.members"
										:title="item2.employee.firstName + ' ' + item2.employee.lastName"
									>
										@{{ item2.employee.userName }}
									</strong>
								</p>
							</label>
						</div>

						<div
							class="mw-checkbox__item__edit dropdown"
							v-if="can('TASK_UPDATE') && can('TASK_CHECK_DELETE')"
						>
							<button
								type="button"
								class="dropdown-toggle"
								data-toggle="dropdown"
							>
								<span>
									<i class="fa fa-ellipsis-v"></i>
								</span>
							</button>

							<div class="dropdown-menu">
								<a
									class="dropdown-item"
									href="#"
									@click.prevent="Delete(item.id)"
								>{{ $t('delete') }}</a>
							</div>
						</div>
					</div>
				</template>


				<template v-else>
					<div
						class="mw-checklist__item"
						v-for="item in computedUncheckData.uncheckedList"
						:key="item.id"
					>
						<div class="mw-checklist__item__inner">
							<label class="form-check-label us-n cur-p">
								<input
									type="checkbox"
									hidden
									v-model="item.checked"
									@change="Update(item)"
									:disabled="!can('TASK_UPDATE') || !can('TASK_CHECK_UPDATE')"
								>
								<div class="checklist-icon"></div>
								<p>
									{{ item.text }}
									<strong
										v-for="item2 in item.members"
										:title="item2.employee.firstName + ' ' + item2.employee.lastName"
									>
										@{{ item2.employee.userName }}
									</strong>
								</p>
							</label>
						</div>

						<div
							class="mw-checkbox__item__edit dropdown"
							v-if="can('TASK_UPDATE') && can('TASK_CHECK_DELETE')"
						>
							<button
								type="button"
								class="dropdown-toggle"
								data-toggle="dropdown"
							>
								<span>
									<i class="fa fa-ellipsis-v"></i>
								</span>
							</button>

							<div class="dropdown-menu">
								<a
									class="dropdown-item"
									href="#"
									@click.prevent="Delete(item.id)"
								>{{ $t('delete') }}</a>
							</div>
						</div>
					</div>
				</template>
			</div>


			<form
				@submit.prevent="Create"
				v-if="can('TASK_UPDATE') && can('TASK_CHECK_CREATE')"
			>
				<div class="form-group mw-checklist__bottom__input">
					<input
						type="text"
						class="form-control"
						:placeholder="$t('addElement')"
						v-model.trim="checkboxName"
						:class="{ 'is-invalid': $v.checkboxName.$error }"
					>


					<div class="mw-checklist__bottom">
						<div
							class="member-invite custom-dropdown__main us-n m-0 mt-3"
							data-custom-drop
						>
							<div
								class="mw-checklist__findUser button-effect mt-0 d-flex align-items-center"
								data-custom-drop-btn
							>
								@{{ $t('workers') }} <strong
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
												<img
													v-if="item.employee.photoFile"
													:src="$store.state.url + item.employee.photoFile.url"
												>
												<strong v-else>
													{{ item.employee.firstName.charAt(0) + item.employee.lastName.charAt(0) }}
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


						<div class="checklist__bottom__right">
							<button
								type="button"
								class="checklist__bottom__close button-effect"
								@click="ClearData"
							>{{ $t('cancel') }}</button>
							<button
								type="submit"
								class="checklist__bottom__save button-effect"
							>{{ $t('save') }}</button>
						</div>
					</div>
				</div>
			</form>
		</div>
	</div>
</template>

<script>
import { required } from 'vuelidate/lib/validators';


export default {
	name: "TaskModalLeftChecklist",
	props: {
		checkListDataProp: {
			type: Object,
			required: true,
			default: {
				checkList: []
			},
		}
	},
	data() {
		return {
			checkListData: this.checkListDataProp,
			employeeListChecked: [],

			checkboxName: null,
			checkedItemToggle: true,
		};
	},
	validations: {
		checkboxName: {
			required,
		},
	},
	computed: {
		storeTaskMemberList() {
			this.employeeListChecked = [];
			return this.$store.state.taskModalData.members;
		},
		computedUncheckData() {
			let uncheckedList = this.checkListData.checkList.filter(item => (!item.checked));

			return {
				'uncheckedList': uncheckedList,
				'checkedCount': this.checkListData.checkList.length - uncheckedList.length,
			};
		},
	},
	created() {
	},
	methods: {
		GetChecklistGroupOne() {
			this.$api
				.get('/check-list-groups/' + this.checkListData.id)
				.then(response => {
					this.checkListData = response.data.data;
					this.$store.state.taskModalActionStarter++;
				});
		},
		Create() {
			this.$v.$touch();
			if (!this.$v.$invalid) {

				let userIdList = [];
				if (this.employeeListChecked.length > 0) {
					userIdList = this.employeeListChecked.map(x => ({ id: x }));
				}


				this.$api
					.post('/check-list-items', {
						'checkListGroupId': this.checkListData.id,
						'checked': false,
						'members': userIdList,
						'text': this.checkboxName,
					})
					.then(response => {
						this.GetChecklistGroupOne();
						this.ClearData();
						this.$notification.success(this.$t('Added'));
					});
			}
		},
		Update(item) {
			this.$api
				.put('/check-list-items/' + item.id, {
					'checkListGroupId': item.checkListGroupId,
					'checked': item.checked,
					'text': item.text,
				})
				.then(response => {
					this.GetChecklistGroupOne();
				});
		},
		Delete(id) {
			if (confirm(this.$t('confirmDelete'))) {
				this.$api
					.delete('/check-list-items/' + id)
					.then(response => {
						this.GetChecklistGroupOne();
						this.$notification.success(this.$t('successfullyDeleted'));
					});
			}
		},
		ClearData() {
			this.checkboxName = null;
			this.employeeListChecked = [];
			this.$v.$reset();
		},



		GetChecklistGroupAll() {
			this.$api
				.get('/check-list-groups', {
					params: {
						'sortBy': 'id',
						'taskId': this.checkListData.taskId,
					}
				})
				.then(response => {
					this.$store.state.taskModalData.checkListGroups = response.data.data;
				});
		},
		DeleteGroup(id) {
			if (confirm(this.$t('confirmDelete'))) {
				this.$api
					.delete('/check-list-groups/' + id)
					.then(response => {
						this.GetChecklistGroupAll();
						this.$store.state.taskModalActionStarter++;
						this.$notification.success(this.$t('successfullyDeleted'));
					});
			}
		},
	}
};
</script>