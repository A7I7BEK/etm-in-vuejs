<template>
	<form @submit.prevent="submit">

		<div class="az_base_form_gr">
			<label class="az_base_lbl">{{ $t('name') }}</label>
			<input
				class="form-control az_base_inp"
				type="text"
				:class="{ 'is-invalid': $v.model.name.$error }"
				v-model.trim="$v.model.name.$model"
			>
		</div>


		<base-input-organization
			class="az_base_form_gr"
			v-if="!edit && $store.state.systemAdmin"
			:input-class="{ 'is-invalid': $v.model.organizationId.$error }"
			:value.sync="$v.model.organizationId.$model"
		></base-input-organization>


		<div class="az_base_form_gr">
			<label class="az_base_lbl">{{ $tc('menu.user', 2) }}</label>
			<div class="az_team_form_tb_bx">
				<div class="az_team_form_tb">
					<base-input-search
						label-class="d-none"
						:value="params.allSearch"
						@update:value="handleParams(HANDLE_PARAMS.SEARCH, $event)"
					></base-input-search>


					<base-crud-table table-class="w-100">

						<template #head>
							<tr>
								<th class="width-50">
									<div class="custom-control custom-checkbox az_base_custom_chk">
										<input
											class="custom-control-input"
											id="teamCheckAll"
											type="checkbox"
											v-model="checkboxAllChecked"
											@change="toggleCheckboxAll($event.target.checked)"
										>
										<label
											class="custom-control-label"
											for="teamCheckAll"
										></label>
									</div>
								</th>

								<th class="width-75">{{ $t('photo') }}</th>

								<th>{{ $t('fullName') }}</th>

								<th>{{ $tc('menu.role', 2) }}</th>
							</tr>
						</template>


						<template
							#body
							v-if="record.list.length > 0"
						>
							<tr
								class="az_team_form_tb_tr_chk"
								v-for="(item, index) in record.list"
							>
								<td>
									<div class="custom-control custom-checkbox az_base_custom_chk">
										<input
											class="custom-control-input"
											type="checkbox"
											:id="'teamCheckOne' + index"
											:value="{
												id: item.id,
												firstName: item.firstName,
												lastName: item.lastName,
												middleName: item.middleName
											}"
											v-model="$v.model.employeeIds.$model"
										>
										<label
											class="custom-control-label"
											:for="'teamCheckOne' + index"
										></label>
									</div>
								</td>

								<td>
									<div class="az_crud_tb_pic">
										<img
											v-if="item.photoFile"
											:src="$store.state.url + item.photoFile.url"
										>
										<i
											class="fa fa-user"
											v-else
										></i>
									</div>
								</td>

								<td>
									<div class="az_crud_tb_txt">
										{{ item.firstName }}
										{{ item.lastName }}
										{{ item.middleName }}
									</div>
								</td>

								<td>
									<div
										class="az_crud_tb_txt"
										v-if="item.user.roles && item.user.roles.length > 0"
									>
										{{item.user.roles.map(x => x.name).join(', ')}}
									</div>
									<div
										class="az_crud_tb_sts danger text-nowrap"
										v-else
									>
										{{ $t('roleAbsent') }}
									</div>
								</td>
							</tr>
						</template>

					</base-crud-table>


					<div
						class="d-flex justify-content-center mt-3"
						v-if="record.pageCount > 0"
					>
						<paginate
							container-class="pagination az_base_pag"
							page-class="page-item"
							prev-class="page-item"
							next-class="page-item"
							page-link-class="page-link"
							prev-link-class="page-link"
							next-link-class="page-link"
							prev-text="&laquo;"
							next-text="&raquo;"
							:page-count="record.pageCount"
							:value="params.page"
							@input="handleParams(HANDLE_PARAMS.PAGE, $event)"
						></paginate>
					</div>
				</div>
			</div>
		</div>


		<div class="az_base_form_gr">
			<label class="az_base_lbl">{{ $t('selectedUsers') }}</label>
			<div class="az_team_form_user_bx">
				<div
					class="az_team_form_user"
					:class="{ 'is-invalid': $v.model.employeeIds.$error }"
				>
					<div
						class="az_team_form_user_badge"
						v-for="(item, index) in model.employeeIds"
					>
						<div class="txt">{{ item.firstName }} {{ item.lastName }} {{ item.middleName }}</div>

						<button
							class="btn az_base_btn btn-danger cls"
							type="button"
							@click="removeSelectedUser(index)"
						>
							<i class="fa fa-close"></i>
						</button>
					</div>
				</div>

				<div class="d-flex justify-content-end mt-3">
					<button
						class="btn az_base_btn btn-danger"
						type="button"
						@click="clearSelectedUser"
					>{{ $t('clear') }}</button>
				</div>
			</div>
		</div>


		<div class="az_base_form_gr">
			<label class="az_base_lbl">{{ $t('teamLeader') }}</label>
			<select
				class="form-control az_base_inp"
				:class="{ 'is-invalid': $v.model.leaderId.$error }"
				v-model="$v.model.leaderId.$model"
			>
				<option :value="0">{{ $t('select') }}</option>

				<option
					v-for="item in model.employeeIds"
					:value="item.id"
				>
					{{ item.firstName }} {{ item.lastName }} {{ item.middleName }}
				</option>
			</select>
		</div>


		<button
			class="btn az_base_btn btn-primary"
			type="submit"
		>
			<i class="fa fa-save mr-1"></i>
			{{ $t('save') }}
		</button>

	</form>
</template>

<script>
import Paginate from 'vuejs-paginate';
import { required } from 'vuelidate/lib/validators';
import BaseCrudTable from '../../../../components/BaseCrudTable';
import BaseInputOrganization from '../../../../components/BaseInputOrganization';
import BaseInputSearch from '../../../../components/BaseInputSearch';
import { HANDLE_PARAMS, ORDER } from '../../../../constants';


const notZero = (value) => +value !== 0;


export default {
	name: 'TheForm',
	components: {
		BaseInputSearch,
		BaseCrudTable,
		BaseInputOrganization,
		Paginate,
	},
	props: {
		model: {
			type: Object,
			required: true,
		},
		edit: {
			type: Boolean,
			default: false,
		},
	},
	data() {
		return {
			ORDER,
			HANDLE_PARAMS,
			params: {
				page: 1,
				pageSize: 20,
				sortBy: 'id',
				sortDirection: ORDER.DESC,
				allSearch: null,
				organizationId: null,
			},
			record: {
				list: [],
				pageCount: 0,
			},
			checkboxAllChecked: false,
		};
	},
	validations() {
		let options = {
			model: {
				name: {
					required,
				},
				employeeIds: {
					required,
				},
				leaderId: {
					notZero,
				},
			}
		};


		if (!this.edit && this.$store.state.systemAdmin) {
			options.model.organizationId = {
				notZero,
			};
		}

		return options;
	},
	watch: {
		'model.organizationId'(val) {
			if (this.$store.state.systemAdmin) {
				if (!this.edit) {
					this.model.employeeIds = [];
					this.params.allSearch = null;
				}

				this.handleParams(HANDLE_PARAMS.ORGANIZATION, val);
			}
		},
		'model.employeeIds'(val) {
			this.model.leaderId = 0;
			this.trackCheckboxAll();
		},
		'record.list'(val) {
			this.trackCheckboxAll();
		},
	},
	mounted() {
		if (!this.$store.state.systemAdmin) {
			this.handleParams();
		}

		document.addEventListener('click', this.toggleCheckboxOne);
	},
	destroyed() {
		document.removeEventListener('click', this.toggleCheckboxOne);
	},
	methods: {
		submit() {
			this.$v.$touch();
			if (this.$v.$invalid) {
				return;
			}

			this.$emit('emit:submit');
		},
		handleParams(type, val) {
			switch (type) {
				case HANDLE_PARAMS.PAGE:
					this.params.page = val;
					break;

				case HANDLE_PARAMS.SEARCH:
					this.params.allSearch = val || null;
					break;

				case HANDLE_PARAMS.ORGANIZATION:
					this.params.organizationId = val || null;
					break;
			}

			if (type !== HANDLE_PARAMS.PAGE) {
				this.params.page = 1;
			}

			this.getUserAll();
		},
		getUserAll() {
			this.$api
				.get('/employees', {
					params: this.params,
				})
				.then(response => {
					this.record.list = response.data.data;
					this.record.pageCount = response.data.meta.totalPages;
				});
		},
		toggleCheckboxOne(e) {
			let elem = e.target.closest('.az_team_form_tb_tr_chk');
			if (elem) {
				elem.querySelector('.az_base_custom_chk input').click();
			}
		},
		toggleCheckboxAll(checked) {
			let data = this.record.list.map(item => {
				return {
					id: item.id,
					firstName: item.firstName,
					lastName: item.lastName,
					middleName: item.middleName
				};
			});


			if (checked) {
				const difference = data.filter(a => !this.model.employeeIds.some(b => a.id === b.id));
				this.model.employeeIds.push(...difference);
			}
			else {
				this.model.employeeIds = this.model.employeeIds.filter(a => !data.some(b => a.id === b.id));
			}
		},
		trackCheckboxAll() {
			this.checkboxAllChecked = this.record.list.every(a => this.model.employeeIds.some(b => a.id === b.id));
		},
		removeSelectedUser(index) {
			this.model.employeeIds.splice(index, 1);
		},
		clearSelectedUser() {
			this.model.employeeIds = [];
		},
	}
};
</script>