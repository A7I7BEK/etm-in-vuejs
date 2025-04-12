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
								v-for="item in record.list"
								:key="item.id"
								@click="toggleCheckboxOne(item)"
							>
								<td>
									<div class="custom-control custom-checkbox az_base_custom_chk">
										<input
											class="custom-control-input"
											type="checkbox"
											:id="'teamCheckOne' + item.id"
											:checked="isSelected(item)"
										>
										<label
											class="custom-control-label"
											:for="'teamCheckOne' + item.id"
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
						<div class="txt">
							{{ item.firstName }}
							{{ item.lastName }}
							{{ item.middleName }}
						</div>

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
					>
						{{ $t('clear') }}
					</button>
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
					{{ item.firstName }}
					{{ item.lastName }}
					{{ item.middleName }}
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
	},
	mounted() {
		if (!this.$store.state.systemAdmin) {
			this.handleParams();
		}
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
		async getUserAll() {
			const { data: { data, meta } } = await this.$api.get('/employees', {
				params: this.params,
			});

			this.record.list = data;
			this.record.pageCount = meta.totalPages;
			this.trackCheckboxAll();
		},
		isSelected(item) {
			return this.model.employeeIds.some(a => a.id === item.id);
		},
		toggleCheckboxOne(item) {
			let foundIndex = this.model.employeeIds.findIndex(a => a.id === item.id);

			if (foundIndex > -1) {
				this.model.employeeIds.splice(foundIndex, 1);
			}
			else {
				this.model.employeeIds.unshift(item);
			}
		},
		toggleCheckboxAll(checked) {
			if (checked) {
				const noneSelected = this.record.list
					.filter(a => !this.model.employeeIds.some(b => a.id === b.id));

				this.model.employeeIds.push(...noneSelected);
			}
			else {
				const pastSelected = this.model.employeeIds
					.filter(a => !this.record.list.some(b => a.id === b.id));

				this.model.employeeIds = pastSelected;
			}
		},
		trackCheckboxAll() {
			this.checkboxAllChecked = this.record.list
				.every(a => this.model.employeeIds.some(b => a.id === b.id));
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