<template>
	<base-crud-page-list
		v-if="can(PERMISSION_TYPE.GROUP.READ)"
		:title="$tc('menu.team', 2)"
		:create-url="{ name: 'mainTeamsCreate' }"
		:create-show="can(PERMISSION_TYPE.GROUP.CREATE)"
		:footer-show="record.pageCount > 0"
	>

		<template #filter>
			<base-input-search
				class="mr-3"
				is-filter
				@update:value="HandleParams(HANDLE_PARAMS.SEARCH, $event)"
			></base-input-search>

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
							:class="{ 'active': params.sortBy === SORT_PROP.LEADER }"
							@click="HandleParams(HANDLE_PARAMS.SORT_BY, SORT_PROP.LEADER)"
						>
							<div class="az_crud_tb_th">
								<div class="txt">{{ $t('teamLeader') }}</div>

								<template v-if="params.sortBy === SORT_PROP.LEADER">
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
								can(PERMISSION_TYPE.GROUP.READ) ||
								can(PERMISSION_TYPE.GROUP.UPDATE) ||
								can(PERMISSION_TYPE.GROUP.DELETE)
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
							<div class="az_crud_tb_txt">
								{{ item.firstName }}
								{{ item.lastName }}
								{{ item.middleName }}
							</div>
						</td>

						<td>
							<div class="az_crud_tb_txt">{{ item.organization.name }}</div>
						</td>

						<td v-if="
							can(PERMISSION_TYPE.GROUP.READ) ||
							can(PERMISSION_TYPE.GROUP.UPDATE) ||
							can(PERMISSION_TYPE.GROUP.DELETE)
						">
							<div class="d-flex">
								<router-link
									class="btn az_base_btn btn-success icon mr-2"
									v-if="can(PERMISSION_TYPE.GROUP.READ)"
									:to="{ name: 'mainTeamsRead', params: { id: item.id } }"
								>
									<i class="fa fa-eye"></i>
								</router-link>

								<router-link
									class="btn az_base_btn btn-warning icon mr-2"
									v-if="can(PERMISSION_TYPE.GROUP.UPDATE)"
									:to="{ name: 'mainTeamsUpdate', params: { id: item.id } }"
								>
									<i class="fa fa-pencil"></i>
								</router-link>

								<button
									class="btn az_base_btn btn-danger icon"
									type="button"
									v-if="can(PERMISSION_TYPE.GROUP.DELETE)"
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
import { HANDLE_PARAMS, ORDER, ORDER_REVERSE, PERMISSION_TYPE } from '../../../../constants';


const SORT_PROP = {
	ID: 'id',
	NAME: 'name',
	LEADER: 'leader',
	ORGANIZATION: 'organization',
};


export default {
	name: 'TeamsList',
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
			}

			if (type !== HANDLE_PARAMS.PAGE) {
				this.params.page = 1;
			}

			await this.GetList();
		},
		async GetList() {
			const resp = await this.$api.get('/groups', {
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

			await this.$api.delete('/groups/' + id);
			await this.GetList();

			this.$notification.success(this.$t('successfullyDeleted'));
		},
	}
};
</script>