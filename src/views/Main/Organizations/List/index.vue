<template>
	<base-crud-page-list
		v-if="$store.state.systemAdmin"
		:title="$tc('menu.organization', 2)"
		:create-url="{ name: 'mainOrganizationsCreate' }"
		:footer-show="record.pageCount > 0"
	>

		<template #filter>
			<base-input-search
				is-filter
				@update:value="HandleParams(HANDLE_PARAMS.SEARCH, $event)"
			></base-input-search>
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
							@click="HandleParams(HANDLE_PARAMS.SORT_BY, SORT_PROP.NAME)"
							:class="{ 'active': params.sortBy === SORT_PROP.NAME }"
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
							@click="HandleParams(HANDLE_PARAMS.SORT_BY, SORT_PROP.EMAIL)"
							:class="{ 'active': params.sortBy === SORT_PROP.EMAIL }"
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

						<th class="width-50">
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
							<div class="az_crud_tb_txt">{{ item.email }}</div>
						</td>

						<td>
							<div class="d-flex">
								<router-link
									class="btn az_base_btn btn-success icon mr-2"
									:to="{ name: 'mainOrganizationsRead', params: { id: item.id } }"
								>
									<i class="fa fa-eye"></i>
								</router-link>

								<router-link
									class="btn az_base_btn btn-warning icon mr-2"
									:to="{ name: 'mainOrganizationsUpdate', params: { id: item.id } }"
								>
									<i class="fa fa-pencil"></i>
								</router-link>

								<button
									class="btn az_base_btn btn-danger icon"
									type="button"
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
import BaseInputSearch from '../../../../components/BaseInputSearch';
import { HANDLE_PARAMS, ORDER, ORDER_REVERSE, PERMISSION_TYPE } from '../../../../constants';


const SORT_PROP = {
	ID: 'id',
	NAME: 'name',
	EMAIL: 'email',
};


export default {
	name: 'OrganizationsList',
	components: {
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
			}

			if (type !== HANDLE_PARAMS.PAGE) {
				this.params.page = 1;
			}

			this.GetList();
		},
		GetList() {
			this.$api
				.get('/organizations', {
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
					.delete('/organizations/' + id)
					.then(response => {
						this.$notification.success(this.$t('successfullyDeleted'));
						this.GetList();
					});
			}
		},
	}
};
</script>