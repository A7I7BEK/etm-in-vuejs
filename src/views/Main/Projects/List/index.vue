<template>
	<base-crud-page-list
		v-if="can('PROJECT_READ')"
		:title="$tc('menu.project', 2)"
		:create-url="{ name: 'mainProjectsCreate' }"
		:create-show="can('PROJECT_CREATE')"
		:footer-show="record.pageCount > 0"
	>

		<template #filter>
			<base-input-search
				class="mr-3"
				is-filter
				@update:value="HandleParams('search', $event)"
			></base-input-search>

			<base-input-group
				class="mr-3"
				is-filter
				:show-organization="$store.state.userProfile.systemAdmin"
				@update:value="HandleParams('group', $event)"
			></base-input-group>

			<base-input-manager
				class="mr-3"
				is-filter
				:show-organization="$store.state.userProfile.systemAdmin"
				@update:value="HandleParams('manager', $event)"
			></base-input-manager>

			<base-input-project-type
				class="mr-3"
				is-filter
				@update:value="HandleParams('type', $event)"
			></base-input-project-type>


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
						<th
							class="width-75 sort"
							@click="HandleParams('sort', 'id')"
							:class="{ 'active': params.sortBy === 'id' }"
						>
							<div class="az_crud_tb_th">
								<div class="txt">#</div>

								<template v-if="params.sortBy === 'id'">
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
							@click="HandleParams('sort', 'name')"
							:class="{ 'active': params.sortBy === 'name' }"
						>
							<div class="az_crud_tb_th">
								<div class="txt">{{ $t('name') }}</div>

								<template v-if="params.sortBy === 'name'">
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
							@click="HandleParams('sort', 'group')"
							:class="{ 'active': params.sortBy === 'group' }"
						>
							<div class="az_crud_tb_th">
								<div class="txt">{{ $tc('menu.team', 1) }}</div>

								<template v-if="params.sortBy === 'group'">
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
							@click="HandleParams('sort', 'managerName')"
							:class="{ 'active': params.sortBy === 'managerName' }"
						>
							<div class="az_crud_tb_th">
								<div class="txt">{{ $t('manager') }}</div>

								<template v-if="params.sortBy === 'managerName'">
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
							@click="HandleParams('sort', 'percent')"
							:class="{ 'active': params.sortBy === 'percent' }"
						>
							<div class="az_crud_tb_th">
								<div class="txt">{{ $t('percent') }}</div>

								<template v-if="params.sortBy === 'percent'">
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
							@click="HandleParams('sort', 'projectType')"
							:class="{ 'active': params.sortBy === 'projectType' }"
						>
							<div class="az_crud_tb_th">
								<div class="txt">{{ $t('projectType') }}</div>

								<template v-if="params.sortBy === 'projectType'">
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
							v-if="$store.state.userProfile.systemAdmin"
							@click="HandleParams('sort', 'organizationId')"
							:class="{ 'active': params.sortBy === 'organizationId' }"
						>
							<div class="az_crud_tb_th">
								<div class="txt">{{ $tc('menu.organization', 1) }}</div>

								<template v-if="params.sortBy === 'organizationId'">
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
							v-if="can('PROJECT_READ')
								|| can('PROJECT_UPDATE')
								|| can('PROJECT_DELETE')"
						>
							{{ $t('actions') }}
						</th>
					</tr>
				</template>


				<template
					#body
					v-if="record.list.length > 0"
				>
					<tr v-for="(item, index) in record.list">
						<td>
							<div
								class="az_crud_tb_txt"
								v-if="params.sortBy === 'id' && params.sortDirection === ORDER.DESC"
							>
								{{ record.count - (params.page * params.pageSize) - index }}
							</div>
							<div
								class="az_crud_tb_txt"
								v-else
							>
								{{ (params.page * params.pageSize) + (index + 1) }}
							</div>
						</td>

						<td>
							<div class="az_crud_tb_txt">{{ item.name }}</div>
						</td>

						<td>
							<div class="az_crud_tb_txt">{{ item.group.name }}</div>
						</td>

						<td>
							<div class="az_crud_tb_txt">{{ item.managerName }}</div>
						</td>

						<td>
							<div
								class="az_crud_tb_prgs_bx"
								v-if="item.projectType === PROJECT_TYPE.KANBAN"
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
								v-else-if="item.projectType === PROJECT_TYPE.TRELLO"
							>
								{{ $t('notAvailable') }}
							</div>
						</td>

						<td>
							<div class="az_crud_tb_txt">{{ item.projectType.value }}</div>
						</td>

						<td v-if="$store.state.userProfile.systemAdmin">
							<div class="az_crud_tb_txt">{{ item.organizationName }}</div>
						</td>

						<td v-if="can('PROJECT_READ') || can('PROJECT_UPDATE') || can('PROJECT_DELETE')">
							<div class="d-flex">
								<router-link
									class="btn az_base_btn btn-default icon mr-2"
									v-if="can('PROJECT_READ')"
									:to="{ name: 'dashboard', params: { id: item.id } }"
								>
									<i class="fa fa-external-link"></i>
								</router-link>

								<router-link
									class="btn az_base_btn btn-success icon mr-2"
									v-if="can('PROJECT_READ')"
									:to="{ name: 'mainProjectsRead', params: { id: item.id } }"
								>
									<i class="fa fa-eye"></i>
								</router-link>

								<router-link
									class="btn az_base_btn btn-warning icon mr-2"
									v-if="can('PROJECT_UPDATE')"
									:to="{ name: 'mainProjectsUpdate', params: { id: item.id } }"
								>
									<i class="fa fa-pencil"></i>
								</router-link>

								<button
									class="btn az_base_btn btn-danger icon"
									type="button"
									v-if="can('PROJECT_DELETE')"
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
				@input="HandleParams('range', $event)"
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
				:value="params.page + 1"
				@input="HandleParams('page', $event)"
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
import { ORDER, PROJECT_TYPE } from '../../../../constants';



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
			PROJECT_TYPE,
			params: {
				page: 0,
				pageSize: 20,
				sortBy: 'id',
				sortDirection: ORDER.DESC,
				allSearch: null,
				groupId: null,
				managerId: null,
				projectKanban: null,
				projectTrello: null,
				organizationId: null,
			},
			record: {
				list: [],
				count: 0,
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
				case 'search':
					this.params.allSearch = val ? val : null;
					break;

				case 'group':
					this.params.groupId = val === 0 ? null : val;
					break;

				case 'manager':
					this.params.managerId = val === 0 ? null : val;
					break;

				case 'type':
					this.params.projectKanban = val === 'KANBAN' ? true : null;
					this.params.projectTrello = val === 'TRELLO' ? true : null;
					break;

				case 'range':
					this.params.pageSize = val;
					break;

				case 'page':
					this.params.page = val - 1;
					break;

				case 'sort':
					if (this.params.sortBy === val) {
						this.params.sortDirection = this.params.sortDirection === ORDER.ASC ? ORDER.DESC : ORDER.ASC;
					}
					this.params.sortBy = val;
					break;

				case 'organization':
					this.params.organizationId = val === 0 ? null : val;
					break;
			}

			if (type !== 'page') {
				this.params.page = 0;
			}

			this.GetList();
		},
		GetList() {
			this.$api
				.get('/projects', {
					params: this.params,
				})
				.then(response => {
					this.record.list = response.data.data;
					this.record.count = response.data.totalCount;
					this.record.pageCount = Math.ceil(response.data.totalCount / this.params.pageSize);
				});
		},
		Delete(id) {
			if (confirm(this.$t('confirmDelete'))) {
				this.$api
					.delete('/projects/' + id)
					.then(response => {
						this.$notification.success(this.$t('successfullyDeleted'));
						this.GetList();
					});
			}
		},
	}
};
</script>