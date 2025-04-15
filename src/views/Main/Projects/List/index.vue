<template>
	<base-crud-page-list
		v-if="can(PERMISSION_TYPE.PROJECT.READ)"
		:title="$tc('menu.project', 2)"
		:create-url="{ name: 'mainProjectsCreate' }"
		:create-show="can(PERMISSION_TYPE.PROJECT.CREATE)"
		:footer-show="record.pageCount > 0"
	>

		<template #filter>
			<base-input-search
				class="mr-3"
				is-filter
				@update:value="HandleParams(HANDLE_PARAMS.SEARCH, $event)"
			></base-input-search>

			<base-input-group
				class="mr-3"
				is-filter
				:show-organization="$store.state.systemAdmin"
				@update:value="HandleParams(HANDLE_PARAMS.GROUP, $event)"
			></base-input-group>

			<base-input-manager
				class="mr-3"
				is-filter
				:show-organization="$store.state.systemAdmin"
				@update:value="HandleParams(HANDLE_PARAMS.MANAGER, $event)"
			></base-input-manager>

			<base-input-project-type
				class="mr-3"
				is-filter
				@update:value="HandleParams(HANDLE_PARAMS.PROJECT_TYPE, $event)"
			></base-input-project-type>


			<base-input-organization
				v-if="$store.state.systemAdmin"
				is-filter
				@update:value="HandleParams(HANDLE_PARAMS.ORGANIZATION, $event)"
			></base-input-organization>
		</template>


		<template #table>
			<base-crud-table>

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

						<th
							class="sort"
							:class="{ 'active': params.sortBy === SORT_PROP.NAME }"
							@click="HandleParams(HANDLE_PARAMS.SORT_BY, SORT_PROP.NAME)"
						>
							<div class="az_crud_tb_th">
								<div class="txt">{{ $t('name') }}</div>

								<template v-if="params.sortBy === SORT_PROP.NAME">
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
							:class="{ 'active': params.sortBy === SORT_PROP.GROUP }"
							@click="HandleParams(HANDLE_PARAMS.SORT_BY, SORT_PROP.GROUP)"
						>
							<div class="az_crud_tb_th">
								<div class="txt">{{ $tc('menu.team', 1) }}</div>

								<template v-if="params.sortBy === SORT_PROP.GROUP">
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
							:class="{ 'active': params.sortBy === SORT_PROP.MANAGER }"
							@click="HandleParams(HANDLE_PARAMS.SORT_BY, SORT_PROP.MANAGER)"
						>
							<div class="az_crud_tb_th">
								<div class="txt">{{ $t('manager') }}</div>

								<template v-if="params.sortBy === SORT_PROP.MANAGER">
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
							:class="{ 'active': params.sortBy === SORT_PROP.PERCENT }"
							@click="HandleParams(HANDLE_PARAMS.SORT_BY, SORT_PROP.PERCENT)"
						>
							<div class="az_crud_tb_th">
								<div class="txt">{{ $t('percent') }}</div>

								<template v-if="params.sortBy === SORT_PROP.PERCENT">
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
							:class="{ 'active': params.sortBy === SORT_PROP.PROJECT_TYPE }"
							@click="HandleParams(HANDLE_PARAMS.SORT_BY, SORT_PROP.PROJECT_TYPE)"
						>
							<div class="az_crud_tb_th">
								<div class="txt">{{ $t('projectType') }}</div>

								<template v-if="params.sortBy === SORT_PROP.PROJECT_TYPE">
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
							v-if="
								can(PERMISSION_TYPE.PROJECT.READ) ||
								can(PERMISSION_TYPE.PROJECT.UPDATE) ||
								can(PERMISSION_TYPE.PROJECT.DELETE)
							"
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
							<div class="az_crud_tb_txt">{{ item.name }}</div>
						</td>

						<td>
							<div class="az_crud_tb_txt">{{ item.group.name }}</div>
						</td>

						<td>
							<div class="az_crud_tb_txt">
								{{ item.manager.firstName }}
								{{ item.manager.lastName }}
								{{ item.manager.middleName }}
							</div>
						</td>

						<td>
							<div
								class="az_crud_tb_prgs_bx"
								v-if="item.percent >= 0"
							>
								<div class="az_crud_tb_prgs_txt">{{ item.percent }}%</div>
								<div
									class="progress az_crud_tb_prgs"
									:class="{
										'default': item.percent === 0,
										'danger': item.percent > 0,
										'warning': item.percent > 50,
										'success': item.percent > 80
									}"
								>
									<div
										class="progress-bar"
										:style="{ 'width': item.percent + '%' }"
									></div>
								</div>
							</div>
							<div
								class="az_crud_tb_txt"
								v-else
							>
								{{ $t('notAvailable') }}
							</div>
						</td>

						<td>
							<div class="az_crud_tb_txt">{{ item.projectType }}</div>
						</td>

						<td>
							<div class="az_crud_tb_txt">{{ item.organization.name }}</div>
						</td>

						<td v-if="
							can(PERMISSION_TYPE.PROJECT.READ) ||
							can(PERMISSION_TYPE.PROJECT.UPDATE) ||
							can(PERMISSION_TYPE.PROJECT.DELETE)
						">
							<div class="d-flex">
								<router-link
									class="btn az_base_btn btn-primary icon mr-2"
									v-if="can(PERMISSION_TYPE.PROJECT.READ)"
									:to="{ name: 'dashboard', params: { id: item.id } }"
								>
									<i class="fa fa-external-link"></i>
								</router-link>

								<router-link
									class="btn az_base_btn btn-success icon mr-2"
									v-if="can(PERMISSION_TYPE.PROJECT.READ)"
									:to="{ name: 'mainProjectsRead', params: { id: item.id } }"
								>
									<i class="fa fa-eye"></i>
								</router-link>

								<router-link
									class="btn az_base_btn btn-warning icon mr-2"
									v-if="can(PERMISSION_TYPE.PROJECT.UPDATE)"
									:to="{ name: 'mainProjectsUpdate', params: { id: item.id } }"
								>
									<i class="fa fa-pencil"></i>
								</router-link>

								<button
									class="btn az_base_btn btn-danger icon"
									type="button"
									v-if="can(PERMISSION_TYPE.PROJECT.DELETE)"
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
import BaseInputGroup from '../../../../components/BaseInputGroup';
import BaseInputManager from '../../../../components/BaseInputManager';
import BaseInputOrganization from '../../../../components/BaseInputOrganization';
import BaseInputProjectType from '../../../../components/BaseInputProjectType';
import BaseInputSearch from '../../../../components/BaseInputSearch';
import { HANDLE_PARAMS, ORDER, ORDER_REVERSE, PERMISSION_TYPE } from '../../../../constants';


const SORT_PROP = {
	ID: 'id',
	NAME: 'name',
	BACKGROUND: 'background',
	PROJECT_TYPE: 'projectType',
	GROUP: 'group',
	MANAGER: 'manager',
	ORGANIZATION: 'organization',
	PERCENT: 'percent',
};


export default {
	name: 'ProjectsList',
	components: {
		BaseInputProjectType,
		BaseInputManager,
		BaseInputGroup,
		BaseInputOrganization,
		BaseCrudRange,
		BaseInputSearch,
		BaseCrudTable,
		BaseCrudPageList,
		Paginate,
	},
	data() {
		return {
			PERMISSION_TYPE,
			ORDER,
			HANDLE_PARAMS,
			SORT_PROP,
			params: {
				page: 1,
				pageSize: 20,
				sortBy: SORT_PROP.ID,
				sortDirection: ORDER.DESC,
				allSearch: null,
				groupId: null,
				managerId: null,
				projectType: null,
				organizationId: null,
			},
			record: {
				list: [],
				pageCount: 0,
			},
		};
	},
	async created() {
		await this.GetList();
	},
	methods: {
		async HandleParams(type, val) {
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

				case HANDLE_PARAMS.GROUP:
					this.params.groupId = val || null;
					break;

				case HANDLE_PARAMS.MANAGER:
					this.params.managerId = val || null;
					break;

				case HANDLE_PARAMS.PROJECT_TYPE:
					this.params.projectType = val || null;
					break;
			}

			if (type !== HANDLE_PARAMS.PAGE) {
				this.params.page = 1;
			}

			await this.GetList();
		},
		async GetList() {
			const resp = await this.$api.get('/projects', {
				params: this.params,
			});

			const data = resp.data.data;
			const { totalItems, totalPages } = resp.data.meta;
			const { page, pageSize, sortBy, sortDirection } = this.params;

			data.forEach((item, index) => {
				if (sortBy === SORT_PROP.ID && sortDirection === ORDER.DESC) {
					item.rowNumber = (totalItems - (page - 1) * pageSize) - index;
				}
				else {
					item.rowNumber = ((page - 1) * pageSize + 1) + index;
				}
			});

			this.record.list = data;
			this.record.pageCount = totalPages;
		},
		async Delete(id) {
			if (!confirm(this.$t('confirmDelete'))) {
				return;
			}

			await this.$api.delete('/projects/' + id);
			await this.GetList();

			this.$notification.success(this.$t('successfullyDeleted'));
		},
	}
};
</script>