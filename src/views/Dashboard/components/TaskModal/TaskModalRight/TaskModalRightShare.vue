<template>
	<div
		class="mw-menu__item mw-menu__checklist custom-dropdown__main"
		data-custom-drop
	>
		<a
			href="#"
			data-custom-drop-btn
		>
			<div class="mw-menu__item__icon">
				<i class="fa fa-share-alt"></i>
			</div>
			<span>{{ $t('share') }}</span>
		</a>


		<div
			class="custom-dropdown right w300"
			data-custom-drop-body
		>
			<div class="member-invite__top">
				<h3>{{ $t('share') }}</h3>
			</div>


			<div class="member-invite__content">

				<div class="form-group us-n">
					<div class="custom-control custom-checkbox az_task_share_custom_chk">
						<input
							class="custom-control-input"
							id="checkboxEmail"
							type="checkbox"
							:class="{ 'is-invalid': $v.checkbox.email.$error }"
							v-model="checkbox.email"
						>
						<label
							class="custom-control-label"
							style="padding-top: 2px;"
							for="checkboxEmail"
						>{{ $t('shareViaEmail') }}</label>
					</div>

					<div class="custom-control custom-checkbox az_task_share_custom_chk">
						<input
							class="custom-control-input"
							id="checkboxTelegram"
							type="checkbox"
							:class="{ 'is-invalid': $v.checkbox.telegram.$error }"
							v-model="checkbox.telegram"
						>
						<label
							class="custom-control-label"
							style="padding-top: 2px;"
							for="checkboxTelegram"
						>{{ $t('shareViaTelegram') }}</label>
					</div>
				</div>


				<div class="form-group">
					<label>{{ $t('searchEmployeeName') }}</label>
					<input
						class="form-control"
						type="text"
						v-model="employeeSearch"
						:placeholder="$t('search')"
					>
				</div>

				<div
					class="form-group"
					v-if="employeeList"
				>
					<ul
						class="az_mem_inv_ls us-n"
						v-if="employeeList.length > 0"
					>

						<li
							v-for="item in employeeList"
							:class="{ 'active': item.checked }"
							@click="ToggleEmployee(item)"
						>
							<div class="az_mem_inv">
								<div class="az_mem_inv_img">
									<img
										v-if="item.photoUrl"
										:src="$store.state.url + item.photoUrl"
									>
									<b v-else>{{ item.firstName.charAt(0) + item.lastName.charAt(0) }}</b>
								</div>

								<div class="az_mem_inv_txt">
									<div class="az_mem_inv_fname">{{ item.firstName + ' ' + item.lastName }}</div>
									<div class="az_mem_inv_uname">{{ item.user.userName }}</div>
								</div>
							</div>
						</li>

					</ul>
					<div v-else>{{ $t('workerFound') }}</div>
				</div>

				<div
					class="justify-content-end mt-3"
					style="display: flex;"
					v-show="employeeSelectedList.length > 0"
				>
					<button
						type="button"
						class="member-invite-btn button-effect"
						@click="Share"
					>{{ $t('share') }}</button>
				</div>

			</div>
		</div>

	</div>
</template>

<script>
const mustBeTrue = (value) => typeof value === 'boolean' && value;


export default {
	name: 'TaskModalRightShare',
	data() {
		return {
			checkbox: {
				email: false,
				telegram: false,
			},

			employeeSearch: null,
			employeeList: null,
			employeeSelectedList: [],
			employeeListTimerId: 0,
		};
	},
	validations() {
		if (this.checkbox.email || this.checkbox.telegram) {
			return {
				checkbox: {
					email: {},
					telegram: {},
				},
			};
		}
		else {
			return {
				checkbox: {
					email: {
						mustBeTrue
					},
					telegram: {
						mustBeTrue
					},
				},
			};
		}
	},
	watch: {
		'employeeSearch'(val) {
			this.employeeList = null;
			this.employeeSelectedList = [];

			clearTimeout(this.employeeListTimerId);
			if (val && val.trim()) {
				this.employeeListTimerId = setTimeout(() => {
					this.$api
						.get('/employees', {
							params: {
								allSearch: val,
							}
						})
						.then(response => {
							this.employeeList = response.data.data.map(item => ({ ...item, 'checked': false }));
						});
				}, 500);
			}
		},
	},
	methods: {
		async Share() {
			this.$v.$touch();
			if (this.$v.$invalid) {
				return;
			}


			let postData = {
				taskId: this.$store.state.taskModalData.id,
				userIds: this.employeeSelectedList,
			};

			if (this.checkbox.telegram) {
				await this.ShareTelegram(postData);
			}
			if (this.checkbox.email) {
				await this.ShareEmail(postData);
			}


			this.$notification.success(this.$t('SuccessfullySent'));

			this.checkbox.email = false;
			this.checkbox.telegram = false;
			this.$v.$reset();
			this.employeeSearch = null;
			this.employeeList = null;
			this.employeeSelectedList = [];
		},
		ShareEmail(postData) {
			return this.$api
				.post('task/share/email', postData)
				.then(response => {
					// console.log('ShareEmail', response.data);
				});
		},
		ShareTelegram(postData) {
			return this.$api
				.post('task/share/telegram', postData)
				.then(response => {
					// console.log('ShareTelegram', response.data);
				});
		},
		ToggleEmployee(item) {
			item.checked = !item.checked;

			if (item.checked) {
				this.employeeSelectedList.push(item.id);
			}
			else {
				this.employeeSelectedList = this.employeeSelectedList.filter(x => x !== item.id);
			}
		},
	}
};
</script>