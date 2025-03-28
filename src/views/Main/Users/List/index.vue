<template>
	<base-crud-page-list
		v-if="can('EMPLOYEE_READ')"
		:title="$tc('menu.user', 2)"
		:create-url="{ name: 'mainUsersCreate' }"
		:create-show="can('EMPLOYEE_CREATE') && can('USER_ATTACH_ROLE')"
		:footer-show="record.pageCount > 0"
	>

		<template #filter>
			<base-input-search
				class="mr-3"
				is-filter
				@update:value="HandleParams(HANDLE_PARAMS.SEARCH, $event)"
			></base-input-search>

			<base-input-organization
				v-if="$store.state.userProfile.systemAdmin"
				is-filter
				@update:value="HandleParams(HANDLE_PARAMS.ORGANIZATION, $event)"
			></base-input-organization>
		</template>


		<template #table>
			<base-crud-table table-class="miw-900">

				<template #head>
					<tr>
						<th
							class="width-75 sort"
							:class="{ 'active': params.sortBy === SORT_PROP.ID }"
							@click="HandleParams(HANDLE_PARAMS.SORT_BY, SORT_PROP.ID)"
						>
							<div class="az_crud_tb_th">
								<div class="txt">#</div>

								<template v-if="params.sortBy === SORT_PROP.ID">
									<i
										class="fa fa-angle-up"
										v-if="params.sortDirection === ORDER.ASC"
									></i>
									<i
										class="fa fa-angle-down"
										v-else
									></i>
								</template>
							</div>
						</th>

						<th class="width-75">{{ $t('photo') }}</th>

						<th
							class="sort"
							:class="{ 'active': params.sortBy === SORT_PROP.FIRST_NAME }"
							@click="HandleParams(HANDLE_PARAMS.SORT_BY, SORT_PROP.FIRST_NAME)"
						>
							<div class="az_crud_tb_th">
								<div class="txt">{{ $t('fullName') }}</div>

								<template v-if="params.sortBy === SORT_PROP.FIRST_NAME">
									<i
										class="fa fa-angle-up"
										v-if="params.sortDirection === ORDER.ASC"
									></i>
									<i
										class="fa fa-angle-down"
										v-else
									></i>
								</template>
							</div>
						</th>

						<th
							class="sort"
							:class="{ 'active': params.sortBy === SORT_PROP.USER_NAME }"
							@click="HandleParams(HANDLE_PARAMS.SORT_BY, SORT_PROP.USER_NAME)"
						>
							<div class="az_crud_tb_th">
								<div class="txt">{{ $t('userName') }}</div>

								<template v-if="params.sortBy === SORT_PROP.USER_NAME">
									<i
										class="fa fa-angle-up"
										v-if="params.sortDirection === ORDER.ASC"
									></i>
									<i
										class="fa fa-angle-down"
										v-else
									></i>
								</template>
							</div>
						</th>

						<th
							class="sort"
							:class="{ 'active': params.sortBy === SORT_PROP.EMAIL }"
							@click="HandleParams(HANDLE_PARAMS.SORT_BY, SORT_PROP.EMAIL)"
						>
							<div class="az_crud_tb_th">
								<div class="txt">{{ $t('email') }}</div>

								<template v-if="params.sortBy === SORT_PROP.EMAIL">
									<i
										class="fa fa-angle-up"
										v-if="params.sortDirection === ORDER.ASC"
									></i>
									<i
										class="fa fa-angle-down"
										v-else
									></i>
								</template>
							</div>
						</th>

						<th>{{ $tc('menu.role', 2) }}</th>

						<th
							class="sort"
							:class="{ 'active': params.sortBy === SORT_PROP.ORGANIZATION }"
							@click="HandleParams(HANDLE_PARAMS.SORT_BY, SORT_PROP.ORGANIZATION)"
						>
							<div class="az_crud_tb_th">
								<div class="txt">{{ $tc('menu.organization', 1) }}</div>

								<template v-if="params.sortBy === SORT_PROP.ORGANIZATION">
									<i
										class="fa fa-angle-up"
										v-if="params.sortDirection === ORDER.ASC"
									></i>
									<i
										class="fa fa-angle-down"
										v-else
									></i>
								</template>
							</div>
						</th>

						<th
							class="width-50"
							v-if="can('EMPLOYEE_READ')
								|| (can('EMPLOYEE_UPDATE') && can('USER_ATTACH_ROLE'))
								|| can('EMPLOYEE_DELETE')
								|| can('EMPLOYEE_PASSWORD_CHANGE')"
						>
							{{ $t('actions') }}
						</th>
					</tr>
				</template>


				<template
					#body
					v-if="record.list.length > 0"
				>
					<tr v-for="item in record.list">
						<td>
							<div class="az_crud_tb_txt">
								{{ item.rowNumber }}
							</div>
						</td>

						<td>
							<div class="az_crud_tb_pic">
								<img
									v-if="item.photoUrl"
									:src="$store.state.url + item.photoUrl"
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
							<div class="az_crud_tb_txt">{{ item.user.userName }}</div>
						</td>

						<td>
							<div class="az_crud_tb_txt">{{ item.user.email }}</div>
						</td>

						<td>
							<div
								class="az_crud_tb_txt"
								v-if="item.user.roles.length > 0"
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

						<td>
							<div class="az_crud_tb_txt">
								{{ item.user.organization.name }}
							</div>
						</td>

						<td v-if="can('EMPLOYEE_READ')
							|| (can('EMPLOYEE_UPDATE') && can('USER_ATTACH_ROLE'))
							|| can('EMPLOYEE_DELETE')
							|| can('EMPLOYEE_PASSWORD_CHANGE')">
							<div class="d-flex">
								<router-link
									class="btn az_base_btn btn-default icon mr-2"
									v-if="can('EMPLOYEE_PASSWORD_CHANGE')"
									:to="{ name: 'mainUsersPasswordReset', params: { id: item.id } }"
								>
									<i class="fa fa-unlock"></i>
								</router-link>

								<router-link
									class="btn az_base_btn btn-success icon mr-2"
									v-if="can('EMPLOYEE_READ')"
									:to="{ name: 'mainUsersRead', params: { id: item.id } }"
								>
									<i class="fa fa-eye"></i>
								</router-link>

								<router-link
									class="btn az_base_btn btn-warning icon mr-2"
									v-if="can('EMPLOYEE_UPDATE') && can('USER_ATTACH_ROLE')"
									:to="{ name: 'mainUsersUpdate', params: { id: item.id } }"
								>
									<i class="fa fa-pencil"></i>
								</router-link>

								<button
									class="btn az_base_btn btn-danger icon"
									type="button"
									v-if="can('EMPLOYEE_DELETE')"
									@click="Delete(item.id)"
								>
									<i class="fa fa-trash-o"></i>
								</button>
							</div>
						</td>
					</tr>
				</template>

			</base-crud-table>
		</template>


		<template #range>
			<base-crud-range
				:value="params.pageSize"
				@input="HandleParams(HANDLE_PARAMS.PAGE_SIZE, $event)"
			></base-crud-range>
		</template>


		<template #pagination>
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
				@input="HandleParams(HANDLE_PARAMS.PAGE, $event)"
			></paginate>
		</template>

	</base-crud-page-list>
</template>

<script>
import Paginate from 'vuejs-paginate';
import BaseCrudPageList from '../../../../components/BaseCrudPageList';
import BaseCrudRange from '../../../../components/BaseCrudRange';
import BaseCrudTable from '../../../../components/BaseCrudTable';
import BaseInputOrganization from '../../../../components/BaseInputOrganization';
import BaseInputSearch from '../../../../components/BaseInputSearch';
import { HANDLE_PARAMS, ORDER, ORDER_REVERSE } from '../../../../constants';


const SORT_PROP = {
	ID: 'id',
	FIRST_NAME: 'firstName',
	LAST_NAME: 'lastName',
	MIDDLE_NAME: 'middleName',
	BIRTH_DATE: 'birthDate',

	USER_NAME: 'userName',
	EMAIL: 'email',
	PHONE_NUMBER: 'phoneNumber',
	LANGUAGE: 'language',
	ORGANIZATION: 'organization',
};


export default {
	name: 'UsersList',
	components: {
		BaseInputOrganization,
		Paginate,
		BaseCrudRange,
		BaseInputSearch,
		BaseCrudTable,
		BaseCrudPageList,
	},
	data() {
		return {
			ORDER,
			HANDLE_PARAMS,
			SORT_PROP,
			params: {
				page: 1,
				pageSize: 20,
				sortBy: SORT_PROP.ID,
				sortDirection: ORDER.DESC,
				allSearch: null,
				organizationId: null,
			},
			record: {
				list: [],
				pageCount: 0,
			},
		};
	},
	created() {
		this.GetList();
	},
	methods: {
		HandleParams(type, val) {
			switch (type) {
				case HANDLE_PARAMS.PAGE:
					this.params.page = val;
					break;

				case HANDLE_PARAMS.PAGE_SIZE:
					this.params.pageSize = val;
					break;

				case HANDLE_PARAMS.SEARCH:
					this.params.allSearch = val || null;
					break;

				case HANDLE_PARAMS.SORT_BY:
					if (this.params.sortBy === val) {
						this.params.sortDirection = ORDER_REVERSE[ this.params.sortDirection ];
					}
					this.params.sortBy = val;
					break;

				case HANDLE_PARAMS.ORGANIZATION:
					this.params.organizationId = val || null;
					break;
			}

			if (type !== HANDLE_PARAMS.PAGE) {
				this.params.page = 1;
			}

			this.GetList();
		},
		GetList() {
			this.$api
				.get('/employees', {
					params: this.params,
				})
				.then(response => {
					const { totalItems } = response.data.meta;
					const { page, pageSize, sortBy, sortDirection } = this.params;

					response.data.data.forEach((item, index) => {
						if (sortBy === SORT_PROP.ID && sortDirection === ORDER.DESC) {
							item.rowNumber = (totalItems - (page - 1) * pageSize) - index;
						}
						else {
							item.rowNumber = ((page - 1) * pageSize + 1) + index;
						}
					});

					this.record.list = response.data.data;
					this.record.pageCount = response.data.meta.totalPages;
				});
		},
		Delete(id) {
			if (confirm(this.$t('confirmDelete'))) {
				this.$api
					.delete('/employees/' + id)
					.then(response => {
						this.$notification.success(this.$t('successfullyDeleted'));
						this.GetList();
					});
			}
		},
	}
};
</script>