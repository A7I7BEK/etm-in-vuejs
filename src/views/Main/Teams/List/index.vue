<template>
	<base-crud-page-list
			v-if="can('GROUP_READ')"
			:title="$tc('menu.team', 2)"
			:create-url="{ name: 'mainTeamsCreate' }"
			:create-show="can('GROUP_CREATE')"
			:footer-show="record.pageCount > 0"
	>

		<template #filter>
			<base-input-search
					class="mr-3"
					is-filter
					@update:value="HandleParams('search', $event)"
			></base-input-search>

			<base-input-organization
					v-if="$store.state.userProfile.systemAdmin"
					is-filter
					@update:value="HandleParams('organization', $event)"
			></base-input-organization>
		</template>


		<template #table>
			<base-crud-table>

				<template #head>
					<tr>
						<th class="width-75 sort" @click="HandleParams('sort', 'id')" :class="{'active': params.sortBy === 'id'}">
							<div class="az_crud_tb_th">
								<div class="txt">#</div>

								<template v-if="params.sortBy === 'id'">
									<i class="fa fa-angle-up" v-if="params.sortDirection === ORDER.ASC"></i>
									<i class="fa fa-angle-down" v-else></i>
								</template>
							</div>
						</th>

						<th class="sort" @click="HandleParams('sort', 'name')" :class="{'active': params.sortBy === 'name'}">
							<div class="az_crud_tb_th">
								<div class="txt">{{ $t('name') }}</div>

								<template v-if="params.sortBy === 'name'">
									<i class="fa fa-angle-up" v-if="params.sortDirection === ORDER.ASC"></i>
									<i class="fa fa-angle-down" v-else></i>
								</template>
							</div>
						</th>

						<th class="sort"
							v-if="$store.state.userProfile.systemAdmin"
							@click="HandleParams('sort', 'organizationId')"
							:class="{'active': params.sortBy === 'organizationId'}"
						>
							<div class="az_crud_tb_th">
								<div class="txt">{{ $tc('menu.organization', 1) }}</div>

								<template v-if="params.sortBy === 'organizationId'">
									<i class="fa fa-angle-up" v-if="params.sortDirection === ORDER.ASC"></i>
									<i class="fa fa-angle-down" v-else></i>
								</template>
							</div>
						</th>

						<th class="width-50"
							v-if="can('GROUP_READ')
							|| can('GROUP_UPDATE')
							|| can('GROUP_DELETE')"
						>
							{{ $t('actions') }}
						</th>
					</tr>
				</template>


				<template #body v-if="record.list.length > 0">
					<tr v-for="(item, index) in record.list">
						<td>
							<div class="az_crud_tb_txt" v-if="params.sortBy === 'id' && params.sortDirection === ORDER.DESC">
								{{ record.count - (params.page * params.pageSize) - index }}
							</div>
							<div class="az_crud_tb_txt" v-else>
								{{ (params.page * params.pageSize) + (index + 1) }}
							</div>
						</td>

						<td>
							<div class="az_crud_tb_txt">{{ item.name }}</div>
						</td>

						<td v-if="$store.state.userProfile.systemAdmin">
							<div class="az_crud_tb_txt">{{ item.organizationName }}</div>
						</td>

						<td v-if="can('GROUP_READ') || can('GROUP_UPDATE') || can('GROUP_DELETE')">
							<div class="d-flex">
								<router-link class="btn az_base_btn btn-success icon mr-2"
											 v-if="can('GROUP_READ')"
											 :to="{ name: 'mainTeamsRead', params: { id: item.id } }">
									<i class="fa fa-eye"></i>
								</router-link>

								<router-link class="btn az_base_btn btn-warning icon mr-2"
											 v-if="can('GROUP_UPDATE')"
											 :to="{ name: 'mainTeamsUpdate', params: { id: item.id } }">
									<i class="fa fa-pencil"></i>
								</router-link>

								<button class="btn az_base_btn btn-danger icon"
										type="button"
										v-if="can('GROUP_DELETE')"
										@click="Delete(item.id)">
									<i class="fa fa-trash-o"></i>
								</button>
							</div>
						</td>
					</tr>
				</template>

			</base-crud-table>
		</template>


		<template #range>
			<base-crud-range :value="params.pageSize" @input="HandleParams('range', $event)"></base-crud-range>
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
					:value="params.page + 1"
					@input="HandleParams('page', $event)"
			></paginate>
		</template>

	</base-crud-page-list>
</template>

<script>
	import BaseCrudPageList from '../../../../components/BaseCrudPageList';
	import BaseCrudTable from '../../../../components/BaseCrudTable';
	import BaseInputSearch from '../../../../components/BaseInputSearch';
	import BaseCrudRange from '../../../../components/BaseCrudRange';
	import BaseInputOrganization from '../../../../components/BaseInputOrganization';
	import Paginate from 'vuejs-paginate';
	import { ORDER } from '../../../../constants';



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
		data()
		{
			return {
				params: {
					page: 0,
					pageSize: 20,
					sortBy: 'id',
					sortDirection: ORDER.DESC,
					allSearch: null,
					organizationId: null,
				},
				record: {
					list: [],
					count: 0,
					pageCount: 0,
				},
			};
		},
		created()
		{
			this.GetList();
		},
		methods: {
			HandleParams(type, val)
			{
				switch (type)
				{
					case 'search':
						this.params.allSearch = val ? val : null;
						break;

					case 'range':
						this.params.pageSize = val;
						break;

					case 'page':
						this.params.page = val - 1;
						break;

					case 'sort':
						if (this.params.sortBy === val)
						{
							this.params.sortDirection = this.params.sortDirection === ORDER.ASC ? ORDER.DESC : ORDER.ASC;
						}
						this.params.sortBy = val;
						break;

					case 'organization':
						this.params.organizationId = val === 0 ? null : val;
						break;
				}

				if (type !== 'page')
				{
					this.params.page = 0;
				}

				this.GetList();
			},
			GetList()
			{
				this.$api
					.get('groups', {
						params: this.params,
					})
					.then(response => {
						this.record.list = response.data.data;
						this.record.count = response.data.totalCount;
						this.record.pageCount = Math.ceil(response.data.totalCount / this.params.pageSize);
					});
			},
			Delete(id)
			{
				if (confirm(this.$t('confirmDelete')))
				{
					this.$api
						.delete('groups/' + id)
						.then(response => {
							this.$notification.success(this.$t('successfullyDeleted'));
							this.GetList();
						});
				}
			},
		}
	};
</script>