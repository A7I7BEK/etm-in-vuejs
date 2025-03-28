<template>
	<base-crud-page-list
		v-if="can('TASK_READ')"
		:title="$tc('menu.task', 2)"
		:create-url="{ name: 'mainTasksCreate' }"
		:create-show="can('TASK_CREATE')"
		:footer-show="record.pageCount > 0"
	>

		<template #filter>
			<base-input-search
				class="mr-3"
				is-filter
				@update:value="HandleParams('search', $event)"
			></base-input-search>

			<base-input-deadline-type
				class="mr-3"
				is-filter
				@update:value="HandleParams('deadlineType', $event)"
			></base-input-deadline-type>

			<base-input-deadline
				class="mr-3"
				is-filter
				:label-text="$t('deadlineDate')"
				@update:value="HandleParams('deadline', $event)"
			></base-input-deadline>

			<base-input-project
				class="mr-3"
				is-filter
				:show-organization="$store.state.userProfile.systemAdmin"
				:value.sync="projectSelected"
				@update:value="HandleParams('project', $event)"
			></base-input-project>

			<base-input-column
				external
				:resource="columnList"
				is-filter
				:disabled="!params.projectId"
				:value.sync="columnSelected"
				@update:value="HandleParams('column', $event)"
			></base-input-column>

			<div class="az_crud_task_own">
				<div class="custom-control custom-checkbox">
					<input
						class="custom-control-input"
						id="myOwnTask"
						type="checkbox"
						:checked="params.ownTask"
						@change="HandleParams('ownTask', $event.target.checked)"
					>
					<label
						class="custom-control-label"
						for="myOwnTask"
					>{{ $t('tasksIamAssigned') }}</label>
				</div>
			</div>
		</template>


		<template #table>
			<base-crud-table>

				<template #head>
					<tr class="bdr">
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
							@click="HandleParams('sort', 'columnName')"
							:class="{ 'active': params.sortBy === 'columnName' }"
						>
							<div class="az_crud_tb_th">
								<div class="txt">{{ $t('columnName') }}</div>

								<template v-if="params.sortBy === 'columnName'">
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
							@click="HandleParams('sort', 'projectName')"
							:class="{ 'active': params.sortBy === 'projectName' }"
						>
							<div class="az_crud_tb_th">
								<div class="txt">{{ $t('repoerts.boardName') }}</div>

								<template v-if="params.sortBy === 'projectName'">
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
							@click="HandleParams('sort', 'deadLine')"
							:class="{ 'active': params.sortBy === 'deadLine' }"
						>
							<div class="az_crud_tb_th">
								<div class="txt">{{ $t('deadline') }}</div>

								<template v-if="params.sortBy === 'deadLine'">
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
							v-if="can('TASK_READ')
								|| can('TASK_UPDATE')
								|| can('TASK_DELETE')"
						>
							{{ $t('actions') }}
						</th>
					</tr>
				</template>


				<template
					#body
					v-if="record.list.length > 0"
				>
					<tr
						class="bdr"
						v-for="(item, index) in record.list"
						:class="{ 'danger': item.taskPriorityType === TASK_PRIORITY_TYPE.HIGH }"
					>
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
							<div class="az_crud_tb_txt">{{ item.columnName }}</div>
						</td>

						<td>
							<div class="az_crud_tb_txt">{{ item.projectName }}</div>
						</td>

						<td>
							<template v-if="$moment(item.deadLine).isValid()">
								<div
									class="az_crud_tb_sts"
									:class="statusClass[ item.status ]"
								>
									<template v-if="$moment().diff($moment(item.deadLine), 'years') > 0">
										{{ item.deadLine | filterDateMonth }}
									</template>
									<template v-else>
										{{ item.deadLine | filterMonthTime }}
									</template>
								</div>
							</template>
							<template v-else>&nbsp;</template>
						</td>

						<td v-if="can('TASK_READ') || can('TASK_UPDATE') || can('TASK_DELETE')">
							<div class="d-flex">
								<router-link
									class="btn az_base_btn btn-default icon mr-2"
									v-if="can('TASK_READ')"
									:to="{ name: 'dashboard', params: { id: item.projectId, taskId: item.id } }"
								>
									<i class="fa fa-external-link"></i>
								</router-link>

								<router-link
									class="btn az_base_btn btn-success icon mr-2"
									v-if="can('TASK_READ')"
									:to="{ name: 'mainTasksRead', params: { id: item.id } }"
								>
									<i class="fa fa-eye"></i>
								</router-link>

								<router-link
									class="btn az_base_btn btn-warning icon mr-2"
									v-if="can('TASK_UPDATE')"
									:to="{ name: 'mainTasksUpdate', params: { id: item.id } }"
								>
									<i class="fa fa-pencil"></i>
								</router-link>

								<button
									class="btn az_base_btn btn-danger icon"
									type="button"
									v-if="can('TASK_DELETE')"
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
import BaseInputColumn from '../../../../components/BaseInputColumn';
import BaseInputDeadline from '../../../../components/BaseInputDeadline';
import BaseInputDeadlineType from '../../../../components/BaseInputDeadlineType';
import BaseInputProject from '../../../../components/BaseInputProject';
import BaseInputSearch from '../../../../components/BaseInputSearch';
import { ORDER, TASK_PRIORITY_TYPE, TASK_STATUS_TYPE } from '../../../../constants';



export default {
	name: 'TasksList',
	components: {
		BaseInputColumn,
		BaseInputProject,
		BaseInputDeadline,
		BaseInputDeadlineType,
		BaseCrudRange,
		BaseInputSearch,
		BaseCrudTable,
		BaseCrudPageList,
		Paginate,
	},
	data() {
		return {
			TASK_PRIORITY_TYPE,
			statusClass: {
				[ TASK_STATUS_TYPE.RED ]: 'danger',
				[ TASK_STATUS_TYPE.YELLOW ]: 'warning',
				[ TASK_STATUS_TYPE.GREEN ]: 'success',
				[ TASK_STATUS_TYPE.BLUE ]: 'default',
			},
			params: {
				page: 0,
				pageSize: 20,
				sortBy: 'id',
				sortDirection: ORDER.DESC,
				ownTask: false,
				allSearch: null,
				projectId: null,
				columnId: null,
				deadLine: null,
				hasNoDeadline: null,
				inNextDay: null,
				inNextWeek: null,
				inNextMonth: null,
				overdue: null,
			},
			record: {
				list: [],
				count: 0,
				pageCount: 0,
			},

			projectSelected: 0,
			columnList: [],
			columnSelected: 0,
		};
	},
	watch: {
		'params.projectId'(val) {
			this.columnSelected = 0;
			this.columnList = [];

			if (val) {
				this.GetColumnList(val);
			}
		},
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

				case 'deadlineType':
					this.params.hasNoDeadline = val === 'hasNoDeadline' ? true : null;
					this.params.inNextDay = val === 'inNextDay' ? true : null;
					this.params.inNextWeek = val === 'inNextWeek' ? true : null;
					this.params.inNextMonth = val === 'inNextMonth' ? true : null;
					this.params.overdue = val === 'overdue' ? true : null;
					break;

				case 'deadline':
					this.params.deadLine = val ? this.$moment(val).format('YYYY-MM-DD') : null;
					break;

				case 'project':
					this.params.projectId = val === 0 ? null : val;
					this.params.columnId = null;
					break;

				case 'column':
					this.params.columnId = val === 0 ? null : val;
					break;

				case 'ownTask':
					this.params.ownTask = val;
					break;
			}

			if (type !== 'page') {
				this.params.page = 0;
			}

			this.GetList();
		},
		GetList() {
			this.$api
				.get('tasks', {
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
					.delete('tasks/' + id)
					.then(response => {
						this.$notification.success(this.$t('successfullyDeleted'));
						this.GetList();
					});
			}
		},

		GetColumnList(projectId) {
			this.$api
				.get('/project-columns/selection', {
					params: {
						projectId: projectId,
					}
				})
				.then(response => {
					this.columnList = response.data.data;
				});
		}
	}
};
</script>