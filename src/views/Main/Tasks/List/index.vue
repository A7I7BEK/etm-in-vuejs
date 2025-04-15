<template>
	<base-crud-page-list
		v-if="can(PERMISSION_TYPE.TASK.READ)"
		:title="$tc('menu.task', 2)"
		:create-url="{ name: 'mainTasksCreate' }"
		:create-show="can(PERMISSION_TYPE.TASK.CREATE)"
		:footer-show="record.pageCount > 0"
	>

		<template #filter>
			<base-input-search
				class="mr-3"
				is-filter
				@update:value="HandleParams(HANDLE_PARAMS.SEARCH, $event)"
			></base-input-search>

			<base-input-deadline-type
				class="mr-3"
				is-filter
				@update:value="HandleParams(HANDLE_PARAMS.DEADLINE_TYPE, $event)"
			></base-input-deadline-type>

			<base-input-deadline
				class="mr-3"
				is-filter
				:label-text="$t('deadlineDate')"
				@update:value="HandleParams(HANDLE_PARAMS.DEADLINE, $event)"
			></base-input-deadline>

			<base-input-project
				class="mr-3"
				is-filter
				:show-organization="$store.state.systemAdmin"
				:value.sync="projectSelected"
				@update:value="HandleParams(HANDLE_PARAMS.PROJECT, $event)"
			></base-input-project>

			<base-input-column
				external
				:resource="columnList"
				is-filter
				:disabled="!params.projectId"
				:value.sync="columnSelected"
				@update:value="HandleParams(HANDLE_PARAMS.COLUMN, $event)"
			></base-input-column>

			<div class="az_crud_task_own">
				<div class="custom-control custom-checkbox">
					<input
						class="custom-control-input"
						id="myOwnTask"
						type="checkbox"
						:checked="params.ownTask"
						@change="HandleParams(HANDLE_PARAMS.OWN_TASK, $event.target.checked)"
					>
					<label
						class="custom-control-label"
						for="myOwnTask"
					>
						{{ $t('tasksIamAssigned') }}
					</label>
				</div>
			</div>
		</template>


		<template #table>
			<base-crud-table>

				<template #head>
					<tr class="bdr">
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
							:class="{ 'active': params.sortBy === SORT_PROP.COLUMN }"
							@click="HandleParams(HANDLE_PARAMS.SORT_BY, SORT_PROP.COLUMN)"
						>
							<div class="az_crud_tb_th">
								<div class="txt">{{ $t('columnName') }}</div>

								<template v-if="params.sortBy === SORT_PROP.COLUMN">
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
							:class="{ 'active': params.sortBy === SORT_PROP.PROJECT }"
							@click="HandleParams(HANDLE_PARAMS.SORT_BY, SORT_PROP.PROJECT)"
						>
							<div class="az_crud_tb_th">
								<div class="txt">{{ $t('repoerts.boardName') }}</div>

								<template v-if="params.sortBy === SORT_PROP.PROJECT">
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
							:class="{ 'active': params.sortBy === SORT_PROP.END_DATE }"
							@click="HandleParams(HANDLE_PARAMS.SORT_BY, SORT_PROP.END_DATE)"
						>
							<div class="az_crud_tb_th">
								<div class="txt">{{ $t('deadline') }}</div>

								<template v-if="params.sortBy === SORT_PROP.END_DATE">
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
								can(PERMISSION_TYPE.TASK.READ) ||
								can(PERMISSION_TYPE.TASK.UPDATE) ||
								can(PERMISSION_TYPE.TASK.DELETE)
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
					<tr
						v-for="item in record.list"
						class="bdr"
						:class="{ 'danger': item.priority === TASK_PRIORITY_TYPE.HIGH }"
					>
						<td>
							<div class="az_crud_tb_txt">
								{{ item.rowNumber }}
							</div>
						</td>

						<td>
							<div class="az_crud_tb_txt">{{ item.name }}</div>
						</td>

						<td>
							<div
								v-if="item.column.projectType === PROJECT_TYPE.KANBAN"
								class="az_crud_tb_txt"
							>
								{{ $t(`COLUMN_KANBAN_TYPE.${item.column.name}`) }}
							</div>
							<div
								v-else
								class="az_crud_tb_txt"
							>
								{{ item.column.name }}
							</div>
						</td>

						<td>
							<div class="az_crud_tb_txt">{{ item.project.name }}</div>
						</td>

						<td>
							<template v-if="$moment(item.endDate).isValid()">
								<div
									class="az_crud_tb_sts"
									:class="statusClass[ item.status ]"
								>
									<template v-if="$moment().diff($moment(item.endDate), 'years') > 0">
										{{ item.endDate | filterDateMonth }}
									</template>
									<template v-else>
										{{ item.endDate | filterMonthTime }}
									</template>
								</div>
							</template>
							<template v-else>&nbsp;</template>
						</td>

						<td v-if="
							can(PERMISSION_TYPE.TASK.READ) ||
							can(PERMISSION_TYPE.TASK.UPDATE) ||
							can(PERMISSION_TYPE.TASK.DELETE)
						">
							<div class="d-flex">
								<router-link
									class="btn az_base_btn btn-primary icon mr-2"
									v-if="can(PERMISSION_TYPE.TASK.READ)"
									:to="{ name: 'dashboard', params: { id: item.project.id, taskId: item.id } }"
								>
									<i class="fa fa-external-link"></i>
								</router-link>

								<router-link
									class="btn az_base_btn btn-success icon mr-2"
									v-if="can(PERMISSION_TYPE.TASK.READ)"
									:to="{ name: 'mainTasksRead', params: { id: item.id } }"
								>
									<i class="fa fa-eye"></i>
								</router-link>

								<router-link
									class="btn az_base_btn btn-warning icon mr-2"
									v-if="can(PERMISSION_TYPE.TASK.UPDATE)"
									:to="{ name: 'mainTasksUpdate', params: { id: item.id } }"
								>
									<i class="fa fa-pencil"></i>
								</router-link>

								<button
									class="btn az_base_btn btn-danger icon"
									type="button"
									v-if="can(PERMISSION_TYPE.TASK.DELETE)"
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
import BaseInputColumn from '../../../../components/BaseInputColumn';
import BaseInputDeadline from '../../../../components/BaseInputDeadline';
import BaseInputDeadlineType, { DEADLINE_LIST } from '../../../../components/BaseInputDeadlineType.vue';
import BaseInputProject from '../../../../components/BaseInputProject';
import BaseInputSearch from '../../../../components/BaseInputSearch';
import {
	HANDLE_PARAMS,
	ORDER,
	ORDER_REVERSE,
	PERMISSION_TYPE,
	PROJECT_TYPE,
	TASK_PRIORITY_TYPE,
	TASK_STATUS_TYPE,
} from '../../../../constants';


const SORT_PROP = {
	ID: 'id',
	NAME: 'name',
	DESCRIPTION: 'description',
	ORDERING: 'ordering',
	CREATED_AT: 'createdAt',
	START_DATE: 'startDate',
	END_DATE: 'endDate',
	LEVEL: 'level',
	PRIORITY: 'priority',
	TIMER_STATUS: 'timerStatus',
	TOTAL_TIME_SPENT: 'totalTimeSpent',
	COLUMN: 'column',
	PROJECT: 'project',
};


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
			PERMISSION_TYPE,
			ORDER,
			HANDLE_PARAMS,
			SORT_PROP,
			TASK_PRIORITY_TYPE,
			PROJECT_TYPE,
			statusClass: {
				[ TASK_STATUS_TYPE.RED ]: 'danger',
				[ TASK_STATUS_TYPE.YELLOW ]: 'warning',
				[ TASK_STATUS_TYPE.GREEN ]: 'success',
				[ TASK_STATUS_TYPE.BLUE ]: 'default',
			},
			params: {
				page: 1,
				pageSize: 20,
				sortBy: SORT_PROP.ID,
				sortDirection: ORDER.DESC,
				allSearch: null,
				columnId: null,
				projectId: null,
				ownTask: null,
				endDate: null,
				hasNoDeadline: null,
				inNextDay: null,
				inNextWeek: null,
				inNextMonth: null,
				overdue: null,
			},
			record: {
				list: [],
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

				case HANDLE_PARAMS.COLUMN:
					this.params.columnId = val || null;
					break;

				case HANDLE_PARAMS.PROJECT:
					this.params.projectId = val || null;
					this.params.columnId = null;
					break;

				case HANDLE_PARAMS.OWN_TASK:
					this.params.ownTask = val || null;
					break;

				case HANDLE_PARAMS.DEADLINE:
					this.params.endDate = val ? this.$moment(val).format('YYYY-MM-DD') : null;
					break;

				case HANDLE_PARAMS.DEADLINE_TYPE:
					DEADLINE_LIST.forEach(item => {
						this.params[ item ] = null;
					});
					if (val) {
						this.params[ val ] = true;
					}
					break;
			}

			if (type !== HANDLE_PARAMS.PAGE) {
				this.params.page = 1;
			}

			await this.GetList();
		},
		async GetList() {
			const resp = await this.$api.get('/tasks', {
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

			await this.$api.delete('/tasks/' + id);
			await this.GetList();

			this.$notification.success(this.$t('successfullyDeleted'));
		},

		async GetColumnList(projectId) {
			const resp = await this.$api.get('/project-columns/selection', {
				params: {
					projectId: projectId,
				}
			});

			this.columnList = resp.data.data;
		}
	}
};
</script>